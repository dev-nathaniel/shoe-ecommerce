import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'
import { RootState } from '../redux/store';
import { countryListAllIsoData, currency } from '../constants/data';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updateCurrency, updateLocation } from '../redux/slices/userSlice';

export default function CurrencyModal(props: any) {
  const dispatch = useDispatch()
  const currentCurrency = useSelector((state: RootState) => state?.user?.currency)



  return (
    <View style={styles.container}>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ flex: 1, textAlign: 'center', fontWeight: '500', fontSize: 24 }}>Currencies</Text>
        <TouchableOpacity onPress={()=> props.navigation.navigate('Settings')}>
          <AntDesign name="close" size={24} style={{ marginRight: 8 }} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 16, marginTop: 16, flex: 1 }}>
        <FlatList
          style={{ flex: 1 }}
          data={currency}
          keyExtractor={(item, index) => `${item.code}-${index}`}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => {dispatch(updateCurrency(item)); props.navigation.navigate('Settings')}} style={{flexDirection: 'row', alignItems: 'center', borderColor: '#00000020', borderTopWidth: 1, paddingVertical: 16}}>
                <Text style={{ fontWeight: currentCurrency.code == item.code ?  '700' : '400'}}>{item.code}</Text>
                <Text style={{marginLeft: 24}}>{item.symbol}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>
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