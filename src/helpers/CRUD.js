import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ApiURL = 'https://absen-pemkab-rotte-112.herokuapp.com/api';

const header = {
  'Content-Type': 'multipart/form-data',
};
let token = {};

export const postData = async (path, data) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (accessToken) {
    token = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
  } else {
    token = {};
  }

  try {
    const response = await axios.post(ApiURL + path, data, token, header);
    return response;
  } catch (error) {
    throw error;
  }
};

export const patchData = async (path, data) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (accessToken) {
    token = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
  } else {
    token = {};
  }

  try {
    const response = await axios.patch(ApiURL + path, data, token, header);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getData = async path => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (accessToken) {
    token = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
  } else {
    token = {};
  }

  try {
    const response = await axios.get(ApiURL + path, token);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteData = async path => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (accessToken) {
    token = {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    };
  } else {
    token = {};
  }

  try {
    const response = await axios.delete(ApiURL + path, token);
    return response;
  } catch (error) {
    throw error;
  }
};
