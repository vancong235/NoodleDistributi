// eslint-disable-next-line
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Error from './Error'
import Information from './Information'
import Done from './Done'
import Sellout from './Sellout'
import Welcome from './Welcome'
import Qrcode from './Qrcode'
import store from './app/store'
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator();

const Home = () => {
  return (
    <Provider store={store}>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{
          headerShown: false // Ẩn tiêu đề
        }}>
          <Stack.Screen name="Welcome" component={Welcome}></Stack.Screen>
          <Stack.Screen name="Error" component={Error}></Stack.Screen>
          <Stack.Screen name="Information" component={Information}></Stack.Screen>
          <Stack.Screen name="Done" component={Done}></Stack.Screen>
          <Stack.Screen name="Sellout" component={Sellout}></Stack.Screen>
          <Stack.Screen name="Qrcode" component={Qrcode}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
export default Home