import React, { Component, useState, setState, useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  View,
  Text,
  SafeAreaView,
  Platform,
  TouchableOpacity
} from "react-native";
import { styles } from "./Styles";
import PropTypes from "prop-types";

export const SideDrawer = ({
  children,
  drawerContent,
  side,
  width,
  fade,
  isExpanded
}) => {
  const window = Dimensions.get("window");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [offsetValue] = useState(new Animated.Value(window.width));

  openDrawer = () => {
    if (fade) {
      Animated.parallel([
        Animated.timing(offsetValue, {
          toValue: 0,
          duration: 300,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
        })
      ]).start();
    } else {
      Animated.timing(offsetValue, {
        toValue: 0,
        duration: 300,
      }).start();
    }
  };

  closeDrawer = () => {
    if (fade) {
      Animated.parallel([
        Animated.timing(offsetValue, {
          toValue: window.width,
          duration: 300,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
        })
      ]).start();
    } else {
      Animated.timing(offsetValue, {
        toValue: window.width,
        duration: 300,
      }).start();
    }
  };

  drawerFallback = () => {
    return (
      <TouchableOpacity onPress={this.closeDrawer} style={styles.closeBtn}>
        <Text>Close</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    isExpanded ? openDrawer() : closeDrawer();
    console.log("offsetValue", offsetValue, "fadeAnim", fadeAnim);
  }, []);

  return (
    <View style={styles.main}>
      <Animated.View
        style={{
          ...styles.drawer,
          transform: [{ translateX: offsetValue }],
          opacity: fadeAnim
        }}
      >
        {drawerContent}
      </Animated.View>
      <View style={styles.container}>{children}</View>
    </View>
  );
};

SideDrawer.defaultProps = {
  //   isExpanded: false,
  side: "right",
  fade: false
};

SideDrawer.propTypes = {
  //   isExpanded: PropTypes.bool,
  drawerContent: PropTypes.object,
  side: PropTypes.string,
  fade: PropTypes.bool
};
