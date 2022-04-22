/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import Background from '../components/Background';
import {ScrollView} from 'react-native-gesture-handler';
import {CardViewWithImage} from 'react-native-simple-card-view';
import {View, Text} from 'react-native';
import {logoutAction} from '../helpers/logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import Clock from '../components/Clock';
import user from '../assets/images/user.jpg';
import {getData} from '../helpers/CRUD';
import moment from 'moment';

export default function ProfilPegawaiScreen({navigation}) {
  const [nip, setNip] = useState('');
  const [nama, setNama] = useState('');
  const [namaJabatan, setNamaJabatan] = useState('');
  const [namaUnitKerja, setNamaUnitKerja] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');

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
      const response = await getData(`/absen/today/${decodeToken.users_id}`);
      let data = [];
      if (response.data.success) {
        data = response.data.data[0];
        setCreatedAt(data.created_at);
      }
      if (
        response.data.success &&
        data.latitude_keluar !== null &&
        data.longitude_keluar !== null
      ) {
        setUpdatedAt(data.updated_at);
      }
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
              key={nip}
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
              <View
                style={{
                  margin: 5,
                  padding: 10,
                  backgroundColor: '#560CCE',
                  borderColor: 'lightgrey',
                  borderWidth: 1,
                  borderRadius: 5,
                }}>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  Absen Masuk
                </Text>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  {createdAt === ''
                    ? '-'
                    : moment(createdAt).format('hh:mm:ss')}
                </Text>
              </View>

              <View
                style={{
                  margin: 5,
                  padding: 10,
                  backgroundColor: '#560CCE',
                  borderColor: 'lightgrey',
                  borderWidth: 1,
                  borderRadius: 5,
                }}>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  Absen Keluar
                </Text>
                <Text style={{color: 'white', textAlign: 'center'}}>
                  {updatedAt === ''
                    ? '-'
                    : moment(updatedAt).format('hh:mm:ss')}
                </Text>
              </View>
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
                {`${day}, ${now.getDate()} ${month} ${now.getFullYear()}`}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Background>
  );
}
