import { View, Text, TouchableOpacity } from 'react-native'
import React, {useEffect} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { useDrawerStatus } from '@react-navigation/drawer'
import { selectTab } from '../redux/slices/drawerTabSlice'
import {useDispatch} from 'react-redux'
 
type Props = {}

const Orders = (props: any) => {
    const open = useDrawerStatus() === 'open'
    const dispatch = useDispatch()
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
                        <AntDesign name={open ? "menufold" : "menuunfold"} size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
                        <AntDesign name="shoppingcart" size={24} color="black" />
                    </TouchableOpacity>
                </View>
      <Text>Orders</Text>
    </SafeAreaView>
  )
}

export default Orders