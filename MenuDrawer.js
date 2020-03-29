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

const screen = Dimensions.get("window");

class MenuDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.leftOffset = new Animated.Value(0);
    this.rightOffset = new Animated.Value(screen.width);
    this.state = {
      expanded: false,
      fadeAnim: new Animated.Value(0.3)
    };
  }

  openDrawer = () => {
    const { menuWidth, animationTime } = this.props;
    const DRAWER_WIDTH = screen.width * (menuWidth / 100);

    Animated.parallel([
      Animated.timing(this.leftOffset, {
        toValue: DRAWER_WIDTH,
        duration: animationTime
      }),
      Animated.timing(this.rightOffset, {
        toValue: -DRAWER_WIDTH,
        duration: animationTime
      }),
      Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        duration: animationTime
      })
    ]).start();
  };

  closeDrawer = () => {
    const { animationTime } = this.props;

    Animated.parallel([
      Animated.timing(this.leftOffset, {
        toValue: 0,
        duration: animationTime
      }),
      Animated.timing(this.rightOffset, {
        toValue: screen.width,
        duration: animationTime
      }),
      Animated.timing(this.state.fadeAnim, {
        toValue: 0,
        duration: animationTime
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

  renderOverlay = () => {
    const {
      children,
      drawerContent,
      menuWidth,
      open,
      overlay,
      overlayOpacity,
      leftAligned
    } = this.props;
    const { fadeAnim } = this.state;
    const animated = { transform: [{ translateX: this.leftOffset }] };
    const animation = () => {
      if (leftAligned) {
        return {
          transform: [{ translateX: this.leftOffset }],
          left: -DRAWER_WIDTH
        };
      } else {
        return {
          transform: [{ translateX: this.rightOffset }],
          left: screen.width
        };
      }
    };
    const DRAWER_WIDTH = screen.width * (menuWidth / 100);

    return (
      <View style={[styles.main, { width: screen.width }]}>
        <Animated.View
          style={[
            animation(),
            styles.drawer,
            {
              width: DRAWER_WIDTH,
              // left: -DRAWER_WIDTH,
              opacity: fadeAnim
            }
          ]}
        >
          {drawerContent ? drawerContent : this.drawerFallback()}
        </Animated.View>
        <View style={styles.container}>
          <View style={styles.overlay}>
            {open && overlay && (
              <View style={{ ...styles.overlay, opacity: overlayOpacity }} />
            )}
            {children}
          </View>
          {children}
        </View>
      </View>
    );
  };

  renderPush = () => {
    const {
      children,
      drawerContent,
      menuWidth,
      open,
      overlay,
      overlayOpacity
    } = this.props;
    const animated = { transform: [{ translateX: this.leftOffset }] };
    const DRAWER_WIDTH = screen.width * (menuWidth / 100);

    return (
      <Animated.View
        style={[animated, styles.main, { width: screen.width + DRAWER_WIDTH }]}
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
        <View style={styles.container}>
          <View style={styles.overlay}>
            {open && overlay && (
              <View style={{ ...styles.overlay, opacity: overlayOpacity }} />
            )}
            {children}
          </View>
          {children}
        </View>
      </Animated.View>
    );
  };

  render() {
    const { push } = this.props;
    return push ? this.renderPush() : this.renderOverlay();
  }
}

MenuDrawer.defaultProps = {
  open: false,
  menuWidth: 100,
  animationTime: 200,
  fade: true,
  opacity: 0.4,
  overlay: true,
  overlayOpacity: 0.7,
  leftAligned: true,
  push: false
};

MenuDrawer.propTypes = {
  open: PropTypes.bool,
  menuWidth: PropTypes.number,
  animationTime: PropTypes.number,
  fade: PropTypes.bool,
  opacity: PropTypes.number,
  overlay: PropTypes.bool,
  overlayOpacity: PropTypes.number,
  leftAligned: PropTypes.bool,
  push: PropTypes.bool
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
    width: screen.width,
    height: screen.height,
    zIndex: 0
  },
  drawer: {
    position: "absolute",
    height: screen.height,
    zIndex: 1
  },
  overlay: {
    position: "absolute",
    left: 0,
    width: screen.width,
    height: screen.height,
    zIndex: 0,
    backgroundColor: "#000000",
    zIndex: 999
  }
});

export default MenuDrawer;
