import { StyleSheet, Text, View, ImageBackground, StatusBar, Image, TouchableOpacity,  Animated, Dimensions} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView, PanGestureHandler, State } from 'react-native-gesture-handler';
import React, { useState } from 'react';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const Error = () => {
    const navigation = useNavigation(); // Lấy navigation prop
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const onGestureEvent = event => {
      setPosition({
        x: event.nativeEvent.translationX,
        y: event.nativeEvent.translationY
      });
    };
    var processX = 0;
    var processY = 0;


    const onHandlerStateChange = event => {
      if (event.nativeEvent.oldState === 4) {
        setPosition({
          x: processX,
          y: processY,
        });
        navigation.navigate('Qrcode'); // Chuyển hướng đến màn hình Error
      }
    };
    return (
      <ImageBackground  source={require('../../assets/error/bg.png')} style={{flex: 1, resizeMode: 'cover'}}>
      <GestureHandlerRootView
        style={{flex: 1, resizeMode: 'cover', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column'}}
      >
            <Image
                source={require('../../assets/error/logo.png')}
                style={{ position: 'absolute', top: '7%', height: '10%', resizeMode: "contain" }}
            />
            <Image
                source={require('../../assets/error/error.png')}
                style={{ position: 'absolute', top: '20%', width:'50%', height: '10%', resizeMode: "contain" }}
            />
            <Image
                source={require('../../assets/error/cannot.png')}
                style={{ position: 'absolute', top: '20%', width:'70%', height: '25%', resizeMode: "contain" }}
            />
                        <Image
                source={require('../../assets/error/please.png')}
                style={{ position: 'absolute', top: '29%', width:'45%', height: '18%', resizeMode: "contain" }}
            />
            <Image
                source={require('../../assets/error/cry.png')}
                style={{ position: 'absolute', top: '43%', width:'75%', height: '18%', resizeMode: "contain" }}
            />
            <Image
                source={require('../../assets/error/qr.png')}
                style={{ position: 'absolute', top: '56%', width:'70%', height: '20%', resizeMode: "contain" }}
            />
            <PanGestureHandler 
              onHandlerStateChange={onHandlerStateChange}
              onGestureEvent={onGestureEvent}>
              <Animated.Image 
               source={require('../../assets/common/drag.png')}
                style={[
                  styles.image,
                  {
                    width: "28%", height: '33%', resizeMode: "contain",
                    transform: [
                      { translateX: position.x },
                      { translateY: position.y }
                    ]
                  }
                ]}
                onLoad={() => {
                  processX = position.x;
                  processY = position.y;
                }}
              />
          </PanGestureHandler>
            <View style={{ position: 'absolute', top: '80%', right: '9%', bottom: 0 }}>
            <Image
                source={require('../../assets/error/rect.png')}
                style={{width: windowWidth*0.15, height: windowHeight*0.07, resizeMode: "contain" }}
            />
            </View>
        </GestureHandlerRootView>
        </ImageBackground>
    )
}

export default Error

const styles = StyleSheet.create({})