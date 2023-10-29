import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import React, { useCallback, useLayoutEffect, useState } from "react";
import IconButton from "../components/ui/IconButton";

export default function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 37.73,
    longitude: 122.43,
    latitudeDelta: 0.09,
    longitudeDelta: 0.04,
  };

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No location picked!", "pick a location to continue.");
      return;
    }

    navigation.navigate("AddPlace", {
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({tintColor}) => (
        <IconButton
          icon="save"
          color={tintColor}
          size={24}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [selectedLocation, savePickedLocationHandler]);

  return (
    <MapView style={styles.screen} onPress={selectLocationHandler}>
      {selectedLocation && (
        <Marker
          title="Selected Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
