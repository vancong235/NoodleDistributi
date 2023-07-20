
import { Text, TouchableOpacity, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchUserData, setImage, initValue } from './features/user/userSlice'
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { BackHandler } from 'react-native';

const getInformation = async () => {
  const querySnapshot = await firestore().collection('Information').get();
  const ids = querySnapshot.docs.map((doc) => doc.id);
  return ids;
};



async function checkExist(uid) {
  try {
    const ids = await getInformation();
    return ids.includes(uid) ? true : false;
  } catch (error) {
    console.error(error);
    return false;
  }
}

const getData = async (uid) => {
  const user = await firestore().collection('Information').doc(uid).get();
  return user;
}

const getImageUrl = async (imageName) => {
  try {
    const reference = storage().ref(imageName);
    const url = await reference.getDownloadURL();
    return url;
  } catch (error) {
    console.log('Error getting image URL: ', error);
    return null;
  }
}

const Qrcode = () => {
  const [canScan, setCanScan] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const status = useSelector(state => state.user.status);
  const userData = useSelector(state => state.user.userData);
  useEffect(() => {
    //call function to await
    async function fetchData() {
      if (status === 'succeeded') {
        if (userData && userData.Image) {
          const imageUrl = await getImageUrl('1.jpg');
          dispatch(setImage(imageUrl.toString()));
        } else {
          dispatch(setImage('https://cdn.pixabay.com/photo/2016/07/08/13/37/texture-1504364_640.jpg'));
        }
        // Sử dụng imageUrl trong các câu lệnh tiếp theo ở đây
        navigation.navigate('Information');
      } else if (status === 'failed') {
        navigation.navigate('Error');
      }
    }
    fetchData();
  }, [status, userData, navigation]);

  const onSuccess = async (e) => {
    setCanScan(false);
    if (!canScan) return;
      // const uidExists = await checkExist(e.data);
      // const user = await getData(e.data.toString());
      await dispatch(fetchUserData(e.data));
    setTimeout(() => {
      setCanScan(true);
    }, 2000);
  };
  return (
    <QRCodeScanner
      onRead={onSuccess}
      flashMode={RNCamera.Constants.FlashMode.off}
      showMarker={true} // hiển thị ô vuông giữa màn hình
      reactivate={true}
      markerStyle={{ borderColor: '#FFF', borderRadius: 10 }}
      topContent={
        <Text style={{ fontSize: 18, color: '#FFF' }}>
          Quét mã QR để tiếp trục
        </Text>
      }
      bottomContent={
        <TouchableOpacity style={{ padding: 16 }}>
          <Text style={{ fontSize: 16, color: '#FFF' }}>Hủy</Text>
        </TouchableOpacity>
      }
      cameraStyle={{ height: '100%' }} // thiết lập chiều cao của camera để đạt hiệu ứng full màn hình
    />
  );
};

export default Qrcode;