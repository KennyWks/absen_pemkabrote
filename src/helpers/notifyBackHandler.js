import {Alert, BackHandler} from 'react-native';

export const notifyBackHandler = () => {
  Alert.alert('Uppsss!', 'Anda yakin ingin keluar aplikasi?', [
    {
      text: 'Batal',
      onPress: () => null,
      style: 'cancel',
    },
    {text: 'Ya', onPress: () => BackHandler.exitApp()},
  ]);
  return true;
};
