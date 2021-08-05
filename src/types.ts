import React from "react";
import { GestureResponderEvent, ViewStyle } from "react-native";

export interface ContentWrapperProps {
  onHide?: (event: GestureResponderEvent) => void;
}

export interface SideMenuProps extends ContentWrapperProps {
  animationDuration?: number;
  burgerIcon?: boolean;
  burgerWidth?: number;
  burgerIconStyles?: ViewStyle;
  burgerIconColor1?: string;
  burgerIconColor2?: string;
  fade?: boolean;
  leftAligned?: boolean;
  menuComponent: React.ReactNode;
  menuExpanded: boolean;
  menuWidth?: number;
  onToggle?: (event: GestureResponderEvent) => void;
  overlay?: boolean;
  overlayOpacity?: number;
  push?: boolean;
}

export interface BurgerIconProps {
  animationDuration: number;
  burgerWidth: number;
  burgerIconStyles?: ViewStyle;
  burgerIconColor1: string;
  burgerIconColor2: string;
  leftAligned: boolean;
  menuExpanded: boolean;
  onToggle: (event: GestureResponderEvent) => void;
}
