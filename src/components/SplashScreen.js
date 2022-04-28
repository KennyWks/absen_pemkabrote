import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Logo from '../components/Logo';

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Logo />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
