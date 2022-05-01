import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {notifyBackHandler} from '../helpers/notifyBackHandler';

export default function BackButton() {
  return (
    <TouchableOpacity
      onPress={() => {
        notifyBackHandler();
      }}
      style={styles.container}>
      <Image
        style={styles.image}
        source={require('../assets/images/arrow_back.png')}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
});
