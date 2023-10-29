import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import PlaceItem from "./PlaceItem";

export default function PlacesList({ placesList }) {
if (!placesList || placesList.length === 0) {
    return <View><Text>No Places yet</Text></View>
}

  return (
    <View>
      <FlatList
        data={placesList}
        keyExtractor={(item) => {
          item.id;
        }}
        renderItem={(item) => <PlaceItem place={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
