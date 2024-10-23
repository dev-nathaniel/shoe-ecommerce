import { View, Text, TouchableOpacity, FlatList, useWindowDimensions, Image, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Animated, { Easing, interpolate, useAnimatedStyle, useSharedValue, withRepeat, withSpring, withTiming } from 'react-native-reanimated'
import { useDrawerProgress, useDrawerStatus } from '@react-navigation/drawer'
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context'
import { slides } from '../constants/data'
import { useDispatch, useSelector } from 'react-redux'
import { selectTab } from '../redux/slices/drawerTabSlice';
import { RootState } from '../redux/store';
import { addProduct } from '../redux/slices/cartSlice';
import { addWishProduct } from '../redux/slices/wishListSlice';
import Toast from 'react-native-root-toast';
type Props = {}



const Slide = (props: any) => {
    const [loading, setLoading] = useState(false)
    const { width, height } = useWindowDimensions()
    const size = width * 0.8
    const imageRef = useRef<Image>(null)
    const cart = useRef<TouchableOpacity>(null)
    const [active, setActive] = useState(false)
    const anim = useSharedValue(0)
    const lastTap = useRef<any>(0)
    const dispatch = useDispatch()
    const wishList = useSelector((state: RootState)=> state?.wishList?.products)
    const currency = useSelector((state: RootState)=> state?.user?.currency)

    const [imageSpecs, setImageSpecs] = useState({ x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 })
    const [cartSpecs, setCartSpecs] = useState({ x: 0, y: 0, width: 0, height: 0, pageX: 0, pageY: 0 })
    const {clicked, ...others} = props
    //console.log(cartSpecs, imageSpecs)
    const onLoadEnd = () => {
        setLoading(false)
        // imageRef.current?.measure?.((x, y, width, height, pageX, pageY) => {
        //     setImageSpecs({x,y,width,height,pageX,pageY})
        // })
    }
    const onClick = () => {
        
        dispatch(addProduct({product: {...others, quantity: 1}, price: props.price}))
        clicked()
        // cart.current?.measure?.((x,y,width,height,pageX,pageY) => {
        //     setCartSpecs({x,y,width,height,pageX,pageY})
        // })
        // anim.value = 0
        // anim.value = withTiming(1, {duration: 2000}, ()=> {console.log(anim.value)})
    }

    useEffect(() => {
        anim.value = 0
    }, [])

    const liked = useSharedValue(0)

    // const transparentViewStyle = useAnimatedStyle(() => {
    //     const top = interpolate(anim.value, [0, 1], [0, -cartSpecs?.pageY])
    //     const left = interpolate(anim.value, [0, 1], [0, cartSpecs?.pageX])

    //     return {
    //         top, left, position: 'absolute'
    //     }
    // })



    // const toggleLike = () => {
    //     setActive(!active)
    //     //liked.value = withSpring(liked.value ? 0 : 1)
    // }

    const handleDoubleTap = () => {
        const now = Date.now()
        const timeLimit = 500
        if (lastTap.current && now - lastTap.current < timeLimit) {
            liked.value = 0
            liked.value = withTiming(1, {
                duration: 500,
                easing: Easing.bezier(0.25, 0.1, 0.25, 1),
            })
            const found = wishList.find((i)=> {
                return i.name === props.name
            })
        if(found) {
            null
        } else {
            dispatch(addWishProduct({product: others}))
            Toast.show('Item has been added to the wishlist', {
                duration: Toast.durations.SHORT - 1000,
                position: Toast.positions.TOP + 20,
                animation: true,
                hideOnPress: true,
                delay: 0,
                opacity: 1,
                backgroundColor: '#000000',
                shadow: false
            })

        }
        } else {
            lastTap.current = now
        }
    }

    const transparentImageStyle = useAnimatedStyle(() => {
        const width = interpolate(anim.value, [0, 1], [imageSpecs?.width, 0])
        const height = interpolate(anim.value, [0, 1], [imageSpecs?.height, 0])

        return {
            width, height
        }
    })

    const likeAnimStyle = useAnimatedStyle(() => {
        const opacity = interpolate(liked.value, [0, 1], [1, 0])
        const scale = interpolate(liked.value, [0, 1], [0, 6])

        return {
            opacity, transform: [{ scale }]
        }
    })
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1, paddingRight: 16, paddingLeft: 8, width: size }}>
                <TouchableWithoutFeedback onPress={handleDoubleTap} >
                    {/* <View style={[{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 5, backgroundColor: 'black', }, likeAnimStyle]}>
                <AntDesign name="heart" size={24} color="red" />
                </View> */}
                <View style={{ borderRadius: 16, flex: 2, backgroundColor: props.backgroundColor, justifyContent: 'flex-end', marginTop: 90 }}>
                    <Animated.View pointerEvents='none' style={[likeAnimStyle, { transform: [{ scale: active ? 3 : 1 }], position: 'absolute', alignItems: 'center', alignSelf: 'center', top: 0, justifyContent: 'center', left: 0, bottom: 0, right: 0 }]}><AntDesign name='heart' size={24} color='red' /></Animated.View>
                    <View style={{ position: 'absolute', top: -150, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        {loading ? <View style={{ position: 'absolute', zIndex: 3 }}>
                            <ActivityIndicator color={'#000'} />
                        </View> : null}
                        <Image ref={imageRef} onLoadStart={() => { setLoading(true); }} onLoadEnd={() => onLoadEnd()} style={{ width: 300, height: 300, opacity: loading ? 0 : 1, transform: [{ rotate: '-25deg' }] }} source={props.img} />
                        {/* <Animated.View style={[{position: 'absolute'}, transparentViewStyle]}>
                    <Image style={[{transform: [{rotate: '-25deg'}], opacity: 0.5, width: 300, height: 300}, transparentImageStyle]} source={props.img} />
                    </Animated.View> */}
                    </View>
                    <View style={{ marginBottom: 40, paddingHorizontal: 32 }}>
                        <Text numberOfLines={2} style={{ fontSize: 32 }}>{props.name}</Text>
                        <Text style={{ marginTop: 16, fontWeight: '300' }}>{props.category}</Text>
                        <Text style={{ marginTop: 24, fontSize: 32, fontWeight: '700' }}>{currency.symbol}{props.price}</Text>
                    </View>
                    <View style={{ position: 'absolute', bottom: -20, width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => onClick()} ref={cart} style={{ backgroundColor: 'black', borderRadius: 50, padding: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <AntDesign name="shoppingcart" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                    </View>
                </TouchableWithoutFeedback>
                <View style={{ flex: 1, justifyContent: 'flex-end', marginBottom: 10, marginTop: 10 }}>
                    <Text numberOfLines={7} style={{ fontSize: 16, color: '#00000050', fontWeight: '600' }}>{props.description}</Text>
                </View>
            </View>
        </View>
    )
}

const Home = (props: any) => {
    const dispatch = useDispatch()
    const quantity = useSelector((state: RootState) => state?.cart?.quantity)


    const drawerProgress = useDrawerProgress()
    const [brand, setBrand] = useState<string>('Nike')
    const open = useDrawerStatus() === 'open'
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
    const slideRef = useRef(null)

    const { width } = useWindowDimensions()
    const size = width * 0.8
    const newData = [
        { key: 'spacer-left' },
        ...slides[brand],
        { key: 'spacer-right' }
    ]
    const anim = useSharedValue(0)
    const ViewAnimStyle = useAnimatedStyle<any>(() => {
        const scale = interpolate(anim.value, [0, 1], [1, 1.4])

        return {
            transform: [{scale}]
        }
    })

    const clicked = () => {
        anim.value = withRepeat(withTiming(1), 2, true)
    }
    return (
        <Animated.View style={[{ flex: 1, }, viewStyles]}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
                        <AntDesign name={open ? "menufold" : "menuunfold"} size={24} color="black" />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate('Cart')}>
                        <Animated.View style={[ViewAnimStyle]}>
                        <AntDesign name="shoppingcart" size={30} color="black" />
                        <View style={{position: 'absolute', top: 0, right: 0, width: 15, height: 15, borderRadius: 15, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{color: 'white', textAlign: 'center'}}>{quantity}</Text>
                        </View>
                        </Animated.View>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 36, marginHorizontal: 36 }}>
                    <View style={{ marginBottom: 36 }}>
                        <Text style={{ fontSize: 32, fontWeight: '600' }}>Top {brand}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => setBrand('Nike')}>
                            <Text style={{ fontWeight: brand == 'Nike' ? '500' : '300', fontSize: 16 }}>Nike</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setBrand('Adidas')}>
                            <Text style={{ fontWeight: brand == 'Adidas' ? '500' : '300', fontSize: 16 }}>Adidas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setBrand('Converse')}>
                            <Text style={{ fontWeight: brand == 'Converse' ? '500' : '300', fontSize: 16 }}>Converse</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setBrand('Vans')}>
                            <Text style={{ fontWeight: brand == 'Vans' ? '500' : '300', fontSize: 16 }}>Vans</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ flex: 1 }}>
                    {/* {loading ? <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                            <ActivityIndicator color={'#000'} />
                        </View>
                        : null} */}
                    <FlatList
                        style={{ flex: 1, }}
                        horizontal
                        pagingEnabled
                        snapToAlignment='start'
                        snapToInterval={size}
                        decelerationRate={'fast'}
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        scrollEventThrottle={16}
                        ref={slideRef}
                        data={newData}
                        // ItemSeparatorComponent={()=> {
                        //     return (
                        //         <View style={{width: 16}}></View>
                        //     )
                        // }}
                        renderItem={({ item, index }) => {
                            if (!item.name) {
                                return <View style={{ width: (width - size) / 2 }} />
                            }
                            return (
                                <Slide clicked={clicked} {...item} index={index} />
                            )
                        }}
                    />
                </View>
            </SafeAreaView>
        </Animated.View>
    )
}

export default Home