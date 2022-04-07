import React, {Component} from 'react';
import {StyleSheet, View, Image} from 'react-native';
import Splash from '../assets/images/splash.jpg';

export default class SplashScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={Splash} style={styles.splash} />
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
  },
  splash: {
    width: '100%',
    height: '100%',
  },
});
