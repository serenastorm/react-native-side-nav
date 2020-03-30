import React from "react";
import { Animated, Text, Dimensions, StyleSheet, View } from "react-native";
import PropTypes from "prop-types";

const screen = Dimensions.get("window");

class BurgerIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: false,
      opacity: new Animated.Value(1),
      translateXtop: new Animated.Value(0),
      translateYtop: new Animated.Value(0),
      rotateTop: new Animated.Value(0),
      translateXbottom: new Animated.Value(0),
      translateYbottom: new Animated.Value(16),
      rotateBottom: new Animated.Value(0)
    };
  }

  openDrawerBurger = () => {
    const { animationDuration } = this.props;
    const {
      opacity,
      translateXtop,
      translateYtop,
      rotateTop,
      translateXbottom,
      translateYbottom,
      rotateBottom
    } = this.state;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 0,
        duration: animationDuration
      }),
      Animated.timing(translateXtop, {
        toValue: 0,
        duration: animationDuration
      }),
      Animated.timing(translateYtop, {
        toValue: 8,
        duration: animationDuration
      }),
      Animated.timing(rotateTop, {
        toValue: 45,
        duration: animationDuration
      }),
      Animated.timing(translateXbottom, {
        toValue: 0,
        duration: animationDuration
      }),
      Animated.timing(translateYbottom, {
        toValue: 8,
        duration: animationDuration
      }),
        Animated.timing(rotateBottom, {
          toValue: -45,
          duration: animationDuration
        })
    ]).start();
  };

  closeDrawerBurger = () => {
    const { animationDuration } = this.props;
    const {
      opacity,
      translateXtop,
      translateYtop,
      rotateTop,
      translateXbottom,
      translateYbottom,
      rotateBottom
    } = this.state;

    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: animationDuration
      }),
      Animated.timing(translateXtop, {
        toValue: 0,
        duration: animationDuration
      }),
      Animated.timing(translateYtop, {
        toValue: 0,
        duration: animationDuration
      }),
      Animated.timing(rotateTop, {
        toValue: 0,
        duration: animationDuration
      }),
      Animated.timing(translateXbottom, {
        toValue: 0,
        duration: animationDuration
      }),
      Animated.timing(translateYbottom, {
        toValue: 16,
        duration: animationDuration
      }),
        Animated.timing(rotateBottom, {
          toValue: 0,
          duration: animationDuration
        })
    ]).start();
  };

  componentDidUpdate() {
    const { menuExpanded } = this.props;

    menuExpanded ? this.openDrawerBurger() : this.closeDrawerBurger();
  }

  render() {
    const { leftAligned } = this.props;
    const {
      opacity,
      translateXtop,
      translateYtop,
      rotateTop,
      translateXbottom,
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
            top: translateYtop,
            left: translateXtop
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
              top: translateYbottom,
              left: translateXbottom
          }}
        />
      </View>
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
  burgerIcon: {
    position: "absolute",
    top: 40,
    zIndex: 100
  },
  text: {
    color: "white",
    fontSize: 40
  },
  burgerLine: {
    backgroundColor: "white",
    width: 30,
    height: 3,
    position: "absolute"
  },
  burgerLineMiddle: {
    top: 8
  }
  //   burgerLineBottom: {
  //     top: 16
  //   }
});

export default BurgerIcon;
