import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity
} from "react-native";
import SideMenu from "./SideMenu";
import BurgerIcon from "./BurgerIcon";
import { TouchableHighlight } from "react-native-gesture-handler";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuExpanded: false
    };
  }

  toggleMenu = () => {
    this.setState({ menuExpanded: !this.state.menuExpanded });
  };

  menuComponent = () => {
    return (
      <View style={styles.animatedBox}>
        <TouchableOpacity onPress={this.toggleMenu}>
          <Text
            style={{ color: "#ffffff", fontWeight: "bold", letterSpacing: 2 }}
          >
            MENU
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    return (
      <View>
        <SideMenu
          menuExpanded={this.state.menuExpanded}
          menuComponent={this.menuComponent()}
          menuWidth={70}
          push={true}
          onPress={this.toggleMenu}
          burgerIcon={true}
          burgerWidth={40}
        >
          <StatusBar barStyle={"light-content"} />
          <View style={styles.body}>
            <TouchableOpacity onPress={this.toggleMenu} style={styles.body}>
              <Text
                style={{
                  color: "#ffffff",
                  fontWeight: "bold",
                  letterSpacing: 2
                }}
              >
                CONTENT
              </Text>
            </TouchableOpacity>
          </View>
        </SideMenu>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animatedBox: {
    flex: 1,
    backgroundColor: "#8E2DE2",
    paddingTop: 50,
    paddingLeft: 10
  },
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4A00E0"
  }
});

export default App;
