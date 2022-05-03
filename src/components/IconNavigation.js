/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function IconNavigation(props) {
  return (
    <TouchableOpacity style={{marginLeft: 15}}>
      <FontAwesome5
        name={props.name}
        size={props.size}
        color={props.color}
        onPress={() => {
          props.navigation.push(props.page);
        }}
      />
    </TouchableOpacity>
  );
}
