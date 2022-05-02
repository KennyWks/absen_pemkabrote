/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Login from './LoginScreen';
import Dashboard from './SideMenuNavigation';
import Peta from './PetaScreen';
import FormTambahKerja from './FormTambahKerjaScreen';
import FormUbahKerja from './FormUbahKerjaScreen';
import KinerjaHarian from './KinerjaHarianScreen';
import BackNavigation from '../components/IconNavigation';
import IconNavigation from '../components/IconNavigation';
import {View} from 'react-native';

const Stack = createStackNavigator();

export default function Navigation() {
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
            options={({navigation}) => ({
              headerLeft: () => (
                <BackNavigation
                  page="Kinerja Harian"
                  name="arrow-left"
                  navigation={navigation}
                  size={20}
                  color="#000"
                />
              ),
            })}
          />
          <Stack.Screen
            name="Ubah Kegiatan"
            component={FormUbahKerja}
            options={({navigation}) => ({
              headerLeft: () => (
                <BackNavigation
                  page="Kinerja Harian"
                  name="arrow-left"
                  navigation={navigation}
                  size={20}
                  color="#000"
                />
              ),
            })}
          />
          <Stack.Screen
            name="Kinerja Harian"
            component={KinerjaHarian}
            options={({navigation}) => ({
              headerRight: () => (
                <View style={{margin: 15}}>
                  <IconNavigation
                    page="Tambah Kegiatan"
                    name="plus"
                    navigation={navigation}
                    size={25}
                    color="#000"
                  />
                </View>
              ),
              headerLeft: () => (
                <BackNavigation
                  page="Dashboard"
                  name="arrow-left"
                  navigation={navigation}
                  size={20}
                  color="#000"
                />
              ),
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
