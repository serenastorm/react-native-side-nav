import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import SideMenu from "./SideMenu";

const MenuComponent = () => {
  return (
    <View style={styles.animatedBox}>
      <Text style={{ color: "#ffffff", fontWeight: "bold", letterSpacing: 2 }}>
        MENU
      </Text>
    </View>
  );
};

const App = () => {
  const [menuExpanded, setMenuExpanded] = useState(false);

  return (
    <View>
      <SideMenu
        menuExpanded={menuExpanded}
        menuComponent={<MenuComponent />}
        onToggle={() => setMenuExpanded(!menuExpanded)}
        burgerIcon
      >
        <StatusBar barStyle={"light-content"} />
        <View style={styles.body}>
          <Text
            style={{
              color: "#000000",
              fontWeight: "bold",
              letterSpacing: 2,
            }}
          >
            CONTENT
          </Text>
        </View>
      </SideMenu>
    </View>
  );
};

const styles = StyleSheet.create({
  animatedBox: {
    flex: 1,
    backgroundColor: "#8E2DE2",
    paddingTop: 50,
    paddingLeft: 10,
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4A00E0",
  },
});

export default App;
