import React from 'react';
import LocationView from 'react-native-location-view';
import {View} from 'react-native';

export default class SelectLocationScreen extends React.Component {
  state = {};

  render() {
    return (
      <View style={{flex: 1}}>
        <LocationView
          apiKey={'AIzaSyC7CeKZhUbwpDQhknuC2ziSlfaaj49NzGc'}
          initialLocation={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
        />
      </View>
    );
  }
}
