/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {getData} from '../helpers/CRUD';
import Background from '../components/Background';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import {Dropdown} from 'react-native-element-dropdown/index.ts';
import moment from 'moment';
import 'moment/locale/id';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const monthData = [
  {label: 'Januari', value: '01'},
  {label: 'Februari', value: '02'},
  {label: 'Maret', value: '03'},
  {label: 'April', value: '04'},
  {label: 'Mei', value: '05'},
  {label: 'Juni', value: '06'},
  {label: 'Juli', value: '07'},
  {label: 'Agustus', value: '08'},
  {label: 'Oktober', value: '09'},
  {label: 'Oktober', value: '10'},
  {label: 'November', value: '11'},
  {label: 'Desember', value: '12'},
];

export default function RekapanAbsenScreen() {
  const [dataAbsen, setDataAbsen] = useState({});
  const [load, setLoad] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    getDataAbsen();
  }, []);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          Pilih Bulan
        </Text>
      );
    }
    return null;
  };

  const getDataAbsen = async (monthArg = '') => {
    setLoad(true);
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const decodeToken = jwtDecode(token);

      const date = new Date();
      let month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);

      setDataAbsen([]);
      const response = await getData(
        `/absen/perbulan/${decodeToken.users_id}/${
          monthArg === '' ? month : monthArg
        }`,
      );
      if (response.data.success) {
        setDataAbsen(response.data.data);
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
          justifyContent: 'flex-start',
        }}>
        <View style={styles.container}>
          {renderLabel()}
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={monthData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Pilih Bulan' : '...'}
            searchPlaceholder="Cari..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
              getDataAbsen(item.value);
            }}
            renderLeftIcon={() => (
              <FontAwesome5 name="calendar-alt" size={25} color="#000" />
            )}
          />
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <ActivityIndicator animating={load} color="black" />
          {!load && dataAbsen.length < 1 && (
            <View
              style={{
                width: '100%',
                justifyContent: 'center',
                alignItems: 'flex-start',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  color: 'black',
                }}>
                Data Kosong
              </Text>
            </View>
          )}
          {!load && dataAbsen.length > 0 && (
            <FlatList
              data={dataAbsen}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <View
                  style={{
                    width: '90%',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginLeft: 10,
                    borderColor: 'gray',
                    borderWidth: 0.7,
                    borderRadius: 3,
                    padding: 5,
                  }}>
                  <View style={{margin: 5}}>
                    <FontAwesome5
                      name="map-marker-alt"
                      size={25}
                      color="#000"
                    />
                  </View>
                  <View style={styles.flatview}>
                    <Text style={styles.judul}>
                      {moment(item.created_at)
                        .locale('id')
                        .format('dddd, DD MMMM YYYY')}
                    </Text>
                    <Text style={styles.absenTime}>
                      Masuk : {moment(item.created_at).format('hh:mm:ss')}
                    </Text>
                    <Text style={styles.absenTime}>
                      Keluar :{' '}
                      {item.latitude_keluar === null ||
                      item.longitude_keluar === null
                        ? ''
                        : moment(item.update_at).format('DD-MM-YYYY hh:mm:ss')}
                    </Text>
                  </View>
                </View>
              )}
              keyExtractor={item => item.absen_id}
            />
          )}
        </View>
      </View>
    </Background>
  );
}

const styles = StyleSheet.create({
  flatview: {
    justifyContent: 'center',
    paddingTop: 5,
  },
  judul: {
    color: 'red',
    fontFamily: 'Verdana',
    fontSize: 18,
  },
  container: {
    padding: 15,
  },
  absenTime: {
    color: 'black',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: 'black',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'black',
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
  },
});
