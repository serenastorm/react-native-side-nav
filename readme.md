<p align="center">
  A simple animated menu for React Native apps.
</p>

# react-native-side-nav

![platforms](https://img.shields.io/badge/platforms-iOS-brightgreen.svg?style=flat-square&colorB=b91d73)
[![Package version](https://img.shields.io/npm/v/react-native-side-nav.svg?style=flat-square&colorB=b91d73)](https://npmjs.org/package/react-native-side-nav)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square&colorB=b91d73)](http://makeapullrequest.com)
[![npm downloads](https://img.shields.io/npm/dm/react-native-side-nav.svg?style=flat-square&colorB=b91d73)](https://npmjs.org/package/react-native-side-nav)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square&colorB=b91d73)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)

## Contents

- [Contents](#contents)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)
- [Roadmap](#roadmap)

## Usage

```jsx
import React from "react";
import { View, TouchableOpacity } from "react-native";
import SideMenu from "react-native-side-nav";

const MenuComponent = () => {
  return <View style={styles.animatedBox}>
         // Your menu content here
         </View>;
};

const App = () => {
  const [menuExpanded, setMenuExpanded] = useState(false);

  return (
    <View>
      <SideMenu
        menuExpanded={menuExpanded}
        menuComponent={<MenuComponent />}
        burgerIcon
        onToggle={() => setMenuExpanded(!menuExpanded)}
      >
        // Your App components
      </SideMenu>
    </View>
  );
};

export default App;
```

## Props

| Prop                                     |  Default  |    Type     | Description                                                                                                                                                                                         |
| :--------------------------------------- | :-------: | :---------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| menuExpanded                             |   false   |  `boolean`  | Set to `true` or `false` to open or close the menu.                                                                                                                                                 |
| menuComponent                            |           | `ReactNode` | The content of your drawer. (see example)                                                                                                                                                           |
| menuWidth _optional_                     |    80     |  `number`   | The width of the menu, as a percentage of the screen width.                                                                                                                                         |
| animationDuration _optional_             |    300    |  `number`   | The length of the animation in ms.                                                                                                                                                                  |
| fade _optional_                          |   false   |  `boolean`  | Set to `true` to make the menu fade in on top of the content. Only works if `push` is set to `false`.                                                                                               |
| overlay _optional_                       |   false   |  `boolean`  | Set to `true` adds a dark overlay on top of the app when the menu is open.                                                                                                                          |
| overlayOpacity _optional_                |    0.4    |  `number`   | Sets the opacity of the overlay. Only works if `overlay` is set to `true`.                                                                                                                          |
| leftAligned _optional_                   |   false   |  `boolean`  | Set to `true` to make the menu come in from the left side of the screen.                                                                                                                            |
| push _optional_                          |   false   |  `boolean`  | Set to `true` to make the menu 'push' your app contents to one side.                                                                                                                                |
| burgerIcon _optional_                    |   false   |  `boolean`  | Set to `true` to add an absolutely positioned burger icon to toggle your menu.                                                                                                                      |
| onToggle _required if burgerIcon={true}_ |   null    | `() => any` | Your toggle function for the burger icon. (see example)                                                                                                                         |
| onHide _optional_                        |   null    | `() => any` | The menu's hide function, pass this down if you want users to be able to close the menu by tapping outside of it. Ex `onHide={() => setShow(false)`                                                                                                                         |
| burgerWidth _optional_                   |    35     |  `number`   | The width of the burger icon.                                                                                                                                                                       |
| burgerIconStyles _optional_              |    {}     | `ViewStyle` | Edit the burger X and Y position. Example: `burgerIconStyles={{top: 30, left: 20}}`. You can try passing other styles although they haven't been tested. Use the burger icon color props instead.   |
| burgerIconColor1 _optional_              | '#ffffff' |  `string`   | The color you want your burger icon to be.                                                                                                                                                          |
| burgerIconColor2 _optional_              |    ''     |  `string`   | If the background of your menu doesn't match the rest of your app, you can change the color of the icon when the menu is expanded. If you don't set this value it will default to burgerIconColor1. |

## Examples

#### menuWidth

<div >
	<img src="img/menuWidth.gif" alt="" width="200px">
</div>

#### fade

<div >
	<img src="img/fade.gif" alt="" width="200px">
</div>

#### overlay & overlayOpacity

<div >
	<img src="img/overlay.gif" alt="" width="200px">
</div>

#### leftAligned

<div >
	<img src="img/leftAligned.gif" alt="" width="200px">
</div>

#### push

<div >
	<img src="img/push.gif" alt="" width="200px">
</div>

#### burgerIcon

<div >
	<img src="img/burgerIcon.gif" alt="" width="200px">
</div>

#### burgerWidth

<div >
	<img src="img/burgerWidth.gif" alt="" width="200px">
</div>

#### burgerIconStyles

<div >
	<img src="img/burgerIconStyles.gif" alt="" width="200px">
</div>

#### burgerIconColor1

<div >
	<img src="img/burgerIconColor1.gif" alt="" width="200px">
</div>

#### burgerIconColor2

<div >
	<img src="img/burgerIconColor2.gif" alt="" width="200px">
</div>

## Roadmap

- [ ] Improve animation
- [ ] Android support
- [ ] Update docs examples
- [x] Typescript
- [x] Add burger icon
- [x] Testing
- [x] Add overlay opacity prop

## Questions

Feel free to [contact me](mailto:serena.antonetti@gmail.com) or [create an issue](https://github.com/serenastorm/react-native-side-nav/issues/new)

> Made with ♥.
