/* eslint-disable react-native/no-inline-styles */
import React, {useRef, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import AnalogClock from 'react-native-clock-analog';

export default function Clock() {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => (isMounted.current = false);
  }, []);

  return (
    <View style={styles.container}>
      <View style={{marginBottom: 5}} />
      <AnalogClock
        colorClock="#560CCE"
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
