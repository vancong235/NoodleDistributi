import { StyleSheet, Text, View, ImageBackground, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserData, setImage, initValue } from './features/user/userSlice'

const Done = () => {
    const navigation = useNavigation(); // Lấy navigation prop
    const [canScan, setCanScan] = useState(true);
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const status = useSelector(state => state.user.status);
    const userData = useSelector(state => state.user.userData);
    
    const handlePress = async () => {
        await dispatch(fetchUserData(userData.ID));
        navigation.navigate('Information');
    }
    return (
        <ImageBackground 
        source={require('../../assets/done/bg.png')}
        style={{flex: 1, resizeMode: 'cover', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column'}}
        >
            <Image
                source={require('../../assets/done/logo.png')}
                style={{ position: 'absolute', top: '7%', height: '10%', resizeMode: "contain" }}
            />
            <Image
                source={require('../../assets/done/done.png')}
                style={{ position: 'absolute', top: '20%', width:'35%', height: '10%', resizeMode: "contain" }}
            />
            <Image
                source={require('../../assets/done/like.png')}
                style={{ position: 'absolute', top: '30%', width:'75%', height: '30%', resizeMode: "contain" }}
            />
                        <Image
                source={require('../../assets/done/enjoy.png')}
                style={{ position: 'absolute', top: '53%', width:'70%', height: '18%', resizeMode: "contain" }}
            />
            <TouchableOpacity onPress={handlePress} style={{  position: 'absolute', top: '68%', width:'70%', height: '20%', resizeMode: "contain",justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
                <Image
                    source={require('../../assets/done/back.png')}
                    style={{ width:'100%', height: '100%', resizeMode: "contain" }}
                />
            </TouchableOpacity>
            <Image
                source={require('../../assets/done/get.png')}
                style={{ position: 'absolute', top: '82%', width:'35%', height: '20%', resizeMode: "contain" }}
            />
        </ImageBackground>
    )
}

export default Done

const styles = StyleSheet.create({})