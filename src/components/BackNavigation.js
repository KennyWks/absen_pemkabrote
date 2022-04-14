import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-ico';

const BackNavigation = props => {
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
};

export default BackNavigation;
