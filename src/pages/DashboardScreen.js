/* eslint-disable react-native/no-inline-styles */
import 'react-native-gesture-handler';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {theme} from '../core/theme';

import ProfilPegawai from './ProfilPegawaiScreen';
import RakapanMasuk from './RekapanMasukScreen';
import KinerjaHarian from './KinerjaHarianScreen';
import PersetujuanAtasan from './PersetujuanAtasanScreen';
import RakapanAbsen from './RekapanAbsenScreen';

const Drawer = createDrawerNavigator();

const DashboardScreen = () => {
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
        options={{
          drawerLabel: 'Profil Pegawai',
        }}
        component={ProfilPegawai}
      />
      <Drawer.Screen
        name="Rekapan Masuk"
        options={{drawerLabel: 'Rekapan Masuk'}}
        component={RakapanMasuk}
      />

      <Drawer.Screen
        name="Kinerja Harian"
        options={{drawerLabel: 'Kinerja Harian'}}
        component={KinerjaHarian}
      />

      <Drawer.Screen
        name="Persetujuan Atasan"
        options={{drawerLabel: 'Persetujuan Atasan'}}
        component={PersetujuanAtasan}
      />

      <Drawer.Screen
        name="Rekapan Absen"
        options={{drawerLabel: 'Rekapan Absen'}}
        component={RakapanAbsen}
      />
    </Drawer.Navigator>
  );
};

export default DashboardScreen;
