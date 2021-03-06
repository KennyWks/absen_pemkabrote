/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, StyleSheet, Image, Text} from 'react-native';
import MamboiLogo from '../assets/images/mamboi.png';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const CustomSidebarMenu = props => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <Image source={MamboiLogo} style={styles.sideMenuProfileIcon} />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Text
        style={{
          fontSize: 10,
          textAlign: 'center',
          color: 'grey',
        }}>
        Hak Cipta Oleh Developer Mamboi
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 200,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
});

export default CustomSidebarMenu;
