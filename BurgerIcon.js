import React from "react";
import {
  Animated,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  Button,
  View
} from "react-native";
import PropTypes from "prop-types";

const screen = Dimensions.get("window");

class BurgerIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: new Animated.Value(0),
      opacity: new Animated.Value(1),
      translateYtop: new Animated.Value(11),
      rotateTop: new Animated.Value(0),
      translateYbottom: new Animated.Value(26),
      rotateBottom: new Animated.Value(0)
    };
  }

  openDrawerBurger = () => {
    const { animationDuration } = this.props;
    const {
      opacity,
      translateYtop,
      rotateTop,
      translateYbottom,
      rotateBottom,
      expanded
    } = this.state;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: animationDuration
      }),
      Animated.timing(translateYtop, {
        toValue: 18,
        duration: animationDuration
      }),
      Animated.timing(rotateTop, {
        toValue: 45,
        duration: animationDuration
      }),
      Animated.timing(translateYbottom, {
        toValue: 18,
        duration: animationDuration
      }),
      Animated.timing(rotateBottom, {
        toValue: -45,
        duration: animationDuration
      }),
      Animated.timing(expanded, {
        toValue: 11,
        duration: animationDuration
      })
    ]).start();
  };

  closeDrawerBurger = () => {
    const { animationDuration } = this.props;
    const {
      opacity,
      translateYtop,
      rotateTop,
      translateYbottom,
      rotateBottom,
      expanded
    } = this.state;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: animationDuration
      }),
      Animated.timing(translateYtop, {
        toValue: 11,
        duration: animationDuration
      }),
      Animated.timing(rotateTop, {
        toValue: 0,
        duration: animationDuration
      }),
      Animated.timing(translateYbottom, {
        toValue: 26,
        duration: animationDuration
      }),
      Animated.timing(rotateBottom, {
        toValue: 0,
        duration: animationDuration
      }),
      Animated.timing(expanded, {
        toValue: 0,
        duration: animationDuration
      })
    ]).start();
  };

  componentDidUpdate() {
    const { menuExpanded } = this.props;
    menuExpanded ? this.openDrawerBurger() : this.closeDrawerBurger();
  }

  toggleMenu = () => {
    this.state.expanded ? this.openDrawerBurger() : this.closeDrawerBurger();
  };

  render() {
    const { leftAligned } = this.props;
    const {
      opacity,
      translateYtop,
      rotateTop,
      translateYbottom,
      rotateBottom
    } = this.state;

    const burgerPosition = () => {
      if (leftAligned) {
        return {
          left: 30
        };
      } else {
        return {
          left: screen.width - 60
        };
      }
    };

    return (
      <TouchableWithoutFeedback
        title="Press me"
        onPress={this.props.onPress}
        style={styles.iconContainer}
      >
        <View style={[styles.burgerIcon, burgerPosition()]}>
          <Animated.View
            style={{
              ...styles.burgerLine,
              ...styles.burgerLineTop,
              transform: [
                {
                  rotate: rotateTop.interpolate({
                    inputRange: [0, 360],
                    outputRange: ["0deg", "360deg"]
                  })
                }
              ],
              top: translateYtop
            }}
          />
          <Animated.View
            style={{
              ...styles.burgerLine,
              ...styles.burgerLineMiddle,
              opacity: opacity
            }}
          />
          <Animated.View
            style={{
              ...styles.burgerLine,
              ...styles.burgerLineBottom,
              transform: [
                {
                  rotate: rotateBottom.interpolate({
                    inputRange: [-360, -0],
                    outputRange: ["-360deg", "-0deg"]
                  })
                }
              ],
              top: translateYbottom
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

BurgerIcon.defaultProps = {
  menuExpanded: false,
  animationDuration: false
};

BurgerIcon.propTypes = {
  menuExpanded: PropTypes.bool,
  animationDuration: PropTypes.number
};

const styles = StyleSheet.create({
  iconContainer: {
  },
  burgerIcon: {
    backgroundColor: "black",
    height: 40,
    width: 40,
    position: "absolute",
    top: 30,
    zIndex: 200
  },
  text: {
    color: "white",
    fontSize: 40
  },
  burgerLine: {
    backgroundColor: "white",
    width: 30,
    height: 3,
    left: 5,
    position: "absolute"
  },
  burgerLineMiddle: {
    top: 18
  }
});

export default BurgerIcon;
