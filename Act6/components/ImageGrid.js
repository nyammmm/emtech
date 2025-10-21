// components/ImageGrid.js
import React from "react";
import { View, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";

export default function ImageGrid({ images = [], onPick }) {
  return (
    <FlatList
      data={images}
      keyExtractor={(_, idx) => String(idx)}
      numColumns={3}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => onPick(item.uri)}>
          <Image source={{ uri: item.uri }} style={styles.thumb} />
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  thumb: {
    width: 100,
    height: 100,
    margin: 4,
    borderRadius: 8,
  },
});
