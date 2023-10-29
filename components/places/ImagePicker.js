import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../constants/colors";

export default function ImagePicker({ onTakeImage }) {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermisionInfo, requestPermission] = useCameraPermissions();

  async function verifyPermission() {
    if (cameraPermisionInfo.status === PermissionStatus.UNDETERMINED) {
      const resp = await requestPermission();
      return resp.granted;
    }

    if (cameraPermisionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permision!",
        "You need to grant camera permission to use this app."
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    if (!(await verifyPermission())) {
      return;
    }
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    setPickedImage(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  }

  let imagePreview = <Text>No image selected yet!</Text>;
  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>{imagePreview}</View>
      <Button title="Take Images" onPress={takeImageHandler} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "90%",
    height: 250,
    backgroundColor: Colors.primary400,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
