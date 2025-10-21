// App.js
import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Platform } from "react-native";
import Status from "./components/Status";
import MessageList from "./components/MessageList";
import Toolbar from "./components/Toolbar";

export default function App() {
  const [messages, setMessages] = useState([
    // sample initial messages
    { id: "1", type: "text", text: "Welcome to Messaging App!", time: Date.now() },
  ]);

  const [showImagePicker, setShowImagePicker] = useState(false);

  const handleSendText = (text) => {
    if (!text) return;
    const newMsg = { id: String(Date.now()), type: "text", text, time: Date.now() };
    setMessages((m) => [newMsg, ...m]);
  };

  const handleSendImage = (uri) => {
    if (!uri) return;
    const newMsg = { id: String(Date.now()), type: "image", uri, time: Date.now() };
    setMessages((m) => [newMsg, ...m]);
  };

  const handleSendLocation = (coords) => {
    if (!coords) return;
    const newMsg = { id: String(Date.now()), type: "location", coords, time: Date.now() };
    setMessages((m) => [newMsg, ...m]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Status />
        <MessageList messages={messages} />
        <View style={styles.toolbar}>
          <Toolbar
            onSendText={handleSendText}
            onPickImage={handleSendImage}
            onSendLocation={handleSendLocation}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  content: { flex: 1, backgroundColor: "#fff" },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.04)",
    backgroundColor: "#fff",
  },
});
