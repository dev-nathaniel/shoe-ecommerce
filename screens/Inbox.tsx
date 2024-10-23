import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React,{useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { useDrawerProgress, useDrawerStatus } from '@react-navigation/drawer'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { selectTab } from '../redux/slices/drawerTabSlice'
import {useDispatch, useSelector} from 'react-redux'
import { RootState } from '../redux/store';


type Props = {}

const inbox = [
    {
        title: 'Promo',
        preview: '#BOCHRISTMASday',
        date: '06-12-2022'
    },
    {
        title: 'Order',
        preview: 'Your order has been shipped out!',
        date: '06-12-2022'
    },
    {
        title: 'Review',
        preview: 'Thank you for your order. Please share your thoughts about the products',
        date: '06-12-2022'
    },
]

const Message = (props: any) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <View style={{ padding: 8, borderRadius: 30, borderWidth: 1, borderColor: 'gray' }}>

                    <Entypo name="shop" size={30} color="gray" />
                    <View style={{width: 8, height: 8, borderRadius: 20, backgroundColor: 'red', position: 'absolute',}}></View>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={{fontWeight: '600', fontSize: 18}}>{props.title}</Text>
                    <Text numberOfLines={1} style={{marginTop: 6}}>{props.preview}</Text>
                </View>
            </View>
            <View>
                <Text style={{fontWeight: '300', fontSize: 12}}>{props.date}</Text>
            </View>
        </View>
    )
}

const Inbox = (props: any) => {
    const open = useDrawerStatus() === 'open'
    const dispatch = useDispatch()
    const quantity = useSelector((state: RootState) => state?.cart?.quantity)
    const drawerProgress = useDrawerProgress()
    const viewStyles = useAnimatedStyle(() => {
        const scale = interpolate(
            drawerProgress.value,
            [0, 1],
            [1, 0.8]
        )

        const borderRadius = interpolate(
            drawerProgress.value,
            [0, 1],
            [0, 26]
        )
        return {
            borderRadius, transform: [{ scale }]
        }
    })
    return (
        <Animated.View style={[{flex: 1}, viewStyles]}>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
                    <AntDesign name={open ? "menufold" : "menuunfold"} size={24} color="black" />
                </TouchableOpacity>
                <View>
                    <Text style={{ fontSize: 24, fontWeight: '600' }}>Inbox ({inbox.length})</Text>
                </View>
                <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
                        <AntDesign name="shoppingcart" size={30} color="black" />
                        <View style={{position: 'absolute', top: 0, right: 0, width: 15, height: 15, borderRadius: 15, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'white', textAlign: 'center'}}>{quantity}</Text>
                        </View>
                    </TouchableOpacity>
            </View>
            <FlatList
                data={inbox}
                keyExtractor={(item, index) => index.toString()}
                style={{ flex: 1, padding: 20, marginTop: 20 }}
                ItemSeparatorComponent={()=> (<View style={{width: '100%', height: 1, backgroundColor: 'gray', marginVertical: 20}}></View>)}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => {
                    return (
                        <Message {...item} />
                    )
                }}
            />
        </SafeAreaView>
        </Animated.View>
    )
}

export default Inbox