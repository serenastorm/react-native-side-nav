import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const window = Dimensions.get("window");

export const styles = StyleSheet.create({
  main: {
    position: "absolute",
    left: 0,
    top: 0
  },
  drawer: {
    width: window.width,
    backgroundColor: "#000000",
    height: window.height,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 10
  },
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 5
  },
  closeBtn: {
    position: "absolute",
    top: 40,
    left: 50,
    zIndex: 15
  },
  openBtn: {
    position: "absolute",
    top: 80,
    left: 100,
    zIndex: 15
  }
});
