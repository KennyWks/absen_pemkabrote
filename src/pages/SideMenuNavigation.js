/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-ico';
import {TouchableOpacity, View} from 'react-native';
import ProfilPegawai from './ProfilPegawaiScreen';
import KinerjaHarian from './KinerjaHarianScreen';
import Absen from './PetaScreen';
import RakapanAbsen from './RekapanAbsenScreen';
import {logoutAction} from '../helpers/logout';
import {useNavigation} from '@react-navigation/native';

const Drawer = createDrawerNavigator();

const SideMenuNavigation = () => {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      screenOptions={{
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
      }}
      // drawerContent={props => <CustomSidebarMenu {...props} />}
    >
      <Drawer.Screen
        name="Profil Pegawai"
        component={ProfilPegawai}
        options={() => ({
          headerRight: props => (
            <View style={{margin: 15}}>
              <TouchableOpacity
                onPress={() => {
                  logoutAction({navigation}, 'Login');
                }}>
                <Icon name="logout" group="miscellaneous" />
              </TouchableOpacity>
            </View>
          ),
          drawerLabel: 'Profil Pegawai',
        })}
      />

      <Drawer.Screen
        name="Absen"
        options={{
          drawerLabel: 'Absen',
        }}
        component={Absen}
      />

      <Drawer.Screen
        name="Kinerja Harian"
        options={{
          drawerLabel: 'Kinerja Harian',
          headerRight: () => (
            <View style={{margin: 15}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Tambah Kegiatan');
                }}>
                <Icon name="plus" group="ui-interface" />
              </TouchableOpacity>
            </View>
          ),
        }}
        component={KinerjaHarian}
      />

      <Drawer.Screen
        name="Rekapan Absen"
        options={{drawerLabel: 'Rekapan Absen'}}
        component={RakapanAbsen}
      />
    </Drawer.Navigator>
  );
};

export default SideMenuNavigation;
