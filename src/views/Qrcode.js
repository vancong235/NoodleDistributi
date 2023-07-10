import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';

const Qrcode = () => {
  const navigation = useNavigation();
  const onSuccess = (e) => {
    alert(e.data);
    if (e.data == "Hello World") {
      navigation.navigate('Information');
    } else {
      navigation.navigate('Error');
    }
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