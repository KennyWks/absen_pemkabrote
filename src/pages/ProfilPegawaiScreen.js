/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import Background from '../components/Background';
import {ScrollView} from 'react-native-gesture-handler';
import CardView from 'react-native-cardview';
import {View, Text, StyleSheet} from 'react-native';
import {logoutAction} from '../helpers/logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import Clock from '../components/Clock';
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
            flexDirection: 'column',
          }}>
          <CardView
            cardElevation={1}
            cardMaxElevation={1}
            cornerRadius={5}
            style={styles.card}>
            <Text
              style={{
                textAlign: 'center',
                margin: 10,
                fontSize: 25,
                color: 'black',
              }}>
              Selamat Datang!
            </Text>
            <Text style={styles.text}>{nama}</Text>
            <Text style={styles.text}>{nip}</Text>
            <Text style={styles.text}>{namaJabatan}</Text>
            <Text style={styles.text}>{namaUnitKerja}</Text>
          </CardView>
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
                {createdAt === '' ? '-' : moment(createdAt).format('hh:mm:ss')}
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
                {updatedAt === '' ? '-' : moment(updatedAt).format('hh:mm:ss')}
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
      </ScrollView>
    </Background>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
    margin: 10,
  },
  text: {
    textAlign: 'center',
    margin: 5,
    color: 'black',
  },
});
