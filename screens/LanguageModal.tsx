import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { RootState } from '../redux/store';
import { countryListAllIsoData, currency, LANGUAGES } from '../constants/data';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updateCurrency, updateLanguage, updateLocation } from '../redux/slices/userSlice';

export default function LanguageModal(props: any) {
  const dispatch = useDispatch()
  const currentLanguage = useSelector((state: RootState) => state?.user?.language)



  return (
    <View style={styles.container}>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ flex: 1, textAlign: 'center', fontWeight: '500', fontSize: 24 }}>Languages</Text>
        <TouchableOpacity onPress={()=> props.navigation.navigate('Settings')}>
          <AntDesign name="close" size={24} style={{ marginRight: 8 }} color="black" />
        </TouchableOpacity>
      </View>
      <SafeAreaView edges={['bottom', 'left', 'right']} style={{ paddingHorizontal: 16, marginTop: 16, flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={LANGUAGES}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity disabled={item == 'English' || item == 'French' ?  false : true} onPress={() => {dispatch(updateLanguage(item)); props.navigation.navigate('Settings')}} style={{flexDirection: 'row', alignItems: 'center', borderColor: '#00000020', borderTopWidth: 1, paddingVertical: 16}}>
                <Text style={{ fontWeight: currentLanguage == item ?  '700' : '400'}}>{item}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 8
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});