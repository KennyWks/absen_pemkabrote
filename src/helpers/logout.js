import AsyncStorage from '@react-native-async-storage/async-storage';
import {postData} from '../helpers/CRUD';
import {Alert} from 'react-native';

export const logoutAction = async (props, page) => {
  try {
    const response = await postData('/logout');
    await AsyncStorage.removeItem('accessToken');
    setTimeout(() => {
      props.navigation.push(page);
    }, 500);
    Alert.alert(response.data.message);
  } catch (error) {
    // console.log(error);
    setTimeout(() => {
      props.navigation.push(page);
    }, 500);
    Alert.alert(error.data);
  }
};
