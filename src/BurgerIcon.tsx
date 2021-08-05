import React, { useState, useEffect } from "react";
import { Animated, TouchableWithoutFeedback, View } from "react-native";
import { BurgerIconProps } from "./types";
import { burgerStyles } from "./styles";

const BurgerIcon = ({
  animationDuration,
  burgerWidth,
  burgerIconStyles,
  burgerIconColor1,
  burgerIconColor2,
  menuExpanded,
  onToggle,
}: BurgerIconProps) => {
  const [middleLineOpacity] = useState(new Animated.Value(1));
  const [outerLinesTranslate] = useState(new Animated.Value(-20));
  const [rotateTop] = useState(new Animated.Value(0));
  const [rotateBottom] = useState(new Animated.Value(0));

  const openDrawerBurger = () => {
    Animated.parallel([
      Animated.timing(middleLineOpacity, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(outerLinesTranslate, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(rotateTop, {
        toValue: 45,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(rotateBottom, {
        toValue: -45,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDrawerBurger = () => {
    Animated.parallel([
      Animated.timing(middleLineOpacity, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(outerLinesTranslate, {
        toValue: -20,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(rotateTop, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
      Animated.timing(rotateBottom, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (menuExpanded) {
      openDrawerBurger();
    } else {
      closeDrawerBurger();
    }
  }, [menuExpanded]);

  const backgroundColor = () => {
    if (!menuExpanded) {
      return burgerIconColor1;
    }
    return burgerIconColor2;
  };

  const largeBurgerSize = burgerWidth > 50;

  return (
    <TouchableWithoutFeedback onPress={onToggle}>
      <View style={{ ...burgerStyles.iconContainer, ...burgerIconStyles }}>
        <View
          style={{
            ...burgerStyles.burgerIcon,
            width: burgerWidth,
            height: burgerWidth,
            top: burgerWidth / 2,
          }}
        >
          <Animated.View
            style={{
              ...burgerStyles.burgerLine,
              backgroundColor: backgroundColor(),
              transform: [
                {
                  rotate: rotateTop.interpolate({
                    inputRange: [0, 360],
                    outputRange: ["0deg", "360deg"],
                  }),
                },
                {
                  translateY: outerLinesTranslate.interpolate({
                    inputRange: [-20, 0],
                    outputRange: largeBurgerSize
                      ? ["-20%", "0%"]
                      : ["-10%", "0%"],
                  }),
                },
              ],
            }}
          />
          <Animated.View
            style={{
              ...burgerStyles.burgerLine,
              backgroundColor: backgroundColor(),
              opacity: middleLineOpacity,
            }}
          />
          <Animated.View
            style={{
              ...burgerStyles.burgerLine,
              backgroundColor: backgroundColor(),
              transform: [
                {
                  rotate: rotateBottom.interpolate({
                    inputRange: [-360, -0],
                    outputRange: ["-360deg", "-0deg"],
                  }),
                },
                {
                  translateY: outerLinesTranslate.interpolate({
                    inputRange: [-20, 0],
                    outputRange: largeBurgerSize
                      ? ["20%", "0%"]
                      : ["10%", "0%"],
                  }),
                },
              ],
            }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default BurgerIcon;
