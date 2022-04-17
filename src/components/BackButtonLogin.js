import React from 'react';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  BackHandler,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

export default function BackButton() {
  const backPressed = () => {
    Alert.alert('Uppsss!', 'Anda yakin ingin keluar aplikasi?', [
      {
        text: 'Batal',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'Ya', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  };

  return (
    <TouchableOpacity
      onPress={() => {
        backPressed();
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
