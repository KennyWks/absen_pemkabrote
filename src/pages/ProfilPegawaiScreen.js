/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import Background from '../components/Background';
import {CardViewWithIcon} from 'react-native-simple-card-view';
import Button from '../components/Button';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {postData} from '../helpers/CRUD';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfilPegawaiScreen({navigation}) {
  return (
    <Background>
      <ScrollView>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <CardViewWithIcon
              androidIcon={'md-bonfire'}
              iosIcon={'ios-bonfire-outline'}
              iconBgColor={'#b13757'}
              iconColor={'#FFFFFF'}
              title={'Kenny Perulu'}
              content={('1234567890123456', 'Dinas Kominfo & Kota Kupang')}
            />
            <Button mode="contained" onPress={() => console.log('ok')}>
              Absen Sekarang
            </Button>
            <Button
              mode="contained"
              onPress={async () => {
                try {
                  const token = await AsyncStorage.getItem('accessToken');
                  console.log(token);
                  const response = await postData('/logout', {
                    token: token,
                  });
                  console.log(response.data);
                  if (response.data.success) {
                    await AsyncStorage.removeItem('accessToken', token);
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'Login'}],
                    });
                  }
                } catch (error) {
                  console.log(error);
                }
              }}>
              Keluar
            </Button>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: '100%',
  },
  title: {
    fontSize: 18,
    height: 44,
    padding: 10,
  },
});
