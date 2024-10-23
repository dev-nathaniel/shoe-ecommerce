import { View, Text, Image, TouchableOpacity, FlatList, useWindowDimensions, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import { currency, slides } from '../constants/data';
import { RootState } from '../redux/store';
import {useSelector, useDispatch} from 'react-redux'
import { increaseProductQuantity, reduceProductQuantity } from '../redux/slices/cartSlice';

type Props = {}

const Card = (props: any) => {
    const [loading, setLoading] = useState(false)
    const { width, height } = useWindowDimensions()
    const dispatch = useDispatch()
    const currentCurrency = useSelector((state: RootState)=> state?.user?.currency)
    return (
        <View style={{ flex: 1, borderWidth: 2, borderRadius: 10, margin: 5, marginTop: 45, paddingTop: 100 }}>
            <View style={{ position: 'absolute', top: -50, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                {loading ? <View style={{ position: 'absolute', zIndex: 3 }}>
                    <ActivityIndicator color={'#000'} />
                </View> : null}
                <Image onLoadStart={() => setLoading(true)} onLoadEnd={() => setLoading(false)} style={{ width: 180, height: 140, opacity: loading ? 0 : 1, transform: [{ rotate: '-20deg' }] }} source={props.img} />
            </View>
            <View style={{ padding: 12, justifyContent: 'flex-end' }}>

                <View>
                    <Text numberOfLines={2} style={{ fontSize: 20, fontWeight: '700' }}>{props.name}</Text>
                    <Text style={{ marginTop: 16, fontWeight: '300' }}>{props.category}</Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: '700' }}>{currentCurrency.symbol}{props.price}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontWeight: '300', marginRight: 10 }}>x{props.quantity}</Text>
                        <View>
                            <TouchableOpacity onPress={() => dispatch(increaseProductQuantity({product: props, price: props.price}))}>
                                <AntDesign name="caretup" size={16} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> dispatch(reduceProductQuantity({product: props, price: props.price}))}>
                                <AntDesign name="caretdown" size={16} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const Cart = (props: any) => {
    const cart = useSelector((state: RootState) => state?.cart?.products)
    const total = useSelector((state: RootState) => state?.cart?.total)
    const currentCurrency = useSelector((state: RootState) => state?.user?.currency)
    const dispatch = useDispatch()

    const newCart = [
        ...cart,
        {empty: 'yes'}
    ]
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
            <View style={{ flex: 1, paddingHorizontal: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                        <AntDesign name="left" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 24, fontWeight: '600' }}>Cart</Text>
                    <View>
                        <Image style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }} source={require('../assets/images/profilePicture.png')} />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={cart.length % 2 == 0 ? cart : newCart}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                        style={{ flex: 1 }}
                        scrollEventThrottle={16}
                        renderItem={({ item, index }) => {
                            if (item.name) {
                            return (
                                <Card {...item} index={index} />
                            )} else {
                                return (
                                    <View style={{flex: 1}}></View>
                                )
                            }
                        }}

                    />
                </View>
                <View style={{ justifyContent: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ fontSize: 28, fontWeight: '500' }}>Total:</Text>
                        <Text style={{ fontSize: 30, fontWeight: '600' }}>{currentCurrency.symbol}{total.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity style={{ backgroundColor: '#f5c425', borderRadius: 50, marginTop: 16 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 18 }}>
                            <Text style={{ fontSize: 18, fontWeight: '500' }}>Pay</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Cart