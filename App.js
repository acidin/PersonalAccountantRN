import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MyDrawer from "./src/LoginScreen/index.js";

export default class App extends Component {
  render() {
    return (
      <MyDrawer />
    );
  }
}
