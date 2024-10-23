import { View, Text, TouchableOpacity, FlatList, useWindowDimensions, ActivityIndicator, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import {SafeAreaView} from 'react-native-safe-area-context'
import { AntDesign } from '@expo/vector-icons'
import { useDrawerProgress, useDrawerStatus } from '@react-navigation/drawer'
import { slides } from '../constants/data'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { selectTab } from '../redux/slices/drawerTabSlice'
import {useDispatch, useSelector} from 'react-redux'
import { RootState } from '../redux/store';
import { removeWishProduct } from '../redux/slices/wishListSlice'
 
type Props = {}
const Card = (props: any) => {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const { width, height } = useWindowDimensions()
    const currency = useSelector((state: RootState)=> state?.user?.currency)
    return (
        <View style={{ flex: 1, borderWidth: 2, borderRadius: 10, margin: 5, marginTop: 55, paddingTop: 100 }}>
            <TouchableOpacity onPress={()=> dispatch(removeWishProduct({product: props}))} style={{position: 'absolute', bottom: -6, right: -6}}>
            <AntDesign name="closecircle" size={24} color="black" />
            </TouchableOpacity>
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
                    <Text style={{ fontSize: 18, fontWeight: '700' }}>{currency.symbol}{props.price}</Text>
                    {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontWeight: '300', marginRight: 10 }}>x1</Text>
                        <View>
                            <TouchableOpacity>
                                <AntDesign name="caretup" size={16} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <AntDesign name="caretdown" size={16} color="black" />
                            </TouchableOpacity>
                        </View>
                    </View> */}
                </View>
            </View>
        </View>
    )
}

const Wishlist = (props: any) => {
    const open = useDrawerStatus() === 'open'
    const dispatch = useDispatch()
    const quantity = useSelector((state: RootState) => state?.cart?.quantity)
    const wishList = useSelector((state: RootState) => state?.wishList?.products)
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

    const newWishList =  [
        ...wishList, 
        {empty: 'yes'}
    ]
  return (
    <Animated.View style={[{flex: 1}, viewStyles]}>
    <SafeAreaView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
        <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
                        <AntDesign name={open ? "menufold" : "menuunfold"} size={24} color="black" />
                    </TouchableOpacity>
                    <View>
                        <Text style={{fontSize: 24, fontWeight: '600'}}>WishList</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
                        <AntDesign name="shoppingcart" size={30} color="black" />
                        <View style={{position: 'absolute', top: 0, right: 0, width: 15, height: 15, borderRadius: 15, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'white', textAlign: 'center'}}>{quantity}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={wishList.length % 2 == 0 ? wishList : newWishList}
                        numColumns={2}
                        keyExtractor={(item, index) => index.toString()}
                        style={{ flex: 1 }}
                        scrollEventThrottle={16}
                        renderItem={({ item, index }) => {
                            if (item.name) {
                            return (
                                <Card {...item} index={index} />
                            )
                            } else {
                                return (
                                    <View style={{flex: 1}}></View>
                                )
                            }
                        }}

                    />
                </View>
    </SafeAreaView>
    </Animated.View>
  )
}

export default Wishlist