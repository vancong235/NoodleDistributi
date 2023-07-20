import { StyleSheet, Text, View, ImageBackground, StatusBar, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux'
import { changeCups1, changeCups2, changeCups3 } from './features/machine/machineSlice'
import firestore from '@react-native-firebase/firestore';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { fetchUserData, setImage, initValue, updateCups } from './features/user/userSlice'



const Information = () => {
    const dispatch = useDispatch()
    const imageUrl = useSelector((state) => state.user.Image && state.user.Image.toString());
    const userData = useSelector(state => state.user.userData);
    const machine1 = useSelector(state => state.machine.c1);
    const machine2 = useSelector(state => state.machine.c2);
    const machine3 = useSelector(state => state.machine.c3);
    const navigation = useNavigation(); // Lấy navigation prop
    const updateData = async (userData, sum) => {
      firestore()
        .collection("Information")
        .doc(userData.ID)
        .update({
          Cups: userData.Cups+sum,
        })
        .then(() => {
          console.log('User updated!');
        });
    };
    const handlePress = async () => {
      let sum = 0;
      if (isType1Selected && machine1 == 0) {
        dispatch(changeCups1());
        sum += 1;
      }
      if (isType2Selected && machine2 == 0) {
        dispatch(changeCups2());
        sum += 1;
      }
      if (isType3Selected && machine3 == 0) {
        dispatch(changeCups3());
        sum += 1;
      }
      console.log(sum);
      if (machine1 == 1 && machine2 == 1 && machine3 == 1 && sum == 0) {
        navigation.navigate('Sellout'); // Chuyển hướng đến màn hình Error
      } else {
        updateData(userData, sum);
        setTimeout(() => {
          navigation.navigate('Done');
        }, 100);
      }
    }
    const [isType1Selected, setIsType1Selected] = useState(false);
    const [isType2Selected, setIsType2Selected] = useState(false);
    const [isType3Selected, setIsType3Selected] = useState(false);

    const [selectedImages, setSelectedImages] = useState([]);
    const handleImageClick = (imageType) => {
      switch (imageType) {
        case 'type1':
          setIsType1Selected(!isType1Selected);
          break;
        case 'type2':
          setIsType2Selected(!isType2Selected);
          break;
        case 'type3':
          setIsType3Selected(!isType3Selected);
          break;
        default:
          break;
      }
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
                style={{ position: 'absolute', top: '20%', width:'62%', height: '10%', resizeMode: "contain" }}
            />
          <View style={{ position: 'absolute', top: '-15%', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
            <Image source={require('../../assets/information/container.png')} style={{ position: 'absolute', top: '40%', width: '80%', height: '20%', resizeMode: 'contain' }}/>
            <Image source={{uri : imageUrl }} style={{ position: 'absolute', top: '44.9%', right: '64%', width: 79, height: 79, resizeMode: 'contain', borderRadius: 500 }} />
            <View style={{ position: 'absolute', top: '44.2%', width: '50%', height: '12%', right: '9%', resizeMode: 'contain', flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#880B0B', fontWeight: '800', fontSize: 14, textAlign: 'left', marginTop: '2%' }}>Full Name:</Text>
                <Text style={{ color: '#880B0B', fontWeight: '800',fontSize: 14, textAlign: 'left', marginTop: '2%' }}>Birthday:</Text>
                <Text style={{ color: '#880B0B',fontWeight: '800', fontSize: 14, textAlign: 'left', marginTop: '2%' }}>Gender:</Text>
                <Text style={{ color: '#880B0B', fontWeight: '800',fontSize: 14, textAlign: 'left', marginTop: '2%' }}>Department:</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#880B0B', fontSize: 14, textAlign: 'left', marginTop: '2%' }}>
                  {userData.FullName.length > 8 ? `${userData.FullName.substring(0, 8)}...` : userData.FullName}
                </Text>
                <Text style={{ color: '#880B0B', fontSize: 14, textAlign: 'left', marginTop: '2%' }}>
                  {new Date(userData.Birthday.seconds * 1000).toLocaleDateString('en-GB')}
                </Text>
                <Text style={{ color: '#880B0B', fontSize: 14, textAlign: 'left', marginTop: '2%' }}>{userData.Gender}</Text>
                <Text style={{ color: '#880B0B', fontSize: 14, textAlign: 'left', marginTop: '2%' }}>
                  {userData.Department.length > 8 ? `${userData.Department.substring(0, 8)}...` : userData.Department}
                </Text>
              </View>
            </View>
          </View>

          <View style={{position: 'absolute', top: '40%', width:'80%', height: '35%', flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => machine1 === 0 && handleImageClick('type1')} style={{ flex: 1, margin: 5, resizeMode: "contain" }}>
    {machine1 === 0 
      ? (
        <React.Fragment>
          <Image
            source={require('../../assets/information/noodlesType/type1.png')}
            style={{ width:"100%", height:"80%", resizeMode: "contain"}}
          />
          {selectedImages.includes('type1') && <Image source={require('../../assets/information/pick.png')} style={{ zIndex: -1, top: '-90%', width:'100%', height: '100%', resizeMode: "contain" }}/>}
        </React.Fragment>
      )
      : (
        <React.Fragment>
          <Image
            source={require('../../assets/information/noodlesType/type4.png')}
            style={{ width:"100%", height:"80%", resizeMode: "contain"}}
          />
            <Image
            source={require('../../assets/information/unavailable.png')}
            style={{ width:"100%", height:"80%", position: 'absolute', top: '28%', resizeMode: "contain"}}
          />
        </React.Fragment>
      )
    }
  </TouchableOpacity>

  <TouchableOpacity onPress={() => machine2 === 0 && handleImageClick('type2')} style={{ flex: 1, margin: 5, resizeMode: "contain" }}>
    {machine2 === 0 
      ? (
        <React.Fragment>
          <Image
            source={require('../../assets/information/noodlesType/type2.png')}
            style={{ width:"100%", height:"80%", resizeMode: "contain"}}
          />
          {selectedImages.includes('type2') && <Image source={require('../../assets/information/pick.png')} style={{ zIndex: -1, top: '-90%', width:'100%', height: '100%', resizeMode: "contain" }}/>}
        </React.Fragment>
      )
      :  (
        <React.Fragment>
          <Image
            source={require('../../assets/information/noodlesType/type4.png')}
            style={{ width:"100%", height:"80%", resizeMode: "contain"}}
          />
            <Image
            source={require('../../assets/information/unavailable.png')}
            style={{ width:"100%", height:"80%", position: 'absolute', top: '28%', resizeMode: "contain"}}
          />
        </React.Fragment>
      )
    }
  </TouchableOpacity>

  <TouchableOpacity onPress={() => machine3 === 0 && handleImageClick('type3')} style={{ flex: 1, margin: 5, resizeMode: "contain" }}>
    {machine3 === 0 
      ? (
        <React.Fragment>
          <Image
            source={require('../../assets/information/noodlesType/type3.png')}
            style={{ width:"100%", height:"80%", resizeMode: "contain"}}
          />
          {selectedImages.includes('type3') && <Image source={require('../../assets/information/pick.png')} style={{ zIndex: -1, top: '-90%', width:'100%', height: '100%', resizeMode: "contain" }}/>}
        </React.Fragment>
      )
      :  (
        <React.Fragment>
          <Image
            source={require('../../assets/information/noodlesType/type4.png')}
            style={{ width:"100%", height:"80%", resizeMode: "contain"}}
          />
            <Image
            source={require('../../assets/information/unavailable.png')}
            style={{ width:"100%", height:"80%", position: 'absolute', top: '28%', resizeMode: "contain"}}
          />
        </React.Fragment>
      )
    }
  </TouchableOpacity>
  </View>
        <Text style={{ color: '#D91313', fontSize: 16, fontWeight:'bold', textAlign:'center', fontFamily: 'Roboto-Bold', position: 'absolute', top: '67%', width:'60%', height: '20%'}}>
          {userData.Cups}
            <Text style={{ color: '#9C6666', fontSize: 14 }}> cups of noodles left this month
          </Text>
        </Text>
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