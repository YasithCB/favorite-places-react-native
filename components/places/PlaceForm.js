import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useCallback, useState } from "react";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

export default function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState();
  const [selectedLocation, setSelectedLocation] = useState();

  function changeTitleHandler(value) {
    setEnteredTitle(value);
  }

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);

  function savePlaveHandler() {
    console.log(enteredTitle);
    console.log(selectedImage);
    console.log(selectedLocation);
  }

  return (
    <ScrollView>
      <View>
        <Text>title</Text>
        <TextInput onChangeText={changeTitleHandler} value={enteredTitle} />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />

      <Button onPress={savePlaveHandler} title="Save Place" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
