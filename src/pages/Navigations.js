/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Login from './LoginScreen';
import Dashboard from './SideMenuNavigation';
import Peta from './PetaScreen';
import FormTambahKerja from './FormTambahKerjaScreen';
import FormUbahKerja from './FormUbahKerjaScreen';
import BackNavigation from '../components/BackNavigation';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Dashboard"
            component={Dashboard}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Peta"
            component={Peta}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Tambah Kegiatan"
            component={FormTambahKerja}
            options={({navigation, route}) => ({
              headerLeft: props => (
                <BackNavigation page="Dashboard" navigation={navigation} />
              ),
            })}
          />
          <Stack.Screen
            name="Ubah Kegiatan"
            component={FormUbahKerja}
            options={({navigation, route}) => ({
              headerLeft: props => (
                <BackNavigation page="Dashboard" navigation={navigation} />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Navigation;
