import React, { useEffect, useState } from "react";
import {
  Platform,
  StatusBar as RNStatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Constants from "expo-constants";
import NetInfo from "@react-native-community/netinfo";

const statusHeight = Constants.statusBarHeight;

export default function Status() {
  const [connectionType, setConnectionType] = useState(null);

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      setConnectionType(state.type);
    });

    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnectionType(state.type);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const isConnected = connectionType !== "none" && connectionType !== null;
  const backgroundColor = isConnected ? "white" : "red";

  const statusBarElement = (
    <RNStatusBar
      backgroundColor={backgroundColor}
      barStyle={isConnected ? "dark-content" : "light-content"}
      animated={false}
    />
  );

  const messageContainer = (
    <View style={styles.messageContainer} pointerEvents={"none"}>
      {statusBarElement}
      {!isConnected && (
        <View style={styles.bubble}>
          <Text style={styles.text}>No network connection</Text>
        </View>
      )}
    </View>
  );

    return (
    <>
      <View style={[styles.status, { backgroundColor }]} />
      {messageContainer}
    </>
    );
}

const styles = StyleSheet.create({
  status: {
    zIndex: 2,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: statusHeight,
  },
  messageContainer: {
    zIndex: 3,
    position: "absolute",
    top: statusHeight, // directly below system status bar
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 5,
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "red",
  },
  text: {
    color: "white",
  },
});
