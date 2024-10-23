import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, {useState, useEffect} from 'react'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, useDrawerProgress } from '@react-navigation/drawer'
import Home from '../screens/Home'
import type { RootState } from '../redux/store'
import {useSelector, useDispatch} from 'react-redux'
import { AntDesign } from '@expo/vector-icons';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';
import { selectTab } from '../redux/slices/drawerTabSlice'
import Wishlist from '../screens/Wishlist'
import Inbox from '../screens/Inbox'
import Orders from '../screens/Orders'
import Settings from '../screens/Settings'

type Props = {}

const drawerItems = [
    {
        icon: "laptop",
        label: 'Collection'
    },
    {
        icon: "hearto",
        label: 'Wishlist'
    },
    {
        icon: "inbox",
        label: 'Inbox'
    },
    // {
    //     icon: "creditcard",
    //     label: 'Orders'
    // },
    {
        icon: "setting",
        label: 'Settings'
    }
]

const Drawer = createDrawerNavigator()

const CustomDrawerItem = (props: any) => {
    const selectedTab = useSelector((state: RootState) => state?.drawerTab?.tab)
    const dispatch = useDispatch()
    const focused = props.state?.index === props.state?.routes.findIndex((e: any) => e.name === props.label)
    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                height: 40,
                marginBottom: 20,
                alignItems: 'center',
                borderRadius: 8,
                paddingHorizontal: 8,
                backgroundColor: focused ? '#000000' : 'transparent'
            }}
            onPress={()=> { props.navigation && props.navigation.navigate(props.label)}}
        >
            <AntDesign name={props.Icon} size={24} color={focused ? 'white' : 'black'} />
            <Text style={{marginLeft: 20, fontSize: 20, fontWeight: '500', color: focused ? 'white' : 'black'}}>{props.label}</Text>
        </TouchableOpacity>
    )
}

const CustomDrawerContent = (props: any) => {
    
    return (
        <DrawerContentScrollView
            scrollEnabled={true}
            contentContainerStyle={{flex: 1}}
        >
            <View style={{flex: 1, paddingHorizontal: 25}}>
                <View style={{alignItems: 'flex-start', justifyContent: 'center'}}>
                    <TouchableOpacity style={{alignItems: 'center', justifyContent: 'center'}} onPress={()=> props.navigation.closeDrawer()}>
                    <AntDesign name="close" size={35} color="black" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={{flexDirection: 'row', marginTop: 16, alignItems: 'center'}} onPress={() => console.log('profile')}>
                    <Image style={{width: 50, height: 50, borderRadius: 50, marginRight: 10}} source={require('../assets/images/profilePicture.png')} />
                    <View style={{flex: 1}}>
                        <Text style={{fontSize: 16, fontWeight: '500',}} numberOfLines={1}>Adebayo Olowofoyeku</Text>
                        <Text style={{fontSize: 14}}>View your profile</Text>
                    </View>
                </TouchableOpacity>

                <View style={{flex: 1, marginTop: 24}}>
                    {drawerItems.map((drawerItem, index) => (
                        <CustomDrawerItem state={props.state} navigation={props.navigation} Icon={drawerItem.icon} {...drawerItem} key={`drawerItem-${index}`} />
                    ))}
                </View>

                <View style={{marginBottom: 24}}>
                    <CustomDrawerItem state={props.state} label={'Log Out'} Icon="poweroff" />
                </View>
            </View>
            {/* <DrawerItemList {...props} /> */}
            {/* <DrawerItem label='test' onPress={()=>alert('yo')} /> */}
        </DrawerContentScrollView>
    )
}

const CustomDrawer = (props: any) => {
    const selectedTab = useSelector((state: RootState)=> state?.drawerTab?.tab)
    // useEffect(() => {
    //     props.navigation.navigate(selectedTab)
    // }, [selectedTab])
    
  return (
    <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <Drawer.Navigator
        screenOptions={
            {
                drawerType: 'slide',
                overlayColor: 'transparent',
                drawerStyle: {
                    flex: 1,
                    width: '65%',
                    backgroundColor: 'transparent'
                },
                sceneContainerStyle: {
                    backgroundColor: 'transparent'
                },
                headerShown: false
            }
        }
        initialRouteName='MainLayout'
        drawerContent={props => {
            return (
                <CustomDrawerContent {...props} />
            )
        }}
      >
        <Drawer.Screen  name='Collection'>
            {props => <Home {...props} /> }
        </Drawer.Screen>
        <Drawer.Screen options={{headerShown: false}} name='Wishlist' component={Wishlist} />
      <Drawer.Screen options={{headerShown: false}} name='Inbox' component={Inbox} />
      <Drawer.Screen options={{headerShown: false}} name='Orders' component={Orders} />
      <Drawer.Screen options={{headerShown: false}} name='Settings' component={Settings} />
      </Drawer.Navigator>
    </View>
  )
}

export default CustomDrawer