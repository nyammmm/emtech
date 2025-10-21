// components/MessageList.js
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";

export default function MessageList({ messages = [] }) {
  const [modalImage, setModalImage] = useState(null);

  const renderItem = ({ item }) => {
    if (item.type === "text") {
      return (
        <View style={styles.bubbleContainer}>
          <View style={styles.textBubble}>
            <Text style={styles.text}>{item.text}</Text>
          </View>
        </View>
      );
    }

    if (item.type === "image") {
      return (
        <View style={styles.bubbleContainer}>
          <TouchableOpacity onPress={() => setModalImage(item.uri)}>
            <Image source={{ uri: item.uri }} style={styles.image} resizeMode="cover" />
          </TouchableOpacity>
        </View>
      );
    }

    if (item.type === "location") {
      return (
        <View style={styles.bubbleContainer}>
          <View style={styles.locationCard}>
            <Text style={styles.text}>📍 Shared location</Text>
            <Text style={styles.small}>
              Lat: {item.coords.latitude.toFixed(5)} • Lon: {item.coords.longitude.toFixed(5)}
            </Text>
          </View>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        inverted
        contentContainerStyle={{ padding: 12 }}
      />

      <Modal visible={!!modalImage} transparent={true} onRequestClose={() => setModalImage(null)}>
        <SafeAreaView style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalClose} onPress={() => setModalImage(null)}>
            <Text style={{ color: "white", fontSize: 18 }}>Close</Text>
          </TouchableOpacity>
          {modalImage && (
            <Image source={{ uri: modalImage }} style={styles.fullImage} resizeMode="contain" />
          )}
        </SafeAreaView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  bubbleContainer: {
    marginVertical: 6,
    alignItems: "flex-start",
  },
  textBubble: {
    backgroundColor: "#eee",
    padding: 12,
    borderRadius: 12,
    maxWidth: "80%",
  },
  text: { fontSize: 16 },
  small: { fontSize: 12, color: "#555" },
  image: {
    width: 180,
    height: 120,
    borderRadius: 8,
  },
  locationCard: {
    backgroundColor: "#f1f7ff",
    padding: 12,
    borderRadius: 8,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: "80%",
  },
  modalClose: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 10,
  },
});
