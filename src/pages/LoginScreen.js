import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, View} from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../core/theme';
import {idValidator} from '../helpers/idValidator';
import {passwordValidator} from '../helpers/passwordValidator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {postData} from '../helpers/CRUD';

export default function LoginScreen({navigation}) {
  const [id, setid] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});

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
    try {
      const response = await postData('/login', {
        nip: id.value,
        password: password.value,
      });
      await AsyncStorage.setItem('accessToken', response.data.token);
      navigation.reset({
        index: 0,
        routes: [{name: 'Dashboard'}],
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
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
        autoCompleteType="id"
        textContentType="idAddress"
        keyboardType="id-address"
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
      <Button mode="contained" onPress={onLoginPressed}>
        Login
      </Button>
    </Background>
  );
}

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});
