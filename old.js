import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";

const window = Dimensions.get("window");
const isIOS = Platform.OS === "ios";
const VERSION = parseInt(Platform.Version, 10);

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.leftOffset = new Animated.Value(window.width);
    this.state = {
      expanded: false
    };
  }

  openDrawer = () => {
    Animated.timing(this.leftOffset, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  closeDrawer = () => {
    Animated.timing(this.leftOffset, {
      toValue: window.width,
      duration: 300,
      useNativeDriver: true
    }).start();
  };

  drawerFallback = () => {
    return (
      <TouchableOpacity onPress={this.closeDrawer}>
        <Text>Close</Text>
      </TouchableOpacity>
    );
  };

  componentDidUpdate() {
    const { open } = this.props;
    open ? this.openDrawer() : this.closeDrawer();
  }

  renderPush = () => {
    const { children, drawerContent } = this.props;

    if (isIOS && VERSION >= 11) {
      return (
        <View style={styles.main}>
          <SafeAreaView style={{ flex: 1, backgroundColor: "#0A1861" }}>
            <Animated.View
              style={{
                ...styles.drawer,
                transform: [{ translateX: this.leftOffset }]
              }}
            >
              {drawerContent ? drawerContent : this.drawerFallback()}
            </Animated.View>
            <View style={styles.container}>{children}</View>
          </SafeAreaView>
        </View>
      );
    }

    return (
      <View style={styles.main}>
        <Animated.View
          style={{
            ...styles.drawer,
            transform: [{ translateX: this.leftOffset }]
          }}
        >
          {drawerContent ? drawerContent : this.drawerFallback()}
        </Animated.View>
        <View style={styles.container}>{children}</View>
      </View>
    );
  };

  render() {
    return this.renderPush();
  }
}

SideMenu.defaultProps = {
  open: false
};

SideMenu.propTypes = {
  open: PropTypes.bool
};

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    left: 0,
    top: 0
  },
  container: {
    position: "absolute",
    left: 0,
    width: window.width,
    height: window.height,
    zIndex: 0
  },
  drawer: {
    position: "absolute",
    height: window.height,
    zIndex: 1
  }
});

export default SideMenu;
