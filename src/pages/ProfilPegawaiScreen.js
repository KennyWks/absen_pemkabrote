/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import Background from '../components/Background';
import {ScrollView} from 'react-native-gesture-handler';
import {CardViewWithImage} from 'react-native-simple-card-view';
import {View, Button, Text} from 'react-native';
import {logoutAction} from '../helpers/logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import Clock from '../components/Clock';
import user from '../assets/images/user.jpg';

export default function ProfilPegawaiScreen({navigation}) {
  const [nip, setNip] = useState('');
  const [nama, setNama] = useState('');
  const [namaJabatan, setNamaJabatan] = useState('');
  const [namaUnitKerja, setNamaUnitKerja] = useState('');

  let now = new Date();
  var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  var months = [
    'Januari',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember',
  ];

  var day = days[now.getDay()];
  var month = months[now.getMonth()];

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    const decodeToken = jwtDecode(token);
    const dateNow = new Date();
    if (!decodeToken.exp < dateNow.getTime()) {
      setNip(decodeToken.nip);
      setNama(decodeToken.nama);
      setNamaJabatan(decodeToken.nama_jabatan);
      setNamaUnitKerja(decodeToken.nama_unit);
    } else {
      logoutAction();
    }
  };

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
            <CardViewWithImage
              width={300}
              content={`${namaJabatan} \n ${namaUnitKerja} \n NIP :${nip}`}
              source={user}
              title={`${nama}`}
              imageWidth={100}
              imageHeight={100}
              roundedImage={true}
              roundedImageValue={50}
              imageMargin={{top: 10}}
              contentTextAlign={'center'}
            />

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
              }}>
              <Button
                color="#560CCE"
                title="Absen Masuk"
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Peta'}],
                  });
                }}
              />

              <Button
                color="#560CCE"
                title="Absen Keluar"
                onPress={() => {
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Peta'}],
                  });
                }}
              />
            </View>
            <Clock />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                width: '100%',
                margin: 5,
              }}>
              <Text
                style={{
                  fontFamily: 'Helvetica',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}>
                {`${day}, ${now.getDay()} ${month} ${now.getFullYear()}`}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
}
