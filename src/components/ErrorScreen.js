import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class ErrorScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Sorry! Please try again</Text>
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
    backgroundColor: '#466BD9',
  },
});
