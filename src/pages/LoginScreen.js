import React, {useState} from 'react';
import {Alert, ActivityIndicator} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButtonLogin from '../components/BackButtonLogin';
import {idValidator} from '../helpers/idValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {postData} from '../helpers/CRUD';

export default function LoginScreen({navigation}) {
  const [id, setid] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [load, setLoad] = useState(false);

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
      Alert.alert(error.response.status);
      // console.log(error.response);
    }
    setLoad(false);
  };

  return (
    <Background>
      <BackButtonLogin />
      <Logo />
      <Header>Selamat Datang!</Header>
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
