import React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

const screen = Dimensions.get("window");

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      fadeAnim: new Animated.Value(0.3),
      overlayAnim: new Animated.Value(0),
      leftOffset: new Animated.Value(0),
      rightOffset: new Animated.Value(screen.width)
    };
  }

  openDrawer = () => {
    const { menuWidth, animationDuration, overlayOpacity } = this.props;
    const { leftOffset, rightOffset, fadeAnim, overlayAnim } = this.state;
    const DRAWER_WIDTH = screen.width * (menuWidth / 100);

    Animated.parallel([
      Animated.timing(leftOffset, {
        toValue: DRAWER_WIDTH,
        duration: animationDuration
      }),
      Animated.timing(rightOffset, {
        toValue: -DRAWER_WIDTH,
        duration: animationDuration
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: animationDuration
      }),
      Animated.timing(overlayAnim, {
        toValue: overlayOpacity,
        duration: animationDuration
      })
    ]).start();
  };

  closeDrawer = () => {
    const { animationDuration } = this.props;
    const { leftOffset, rightOffset, fadeAnim, overlayAnim } = this.state;

    Animated.parallel([
      Animated.timing(leftOffset, {
        toValue: 0,
        duration: animationDuration
      }),
      Animated.timing(rightOffset, {
        toValue: screen.width,
        duration: animationDuration
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: animationDuration
      }),
      Animated.timing(overlayAnim, {
        toValue: 0,
        duration: animationDuration
      })
    ]).start();
  };

  componentDidUpdate() {
    const { menuExpanded } = this.props;

    menuExpanded ? this.openDrawer() : this.closeDrawer();
  }

  renderOverlay = () => {
    const {
      children,
      menuComponent,
      menuWidth,
      menuExpanded,
      overlay,
      leftAligned
    } = this.props;
    const { fadeAnim, overlayAnim, rightOffset, leftOffset } = this.state;
    const animation = () => {
      if (leftAligned) {
        return {
          transform: [{ translateX: leftOffset }],
          left: -DRAWER_WIDTH
        };
      } else {
        return {
          transform: [{ translateX: rightOffset }],
          left: screen.width
        };
      }
    };
    const DRAWER_WIDTH = screen.width * (menuWidth / 100);

    return (
      <View style={[styles.appContainer, { width: screen.width }]}>
        <Animated.View
          style={[
            animation(),
            styles.drawer,
            {
              width: DRAWER_WIDTH,
              opacity: fadeAnim
            }
          ]}
        >
          {menuComponent}
        </Animated.View>
        <View style={styles.container}>
          <View style={styles.overlay}>
            {menuExpanded && overlay && (
              <Animated.View
                style={[styles.overlay, { opacity: overlayAnim }]}
              />
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
      menuComponent,
      menuWidth,
      menuExpanded,
      overlay,
      overlayOpacity
    } = this.props;
    const { leftOffset } = this.state;
    const animated = { transform: [{ translateX: leftOffset }] };
    const DRAWER_WIDTH = screen.width * (menuWidth / 100);

    return (
      <Animated.View
        style={[
          animated,
          styles.appContainer,
          { width: screen.width + DRAWER_WIDTH }
        ]}
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
          {menuComponent}
        </View>
        <View style={styles.container}>
          <View style={styles.overlay}>
            {menuExpanded && overlay && (
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

SideMenu.defaultProps = {
  menuExpanded: false,
  menuWidth: 80,
  animationDuration: 300,
  fade: false,
  overlay: false,
  overlayOpacity: 0.4,
  leftAligned: false,
  push: false
};

SideMenu.propTypes = {
  menuExpanded: PropTypes.bool,
  menuWidth: PropTypes.number,
  animationDuration: PropTypes.number,
  fade: PropTypes.bool,
  overlay: PropTypes.bool,
  overlayOpacity: PropTypes.number,
  leftAligned: PropTypes.bool,
  push: PropTypes.bool
};

const styles = StyleSheet.create({
  appContainer: {
    position: "absolute",
    left: 0,
    top: 0
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

export default SideMenu;
