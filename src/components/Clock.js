/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View} from 'react-native';
import AnalogClock from 'react-native-clock-analog';

export default function Clock() {
  return (
    <View style={styles.container}>
      <View style={{marginBottom: 5}} />
      <AnalogClock
        colorClock="#2196F3"
        colorNumber="#000000"
        colorCenter="#00BCD4"
        colorHour="#FF8F00"
        colorMinutes="#FFC400"
        autostart={true}
        showSeconds
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 20,
  },
});