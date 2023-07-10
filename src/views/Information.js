import { StyleSheet, Text, View, ImageBackground, StatusBar, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
  
const Information = () => {
    const navigation = useNavigation(); // Lấy navigation prop
    const handlePress = () => {
      console.log('The button was pressed');
      navigation.navigate('Done'); // Chuyển hướng đến màn hình Error
    }
    const [selectedImages, setSelectedImages] = useState([]);

    const handleImageClick = (imageType) => {
      console.log(`Đã click vào hình ảnh ${imageType}`);
      if (selectedImages.includes(imageType)) {
        setSelectedImages(selectedImages.filter((item) => item !== imageType));
      } else {
        setSelectedImages([...selectedImages, imageType]);
      }
    };
    return (
        <ImageBackground 
        source={require('../../assets/information/bg.png')}
        style={{flex: 1, resizeMode: 'cover', justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column'}}
        >
            <Image
                source={require('../../assets/information/logo.png')}
                style={{ position: 'absolute', top: '7%', height: '10%', resizeMode: "contain" }}
            />
            <Image
                source={require('../../assets/information/info.png')}
                style={{ position: 'absolute', top: '20%', width:'50%', height: '10%', resizeMode: "contain" }}
            />
          <View style={{ position: 'absolute', top: '-15%', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
            <Image source={require('../../assets/information/container.png')} style={{ position: 'absolute', top: '40%', width: '80%', height: '20%', resizeMode: 'contain' }}/>
            <Image source={{uri : "https://cdn.pixabay.com/photo/2023/05/15/09/18/iceberg-7994536_1280.jpg" }} style={{ position: 'absolute', top: '44.9%', right: '64%', width: 79, height: 79, resizeMode: 'contain', borderRadius: 500 }} />
            <View style={{ position: 'absolute', top: '44.2%', width: '50%', height: '12%', right: '9%', resizeMode: 'contain', flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#880B0B', fontWeight: '800', fontSize: 14, textAlign: 'left', marginTop: '2%' }}>Full Name:</Text>
                <Text style={{ color: '#880B0B', fontWeight: '800',fontSize: 14, textAlign: 'left', marginTop: '2%' }}>Birthday:</Text>
                <Text style={{ color: '#880B0B',fontWeight: '800', fontSize: 14, textAlign: 'left', marginTop: '2%' }}>Gender:</Text>
                <Text style={{ color: '#880B0B', fontWeight: '800',fontSize: 14, textAlign: 'left', marginTop: '2%' }}>Department:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#880B0B', fontSize: 14, textAlign: 'left', marginTop: '2%' }}>Alice Mie</Text>
                <Text style={{ color: '#880B0B', fontSize: 14, textAlign: 'left', marginTop: '2%' }}>12/10/1999</Text>
                <Text style={{ color: '#880B0B', fontSize: 14, textAlign: 'left', marginTop: '2%' }}>Female</Text>
                <Text style={{ color: '#880B0B', fontSize: 14, textAlign: 'left', marginTop: '2%' }}>Design</Text>
              </View>
            </View>
          </View>

            <View style={{position: 'absolute', top: '40%', width:'80%', height: '35%', flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => handleImageClick('type1')} style={{ flex: 1, margin: 5, resizeMode: "contain"  }}>
                <Image source={require('../../assets/information/noodlesType/type1.png')} style={{ width:"100%", height:"80%", resizeMode: "contain"}}/>
                {selectedImages.includes('type1') && <Image source={require('../../assets/information/pick.png')} style={{ zIndex: -1, top: '-90%', width:'100%', height: '100%', resizeMode: "contain" }}/>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleImageClick('type2')} style={{ flex: 1, margin: 5, resizeMode: "contain"  }}>
                <Image source={require('../../assets/information/noodlesType/type2.png')} style={{ width:"100%", height:"80%", resizeMode: "contain"}}/>
                {selectedImages.includes('type2') && <Image source={require('../../assets/information/pick.png')} style={{ zIndex: -1, top: '-90%', width:'100%', height: '100%', resizeMode: "contain" }}/>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleImageClick('type3')} style={{ flex: 1, margin: 5, resizeMode: "contain"  }}>
                <Image source={require('../../assets/information/noodlesType/type3.png')} style={{ width:"100%", height:"80%", resizeMode: "contain"}}/>
                {selectedImages.includes('type3') && <Image source={require('../../assets/information/pick.png')} style={{ zIndex: -1, top: '-90%', width:'100%', height: '100%', resizeMode: "contain" }}/>}
              </TouchableOpacity>
            </View>
            <Image
                source={require('../../assets/information/cupQuantity/3cups.png')}
                style={{ position: 'absolute', top: '59%', width:'50%', height: '20%', resizeMode: "contain" }}
            />
            <TouchableOpacity onPress={handlePress} style={{  position: 'absolute', top: '68%', width:'70%', height: '20%', resizeMode: "contain",justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'column' }}>
                <Image
                    source={require('../../assets/information/get.png')}
                    style={{ width:'100%', height: '100%', resizeMode: "contain" }}
                />
            </TouchableOpacity>
        </ImageBackground>
    )
}

export default Information

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      flex: 1,
      width: undefined,
      height: undefined,
    },
  });