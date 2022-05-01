/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-ico';

export default function BackNavigation(props) {
  return (
    <View style={{margin: 10}}>
      <Icon
        name="left-arrow"
        onPress={() => {
          props.navigation.push(props.page);
        }}
        group="ui-interface"
      />
    </View>
  );
}
