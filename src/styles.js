import { StyleSheet, Dimensions } from "react-native";

const screen = Dimensions.get("window");

export const menuStyles = StyleSheet.create({
  appContainer: {
    position: "absolute",
    width: screen.width,
    left: 0,
    top: 0,
  },
  container: {
    position: "absolute",
    left: 0,
    width: screen.width,
    height: screen.height,
    zIndex: 0,
  },
  drawer: {
    position: "absolute",
    height: screen.height,
    zIndex: 1,
  },
  overlay: {
    position: "absolute",
    left: 0,
    width: screen.width,
    height: screen.height,
    backgroundColor: "#000000",
    zIndex: 2,
  },
});

export const burgerStyles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    zIndex: 200,
    padding: 5,
    top: 40,
  },
  burgerIcon: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  burgerLine: {
    width: "100%",
    height: "10%",
    borderRadius: 1,
    position: "absolute",
  },
});
