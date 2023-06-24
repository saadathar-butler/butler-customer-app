import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Intro1 from '../Pages/Intro1';
import Intro2 from '../Pages/Intro2';
import GetStarted from '../Pages/GetStarted';
import LoginRegister from '../Pages/LoginRegister';
import VerifyNumber from '../Pages/VerifyNumber';
import ForgetPassword from '../Pages/ForgetPassword';
import SignUp from '../Pages/SignUp';
import ForgetPasswordOTP from '../Pages/ForgetPassOTP';
import MainTabs from './MainTabs';
import ResetPassword from '../Pages/ResetPassword';


const Stack = createNativeStackNavigator();

function RootStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Intro1" component={Intro1} />
            <Stack.Screen name="Intro2" component={Intro2} />
            <Stack.Screen name="GetStarted" component={GetStarted} />
            <Stack.Screen name="LoginRegister" component={LoginRegister} />
            <Stack.Screen name="VerifyNumber" component={VerifyNumber} />
            <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgetPassOTP" component={ForgetPasswordOTP} />
            <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
    );
}

export default RootStack;