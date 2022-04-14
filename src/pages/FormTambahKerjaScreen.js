/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Background from '../components/Background';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import {judulValidator} from '../helpers/judulValidator';
import {deskripsiValidator} from '../helpers/deskripsiValidator';
import {mulaiValidator} from '../helpers/mulaiValidator';
import {selesaiValidator} from '../helpers/selesaiValidator';
import Icon from 'react-native-ico';
import {postData} from '../helpers/CRUD';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import moment from 'moment';

export default function FormTambahKerjaScreen() {
  const [load, setLoad] = useState(false);
  const [judul, setJudul] = useState({value: '', error: ''});
  const [deskripsi, setDeskripsi] = useState({value: '', error: ''});
  const [mulai, setMulai] = useState({value: '', error: ''});
  const [selesai, setSelesai] = useState({value: '', error: ''});
  const [isDatePickerMulaiVisible, setDatePickerMulaiVisibility] =
    useState(false);
  const [isDatePickerSelesaiVisible, setDatePickerSelesaiVisibility] =
    useState(false);

  const onSendPressed = () => {
    const judulError = judulValidator(judul.value);
    const deskripsiError = deskripsiValidator(deskripsi.value);
    const mulaiError = mulaiValidator(mulai.value);
    const selesaiError = selesaiValidator(selesai.value);

    if (judulError || deskripsiError || mulaiError || selesaiError) {
      setJudul({...judul, error: judulError});
      setDeskripsi({...deskripsi, error: deskripsiError});
      setMulai({...mulai, error: mulaiError});
      setSelesai({...selesai, error: selesaiError});
      return;
    }
    submitKegiatan();
  };

  const submitKegiatan = async () => {
    setLoad(true);
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const decodeToken = jwtDecode(token);
      const response = await postData('/pekerjaan', {
        users_id: decodeToken.users_id,
        judul: judul.value,
        deskripsi: deskripsi.value,
        mulai: mulai.value,
        selesai: selesai.value,
      });
      Alert.alert(response.data.message);
      if (response.data.success) {
        setJudul({value: '', error: ''});
        setDeskripsi({value: '', error: ''});
        setMulai({value: '', error: ''});
        setSelesai({value: '', error: ''});
      }
    } catch (error) {
      Alert.alert(error.response.status);
      // console.log(error.response);
    }
    setLoad(false);
  };

  const showDatePickerMulai = () => {
    setDatePickerMulaiVisibility(true);
  };

  const hideDatePickerMulai = () => {
    setDatePickerMulaiVisibility(false);
  };

  const showDatePickerSelesai = () => {
    setDatePickerSelesaiVisibility(true);
  };

  const hideDatePickerSelesai = () => {
    setDatePickerSelesaiVisibility(false);
  };

  const handleConfirmMulai = date => {
    setMulai({value: moment(date).format('hh:mm:ss'), error: ''});
    hideDatePickerMulai();
  };

  const handleConfirmSelesai = date => {
    setSelesai({value: moment(date).format('hh:mm:ss'), error: ''});
    hideDatePickerSelesai();
  };

  return (
    <ScrollView>
      <Background>
        <View
          style={{
            width: '98%',
            justifyContent: 'center',
            flexDirection: 'column',
          }}>
          <TextInput
            label="Judul"
            returnKeyType="next"
            value={judul.value}
            onChangeText={text => setJudul({value: text, error: ''})}
            error={!!judul.error}
            errorText={judul.error}
          />
          <TextInput
            label="Deskripsi"
            returnKeyType="next"
            value={deskripsi.value}
            onChangeText={text => setDeskripsi({value: text, error: ''})}
            error={!!deskripsi.error}
            errorText={deskripsi.error}
            multiline={true}
            numberOfLines={10}
            autoCapitalize="none"
          />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text style={styles.textInputDate} onPress={showDatePickerMulai}>
              {mulai.value === undefined || mulai.value === ''
                ? 'Mulai'
                : `${mulai.value}`}
            </Text>
            <TouchableOpacity
              style={{width: '10%'}}
              onPress={showDatePickerMulai}>
              <Icon
                name="calendar"
                height="30"
                width="30"
                group="miscellaneous"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.smallText}>
            {mulai.error ? `${mulai.error}` : ''}
          </Text>
          <DateTimePickerModal
            isVisible={isDatePickerMulaiVisible}
            mode="time"
            locale="id-ID"
            is24Hour={true}
            onConfirm={handleConfirmMulai}
            onCancel={hideDatePickerMulai}
          />
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Text style={styles.textInputDate} onPress={showDatePickerSelesai}>
              {selesai.value === undefined || selesai.value === ''
                ? 'Selesai'
                : `${selesai.value}`}
            </Text>
            <TouchableOpacity
              style={{width: '10%'}}
              onPress={showDatePickerSelesai}>
              <Icon
                name="calendar"
                height="30"
                width="30"
                group="miscellaneous"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.smallText}>
            {selesai.error ? `${mulai.error}` : ''}
          </Text>
          <DateTimePickerModal
            isVisible={isDatePickerSelesaiVisible}
            mode="time"
            locale="id-ID"
            is24Hour={true}
            onConfirm={handleConfirmSelesai}
            onCancel={hideDatePickerSelesai}
          />
          <ActivityIndicator animating={load} color="black" />
          {!load && (
            <Button
              mode="contained"
              onPress={() => {
                onSendPressed();
              }}>
              Tambah
            </Button>
          )}
        </View>
      </Background>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textInputDate: {
    width: '80%',
    margin: 5,
    padding: 10,
    justifyContent: 'flex-start',
    color: 'lightgrey',
    borderColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 5,
  },
  smallText: {
    fontSize: 11,
    color: 'red',
    margin: 0,
    marginLeft: 7,
  },
});
