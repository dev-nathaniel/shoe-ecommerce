import { AntDesign } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, View, Text } from 'react-native';
import { FlatList, TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react'

import EditScreenInfo from '../components/EditScreenInfo';
import { RootState } from '../redux/store';
import { countryListAllIsoData } from '../constants/data';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updateLocation } from '../redux/slices/userSlice';
//import { Text, View } from '../components/Themed';

export default function LocationModal(props: any) {
  const dispatch = useDispatch()
  const location = useSelector((state: RootState) => state?.user?.country)
  // const [sections, setSections] = useState<any[]>([])

  // useEffect(() => {
  //   countryListAllIsoData.forEach(country => {
  //     const firstLetter = country.name.charAt(0);
  //     const section = sections.find(section => section.title === firstLetter);

  //     if (!section) {
  //       const section = { title: firstLetter, data: [] }
  //       setSections([section, ...sections])
  //     }
  //     if (section) {
  //       const found = section.data.find((i: any) => {
  //         return i.name === section.name
  //       })
  //       if (found) {
  //         null
  //       } else {
  //         section.data.push(country)
  //       }
  //     }
  //   })
  // }, [sections])



  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', right: 0, top: 0, bottom: 0, justifyContent: 'center' }}>
        {countryListAllIsoData.map((section: any, index) => {
          return (
            <TouchableOpacity key={`${section.title}-${index}`} style={{ marginVertical: 2 }}>
              <Text style={{ fontSize: 12 }}>{section.title}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
      {/* <Text style={styles.title}>Modal</Text> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <EditScreenInfo path="/screens/ModalScreen.tsx" /> */}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ flex: 1, textAlign: 'center', fontWeight: '500', fontSize: 24 }}>Location</Text>
        <TouchableOpacity onPress={()=> props.navigation.navigate('Settings')}>
          <AntDesign name="close" size={24} style={{ marginRight: 8 }} color="black" />
        </TouchableOpacity>
      </View>
      <SafeAreaView edges={['bottom', 'left', 'right']} style={{ paddingHorizontal: 16, marginTop: 16, flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign name="search1" size={20} color="#00000080" />
          <TextInput style={{ flex: 1, marginLeft: 8, fontSize: 20 }} placeholderTextColor='#00000050' placeholder='Search...' />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
          <Text>{location?.name}</Text>
          <Text style={{ color: '#00000060' }}>Current</Text>
        </View>
        <FlatList
          style={{ flex: 1 }}
          data={countryListAllIsoData}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={({ item, index }) => {
            const index1 = index
            return (
              <View>
                <Text style={{ fontWeight: '700', marginVertical: 10, }}>{item.title}</Text>
                {item.data.map((countryData: any, index: number) => {
                  const firstIndex = index1
                  return (
                    <TouchableOpacity onPress={()=> {dispatch(updateLocation(countryData)); props.navigation.navigate('Settings')}} key={`${firstIndex}-${index}`} style={{ paddingVertical: 10, flex: 1, paddingLeft: 8 }}>
                      <Text>{countryData.name}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
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
    // alignItems: 'center',
    // justifyContent: 'center',
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
