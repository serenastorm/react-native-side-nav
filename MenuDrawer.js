import React from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

class MenuDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.leftOffset = new Animated.Value(0);
    this.state = {
      expanded: false,
      fadeAnim: new Animated.Value(1)
    };
  }

  openDrawer = () => {
    const { menuWidth, animationTime, opacity } = this.props;
    const DRAWER_WIDTH = SCREEN_WIDTH * (menuWidth / 100);

    Animated.parallel([
      Animated.timing(this.leftOffset, {
        toValue: DRAWER_WIDTH,
        duration: animationTime,
        useNativeDriver: true
      }),
      Animated.timing(this.state.fadeAnim, {
        toValue: opacity,
        duration: animationTime,
        useNativeDriver: true
      })
    ]).start();
  };

  closeDrawer = () => {
    const { animationTime } = this.props;

    Animated.parallel([
      Animated.timing(this.leftOffset, {
        toValue: 0,
        duration: animationTime,
        useNativeDriver: true
      }),
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: animationTime,
        useNativeDriver: true
      })
    ]).start();
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
    const { children, drawerContent, menuWidth } = this.props;
    const { fadeAnim } = this.state;
    const animated = { transform: [{ translateX: this.leftOffset }] };
    const DRAWER_WIDTH = SCREEN_WIDTH * (menuWidth / 100);

    return (
      <Animated.View
        style={[animated, styles.main, { width: SCREEN_WIDTH + DRAWER_WIDTH }]}
      >
        <View
          style={[
            styles.drawer,
            {
              width: DRAWER_WIDTH,
              left: -DRAWER_WIDTH
            }
          ]}
        >
          {drawerContent ? drawerContent : this.drawerFallback()}
        </View>
        <View style={styles.container}>{children}</View>
      </Animated.View>
    );
  };

  render() {
    return this.renderPush();
  }
}

MenuDrawer.defaultProps = {
  open: false,
  menuWidth: 100,
  animationTime: 200,
  fade: true,
  opacity: 0.4
};

MenuDrawer.propTypes = {
  open: PropTypes.bool,
  menuWidth: PropTypes.number,
  animationTime: PropTypes.number,
  fade: PropTypes.bool,
  opacity: PropTypes.number
};

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    left: 0,
    top: 5
  },
  container: {
    position: "absolute",
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    zIndex: 0
  },
  drawer: {
    position: "absolute",
    height: SCREEN_HEIGHT,
    zIndex: 1
  }
});

export default MenuDrawer;
