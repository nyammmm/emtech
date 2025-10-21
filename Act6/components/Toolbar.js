// components/Toolbar.js
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

export default function Toolbar({ onSendText, onPickImage, onSendLocation }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSendText(text.trim());
    setText("");
  };

  const pickImageAsync = async () => {
    // ask permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access photos is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.cancelled) {
      onPickImage(result.uri);
    }
  };

  const sendLocationAsync = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location is required!");
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    onSendLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.iconBtn} onPress={pickImageAsync}>
          <Text>🖼️</Text>
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleSend}
          returnKeyType="send"
        />

        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={{ color: "white" }}>Send</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconBtn} onPress={sendLocationAsync}>
          <Text>📍</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 8,
    alignItems: "center",
  },
  iconBtn: {
    padding: 8,
    marginHorizontal: 4,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  sendBtn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
});
