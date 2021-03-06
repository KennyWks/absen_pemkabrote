/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Background from '../components/Background';
import {getData} from '../helpers/CRUD';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function KinerjaHarianScreen({navigation}) {
  const [data, setData] = useState({});
  const [load, setLoad] = useState(false);

  useEffect(() => {
    getDataPekerjaan();
  }, []);

  const getDataPekerjaan = async () => {
    setLoad(true);
    try {
      setData([]);
      const token = await AsyncStorage.getItem('accessToken');
      const decodeToken = jwtDecode(token);
      const response = await getData(`/pekerjaan/${decodeToken.users_id}`);
      if (response.data.success) {
        setData(response.data.data);
      } else {
        Alert.alert(response.data.message);
      }
    } catch (error) {
      Alert.alert('Error:', JSON.stringify(error.response.status));
    }
    setLoad(false);
  };

  return (
    <Background>
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}>
        <ActivityIndicator animating={load} color="black" />
        {!load && data.length < 1 && (
          <View
            style={{
              width: '100%',
              height: '100%',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text>Data Kosong</Text>
          </View>
        )}
        {!load && data.length > 0 && (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            renderItem={({item, i}) => (
              <View
                style={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  flexDirection: 'row',
                  borderColor: 'gray',
                  borderWidth: 0.7,
                  borderRadius: 3,
                  marginBottom: 5,
                }}>
                <View
                  style={{
                    width: '15%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Ubah Kegiatan', {
                        pekerjaan_id: item.pekerjaan_id,
                        judul_kegiatan: item.judul,
                        deskripsi_kegiatan: item.deskripsi,
                        mulai_kegiatan: item.mulai,
                        selesai_kegiatan: item.selesai,
                      });
                    }}>
                    <FontAwesome5 name="pen-square" size={25} color="#000" />
                  </TouchableOpacity>
                </View>
                <View style={styles.flatview}>
                  <Text style={styles.judul}>
                    {item.judul}
                    {item.status === 1 && (
                      <FontAwesome5
                        name="clipboard-check"
                        size={25}
                        color="#000"
                      />
                    )}
                  </Text>
                  <Text>{item.deskripsi}</Text>
                </View>
              </View>
            )}
            keyExtractor={item => item.pekerjaan_id}
          />
        )}
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  flatview: {
    justifyContent: 'center',
    paddingTop: 10,
    borderRadius: 2,
  },
  judul: {
    color: 'red',
    fontFamily: 'Verdana',
    fontSize: 20,
  },
});
