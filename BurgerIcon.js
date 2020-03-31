import React from "react";
import {
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  StyleSheet,
  View
} from "react-native";
import PropTypes from "prop-types";

class BurgerIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: new Animated.Value(0),
      opacity: new Animated.Value(1),
      translateYtop: new Animated.Value(20),
      rotateTop: new Animated.Value(0),
      translateYbottom: new Animated.Value(70),
      rotateBottom: new Animated.Value(0)
    };
  }

  openDrawerBurger = () => {
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
        duration: 300
      }),
      Animated.timing(translateYtop, {
        toValue: 45,
        duration: 300
      }),
      Animated.timing(rotateTop, {
        toValue: 45,
        duration: 300
      }),
      Animated.timing(translateYbottom, {
        toValue: 45,
        duration: 300
      }),
      Animated.timing(rotateBottom, {
        toValue: -45,
        duration: 300
      }),
      Animated.timing(expanded, {
        toValue: 11,
        duration: 300
      })
    ]).start();
  };

  closeDrawerBurger = () => {
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
        duration: 300
      }),
      Animated.timing(translateYtop, {
        toValue: 20,
        duration: 300
      }),
      Animated.timing(rotateTop, {
        toValue: 0,
        duration: 300
      }),
      Animated.timing(translateYbottom, {
        toValue: 70,
        duration: 300
      }),
      Animated.timing(rotateBottom, {
        toValue: 0,
        duration: 300
      }),
      Animated.timing(expanded, {
        toValue: 0,
        duration: 300
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
    const {
      burgerIconColor1,
      burgerIconColor2,
      burgerWidth,
      menuExpanded,
      onPress,
      burgerIconStyles
    } = this.props;
    const {
      opacity,
      translateYtop,
      rotateTop,
      translateYbottom,
      rotateBottom
    } = this.state;

    const backgroundColor = () => {
      if (!menuExpanded) {
        return burgerIconColor1;
      } else if (menuExpanded && !burgerIconColor2) {
        return burgerIconColor1;
      } else if (menuExpanded && burgerIconColor2) {
        return burgerIconColor2;
      }
    };

    return (
      <TouchableWithoutFeedback
        title="Press me"
        onPress={onPress}
        style={styles.buttonContainer}
      >
        <View style={{ ...styles.iconContainer, ...burgerIconStyles }}>
          <View
            style={{
              ...styles.burgerIcon,
              width: burgerWidth,
              height: burgerWidth
            }}
          >
            <Animated.View
              style={{
                ...styles.burgerLine,
                ...styles.burgerLineTop,
                backgroundColor: backgroundColor(),
                transform: [
                  {
                    rotate: rotateTop.interpolate({
                      inputRange: [0, 360],
                      outputRange: ["0deg", "360deg"]
                    })
                  }
                ],
                top: translateYtop.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"]
                })
              }}
            />
            <Animated.View
              style={{
                ...styles.burgerLine,
                ...styles.burgerLineMiddle,
                backgroundColor: backgroundColor(),
                opacity: opacity
              }}
            />
            <Animated.View
              style={{
                ...styles.burgerLine,
                ...styles.burgerLineBottom,
                backgroundColor: backgroundColor(),
                transform: [
                  {
                    rotate: rotateBottom.interpolate({
                      inputRange: [-360, -0],
                      outputRange: ["-360deg", "-0deg"]
                    })
                  }
                ],
                top: translateYbottom.interpolate({
                  inputRange: [0, 100],
                  outputRange: ["0%", "100%"]
                })
              }}
            />
          </View>
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
  buttonContainer: {},
  iconContainer: {
    position: "absolute",
    zIndex: 200,
    padding: 5
  },
  burgerIcon: {
    width: "100%",
    height: "100%",
    position: "relative"
  },
  burgerLine: {
    width: "100%",
    height: "10%",
    borderRadius: 1,
    position: "absolute"
  },
  burgerLineMiddle: {
    top: "45%"
  }
});

export default BurgerIcon;
