/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {TouchableOpacity, View, Alert} from 'react-native';
import ProfilPegawai from './ProfilPegawaiScreen';
import KinerjaHarian from './KinerjaHarianScreen';
import PetaScreen from './PetaScreen';
import RakapanAbsen from './RekapanAbsenScreen';
import {logoutAction} from '../helpers/logout';
import {useNavigation} from '@react-navigation/native';
import CustomSidebarMenu from '../components/CustomSidebarMenu';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconNavigation from '../components/IconNavigation';

const Drawer = createDrawerNavigator();

export default function SideMenuNavigation() {
  const navigation = useNavigation();

  return (
    <Drawer.Navigator
      screenOptions={{
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
      }}
      drawerContent={props => <CustomSidebarMenu {...props} />}>
      <Drawer.Screen
        name="Profil Pegawai"
        component={ProfilPegawai}
        options={() => ({
          headerRight: () => <LogoutButton />,
          drawerLabel: 'Profil Pegawai',
        })}
      />

      <Drawer.Screen
        name="Absen"
        component={PetaScreen}
        options={() => ({
          headerRight: () => <LogoutButton />,
          drawerLabel: 'Absen Hari Ini',
        })}
      />

      <Drawer.Screen
        name="Kinerja Harian"
        component={KinerjaHarian}
        options={{
          drawerLabel: 'Kinerja Harian',
          headerRight: () => (
            <IconNavigation
              page="Tambah Kegiatan"
              name="plus"
              navigation={navigation}
              size={20}
              color="#000"
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Rekapan Absen"
        component={RakapanAbsen}
        options={() => ({
          headerRight: () => <LogoutButton />,
          drawerLabel: 'Rekapan Absen',
        })}
      />
    </Drawer.Navigator>
  );
}

const LogoutButton = () => {
  const navigation = useNavigation();

  return (
    <View style={{margin: 15}}>
      <TouchableOpacity
        onPress={() => {
          Alert.alert('Uppsss!', 'Anda yakin ingin keluar dari akun?', [
            {
              text: 'Batal',
              onPress: () => null,
              style: 'cancel',
            },
            {
              text: 'Ya',
              onPress: () => logoutAction({navigation}, 'Login'),
            },
          ]);
          return true;
        }}>
        <MaterialIcons name="logout" size={25} color="#000" />
      </TouchableOpacity>
    </View>
  );
};
