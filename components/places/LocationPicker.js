import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { googleMapPreview } from "../../util/location";
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

export default function LocationPicker({ onPickLocation }) {
  const [locationPermisionInfo, requestPermission] = useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState();
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.lat,
        lng: route.params.lng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    onPickLocation(pickedLocation);
  }, [onPickLocation, pickedLocation]);

  async function verifyPermission() {
    if (locationPermisionInfo.status === PermissionStatus.UNDETERMINED) {
      const resp = await requestPermission();
      return resp.granted;
    }

    if (locationPermisionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permision!",
        "You need to grant location permission to use this app."
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    if (!verifyPermission()) {
      return;
    }
    try {
      const location = await getCurrentPositionAsync({});
      console.log("aaaaaaaaaaaaaaaaaaa");

      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });

      console.log(location);
    } catch (error) {
      // Handle errors while fetching the location
      console.error("Error fetching location:", error);
    }
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No location picked yet!</Text>;
  if (pickedLocation) {
    locationPreview = (
      <Image
        source={{
          uri: googleMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View>
        <Button title="Locate Me" onPress={getLocationHandler} />
        <Button title="Pick on Map" onPress={pickOnMapHandler} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
  },
});
