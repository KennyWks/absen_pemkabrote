import React, {useState, useEffect} from 'react';
import {Alert, ActivityIndicator, BackHandler} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButtonLogin from '../components/BackButtonLogin';
import {idValidator} from '../helpers/idValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import {postData} from '../helpers/CRUD';
import {notifyBackHandler} from '../helpers/notifyBackHandler';

export default function LoginScreen({navigation}) {
  const [id, setid] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [load, setLoad] = useState(false);

  useEffect(() => {
    checkToken();
    BackHandler.addEventListener('hardwareBackPress', () =>
      notifyBackHandler(),
    );
  }, []);

  const checkToken = async () => {
    setLoad(true);
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      const decodeToken = jwtDecode(token);
      const dateNow = new Date();
      if (decodeToken.exp < dateNow.getTime()) {
        navigation.push('Dashboard');
      }
    }
    setLoad(false);
  };

  const onLoginPressed = () => {
    const idError = idValidator(id.value);
    const passwordError = passwordValidator(password.value);
    if (idError || passwordError) {
      setid({...id, error: idError});
      setPassword({...password, error: passwordError});
      return;
    }
    submitLogin();
  };

  const submitLogin = async () => {
    setLoad(true);
    try {
      const response = await postData('/login', {
        nip: id.value,
        password: password.value,
      });
      if (response.data.status === 200) {
        await AsyncStorage.setItem('accessToken', response.data.token);
        navigation.reset({
          index: 0,
          routes: [{name: 'Dashboard'}],
        });
      } else {
        Alert.alert(response.data.message);
        setPassword({value: ''});
      }
    } catch (error) {
      Alert.alert('Error:', JSON.stringify(error.response.status));
      // console.log(error.response);
    }
    setLoad(false);
  };

  return (
    <Background>
      <BackButtonLogin />
      <Logo />
      <Header>Silahkan login</Header>
      <TextInput
        label="NIP/NRP"
        returnKeyType="next"
        value={id.value}
        onChangeText={text => setid({value: text, error: ''})}
        error={!!id.error}
        errorText={id.error}
        autoCapitalize="none"
        keyboardType="numeric"
      />
      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({value: text, error: ''})}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      <ActivityIndicator animating={load} color="black" />
      {!load && (
        <Button mode="contained" onPress={onLoginPressed}>
          Login
        </Button>
      )}
    </Background>
  );
}
