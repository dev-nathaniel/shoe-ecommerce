import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import { useDrawerProgress, useDrawerStatus } from '@react-navigation/drawer'
import { selectTab } from '../redux/slices/drawerTabSlice'
import { useDispatch, useSelector } from 'react-redux'
import Animated, { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { RootState } from '../redux/store';

type Props = {}



const Tab = (props: any) => {
    return (
        <TouchableOpacity onPress={() => props.navigation.navigate(props.route ? props.route : 'LocationModal')}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{flexDirection: 'row', alignItems: 'center', flex: 2}}>
                {props.icon}
                <Text style={{marginLeft: 5}}>{props.title}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                    <Text numberOfLines={1} style={{ color: '#00000070', fontSize: 12, marginRight: 5 }}>{props.title == 'Currency' ? `${props.data?.symbol} ${props.data.code}` : props.data}</Text>
                    <AntDesign name="right" size={24} color="gray" />
                </View>
            </View>
        </TouchableOpacity>
    )
}

const Settings = (props: any) => {


    const open = useDrawerStatus() === 'open'
    const dispatch = useDispatch()
    const language = useSelector((state: RootState) => state?.user?.language)
    const currency = useSelector((state: RootState) => state?.user?.currency)
    const location = useSelector((state: RootState) => state?.user?.country)
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

    const settings = [
        {
            title: 'Location',
            route: 'LocationModal',
            data: location?.name,
            icon: <AntDesign name='enviromento' size={20} color="black" />
        },
        {
            title: 'Currency',
            route: 'CurrencyModal',
            data: currency,
            icon: <FontAwesome name="money" size={20} color="black" />
        },
        {
            title: 'Language',
            route: 'LanguageModal',
            data: language,
            icon: <Ionicons name="language-outline" size={20} color="black" />
        },
        {
            title: 'Connect with Us',
            route: '',
            icon: <AntDesign name="disconnect" size={20} color="black" />
        },
    ]
    return (
        <Animated.View style={[{ flex: 1 }, viewStyles]}>
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
                <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
                        <AntDesign name={open ? "menufold" : "menuunfold"} size={24} color="black" />
                    </TouchableOpacity>
                    <View>
                        <Text style={{ fontSize: 24, fontWeight: '600' }}>Settings</Text>
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
                        <AntDesign name="shoppingcart" size={30} color="black" />
                        <View style={{ position: 'absolute', top: 0, right: 0, width: 15, height: 15, borderRadius: 15, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', textAlign: 'center' }}>{quantity}</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={settings}
                    keyExtractor={(item, index) => index.toString()}
                    style={{ flex: 1, padding: 20, marginTop: 20 }}
                    ItemSeparatorComponent={() => (<View style={{ width: '97%', alignSelf: 'center', height: 1, backgroundColor: '#00000040', marginVertical: 16 }}></View>)}
                    scrollEventThrottle={16}
                    renderItem={({ item, index }) => {
                        return (
                            <Tab navigation={props.navigation} {...item} />
                        )
                    }}
                />
            </SafeAreaView>
        </Animated.View>
    )
}

export default Settings