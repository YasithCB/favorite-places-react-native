import { Pressable, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import React from "react";

export default function IconButton({ icon, size, color, onPress }) {
  return (
    <Pressable onPress={onPress}>
     <Icon name={icon} size={size} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({});
