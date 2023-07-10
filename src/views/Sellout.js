import { StyleSheet, Text, View, ImageBackground, StatusBar, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native';

const Sellout = () => {
    const navigation = useNavigation(); // Lấy navigation prop
    const handlePress = () => {
      console.log('The button was pressed');
      navigation.navigate('Error'); // Chuyển hướng đến màn hình Error
    }
    return (
        <ImageBackground 
        source={require('../../assets/outof/bg.png')}
        style={{flex: 1, resizeMode: 'cover', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column'}}
        >
            <Image
                source={require('../../assets/outof/logo.png')}
                style={{ position: 'absolute', top: '7%', height: '10%', resizeMode: "contain" }}
            />
            <Image
                source={require('../../assets/outof/outof.png')}
                style={{ position: 'absolute', top: '20%', width:'80%', height: '10%', resizeMode: "contain" }}
            />
            <Image
                source={require('../../assets/outof/there.png')}
                style={{ position: 'absolute', top: '23%', width:'75%', height: '20%', resizeMode: "contain" }}
            />
            <Image
                source={require('../../assets/outof/hide.png')}
                style={{ position: 'absolute', top: '39%', width:'70%', height: '20%', resizeMode: "contain" }}
            />
        </ImageBackground>
    )
}

export default Sellout