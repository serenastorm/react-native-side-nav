import React, { useState, useEffect } from "react";
import {
  Animated,
  Dimensions,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import BurgerIcon from "./BurgerIcon";
import { SideMenuProps, ContentWrapperProps } from "./types";
import { menuStyles } from "./styles";

const screen = Dimensions.get("window");

const ContentWrapper: React.FC<ContentWrapperProps> = ({
  onHide,
  children,
}) => {
  if (onHide) {
    return (
      <TouchableWithoutFeedback onPress={onHide}>
        <View style={menuStyles.container}>{children}</View>
      </TouchableWithoutFeedback>
    );
  }

  return <View style={menuStyles.container}>{children}</View>;
};

const SideMenu: React.FC<SideMenuProps> = ({
  animationDuration = 300,
  burgerIcon = false,
  burgerWidth = 35,
  burgerIconStyles,
  burgerIconColor1 = "#ffffff",
  burgerIconColor2,
  children,
  fade = false,
  leftAligned = false,
  menuComponent,
  menuExpanded = false,
  menuWidth = 80,
  onToggle,
  onHide,
  overlay = false,
  overlayOpacity = 0.4,
  push = false,
}) => {
  const [fadeAnim] = useState(new Animated.Value(0.3));
  const [overlayAnim] = useState(new Animated.Value(0));
  const [leftOffset] = useState(new Animated.Value(0));
  const [rightOffset] = useState(new Animated.Value(screen.width));
  const [rightOffsetPush] = useState(new Animated.Value(0));

  const DRAWER_WIDTH = screen.width * (menuWidth / 100);

  const openDrawer = () => {
    Animated.parallel([
      Animated.timing(leftOffset, {
        toValue: DRAWER_WIDTH,
        duration: animationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(rightOffset, {
        toValue: -DRAWER_WIDTH,
        duration: animationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(rightOffsetPush, {
        toValue: -DRAWER_WIDTH,
        duration: animationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: animationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(overlayAnim, {
        toValue: overlayOpacity,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeDrawer = () => {
    Animated.parallel([
      Animated.timing(leftOffset, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(rightOffset, {
        toValue: screen.width,
        duration: animationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(rightOffsetPush, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: false,
      }),
      Animated.timing(overlayAnim, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (menuExpanded) {
      openDrawer();
    } else {
      closeDrawer();
    }
  }, [menuExpanded]);

  const renderOverlay = () => {
    const drawerAnimation = () => {
      if (leftAligned) {
        return {
          transform: [{ translateX: leftOffset }],
          left: -DRAWER_WIDTH,
        };
      } else {
        return {
          transform: [{ translateX: rightOffset }],
          left: screen.width,
        };
      }
    };

    return (
      <View style={menuStyles.appContainer}>
        {burgerIcon && onToggle && (
          <BurgerIcon
            animationDuration={animationDuration}
            burgerWidth={burgerWidth}
            burgerIconStyles={burgerIconStyles}
            burgerIconColor1={burgerIconColor1}
            burgerIconColor2={burgerIconColor2 || burgerIconColor1}
            menuExpanded={menuExpanded}
            leftAligned={leftAligned}
            onToggle={onToggle}
          />
        )}
        <Animated.View
          style={[
            drawerAnimation(),
            menuStyles.drawer,
            {
              width: DRAWER_WIDTH,
              opacity: fade ? fadeAnim : 1,
            },
          ]}
        >
          {menuComponent}
        </Animated.View>
        <ContentWrapper onHide={onHide}>
          <React.Fragment>
            <View style={menuStyles.overlay}>
              {menuExpanded && overlay && (
                <Animated.View
                  style={[menuStyles.overlay, { opacity: overlayAnim }]}
                />
              )}
              {children}
            </View>
          </React.Fragment>
        </ContentWrapper>
      </View>
    );
  };

  const renderPush = () => {
    const containerAnimation = () => {
      if (leftAligned) {
        return {
          transform: [{ translateX: leftOffset }],
        };
      } else {
        return {
          transform: [{ translateX: rightOffsetPush }],
        };
      }
    };

    const drawerPosition = () => {
      if (leftAligned) {
        return {
          left: -DRAWER_WIDTH,
        };
      } else {
        return {
          left: screen.width,
        };
      }
    };

    return (
      <View style={menuStyles.appContainer}>
        {burgerIcon && onToggle && (
          <BurgerIcon
            animationDuration={animationDuration}
            burgerWidth={burgerWidth}
            burgerIconStyles={burgerIconStyles}
            burgerIconColor1={burgerIconColor1}
            burgerIconColor2={burgerIconColor2 || burgerIconColor1}
            menuExpanded={menuExpanded}
            leftAligned={leftAligned}
            onToggle={onToggle}
          />
        )}
        <Animated.View
          style={[
            containerAnimation(),
            menuStyles.appContainer,
            {
              width: screen.width + DRAWER_WIDTH,
            },
          ]}
        >
          <View
            style={[
              drawerPosition(),
              menuStyles.drawer,
              {
                width: DRAWER_WIDTH,
              },
            ]}
          >
            {menuComponent}
          </View>
          <ContentWrapper onHide={onHide}>
            <View style={menuStyles.overlay}>
              {menuExpanded && overlay && (
                <View
                  style={{ ...menuStyles.overlay, opacity: overlayOpacity }}
                />
              )}
              {children}
            </View>
          </ContentWrapper>
        </Animated.View>
      </View>
    );
  };

  return push ? renderPush() : renderOverlay();
};

export default SideMenu;
