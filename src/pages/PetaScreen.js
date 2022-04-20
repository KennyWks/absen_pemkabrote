/* eslint-disable react/self-closing-comp */
/* eslint-disable handle-callback-err */
/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {StyleSheet, View, Button, Alert, ActivityIndicator} from 'react-native';
import MapboxGL, {Logger} from '@react-native-mapbox-gl/maps';
import {PermissionsAndroid} from 'react-native';
import {postData, patchData} from '../helpers/CRUD';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoibG9yZW0tbWVyb2wiLCJhIjoiY2wyMDgxZGFxMHRzYjNibXo0NjBoaGV3aiJ9.W9akdidMfTTtFgut5rpcTw',
);

Logger.setLogCallback(log => {
  const {message} = log;
  if (
    message.match('Request failed due to a permanent error: Canceled') ||
    message.match('Request failed due to a permanent error: Socket Closed')
  ) {
    return true;
  }
  return false;
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coordinates: [73.20812, 22.29941],
      loadIn: false,
      loadOut: false,
    };
  }

  componentDidMount() {
    PermissionsAndroid.requestMultiple(
      [
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      ],
      {
        title: 'Permintaan akses lokasi',
        message: 'Aplikasi ini membutuhan izin untu mengakses lokasi anda.',
      },
    )
      .then(granted => {
        // console.log(granted);
      })
      .catch(err => {
        Alert.alert('Error!');
        // console.warn(err);
      });
  }

  submitLocationIn = async () => {
    this.setState(prevState => ({
      ...prevState,
      loadIn: true,
    }));
    const token = await AsyncStorage.getItem('accessToken');
    const decodeToken = jwtDecode(token);
    try {
      const response = await postData('/absen', {
        users_id: decodeToken.users_id,
        latitude_masuk: this.state.coordinates[0],
        longitude_masuk: this.state.coordinates[1],
      });
      Alert.alert(response.data.message);
      if (response.data.status !== 403) {
        await AsyncStorage.setItem('absen_id', response.data.absen_id);
      }
    } catch (error) {
      Alert.alert('Error:', JSON.stringify(error.response.status));
      // console.log(error.response);
    }
    this.setState(prevState => ({
      ...prevState,
      loadIn: false,
    }));
  };

  submitLocationOut = async () => {
    this.setState(prevState => ({
      ...prevState,
      loadOut: true,
    }));
    try {
      const absen_id = await AsyncStorage.getItem('absen_id');
      if (absen_id !== null) {
        const response = await patchData(`/absen/${absen_id}`, {
          latitude_keluar: this.state.coordinates[0],
          longitude_keluar: this.state.coordinates[1],
        });
        Alert.alert(response.data.message);
        await AsyncStorage.removeItem('absen_id');
      } else {
        Alert.alert('Proses Absen Keluar Sudah Diproses');
      }
    } catch (error) {
      Alert.alert('Error:', JSON.stringify(error.response.status));
      // console.log(error.response);
    }
    this.setState(prevState => ({
      ...prevState,
      loadOut: false,
    }));
  };

  render() {
    const {loadIn, loadOut} = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <MapboxGL.MapView style={styles.map} zoomEnabled={true}>
            <MapboxGL.MarkerView coordinate={this.state.coordinates} />
            {/* <MapboxGL.PointAnnotation coordinate={this.state.coordinates} /> */}
            <MapboxGL.UserLocation
              showsUserHeadingIndicator={true}
              onUpdate={location => {
                this.setState(prevState => ({
                  ...prevState,
                  coordinates: [
                    location.coords.latitude,
                    location.coords.longitude,
                  ],
                }));
              }}
            />
            <MapboxGL.Camera
              followZoomLevel={8} //followUserLocation
              followUserMode={'normal'}
              followUserLocation={true}
              animationDuration={1000}
            />
          </MapboxGL.MapView>

          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              padding: 5,
              backgroundColor: 'white',
            }}>
            {!loadIn && !loadOut && (
              <Button
                onPress={() => {
                  this.submitLocationIn();
                }}
                color={'#560CCE'}
                title="Masuk"
              />
            )}
            {!loadOut && !loadIn && (
              <Button
                onPress={() => {
                  this.submitLocationOut();
                }}
                color={'#560CCE'}
                title="Keluar"
              />
            )}
          </View>
          <ActivityIndicator animating={loadIn || loadOut} color="black" />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    height: '100%',
    width: '100%',
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
});
