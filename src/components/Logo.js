import React from 'react';
import {Image, StyleSheet} from 'react-native';
import LogoImage from '../assets/images/logo.png';

export default function Logo() {
  return <Image source={LogoImage} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 130,
    marginBottom: 8,
  },
});
