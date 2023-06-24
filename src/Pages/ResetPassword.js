import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Image, Alert, ScrollView } from 'react-native';
import { globalStyle } from '../../styles/globalStyles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { AuthContext } from '../components/Context';
import Loader from '../components/Loader';
function ResetPassword({ navigation, route }) {

    const [userNumber, setUserNumber] = useState(route.params.number);
    const [password, setPassword] = useState('');
    const [confrmPassword, setConfrmPassword] = useState('');
    const [secureText, setsecureText] = useState(true);
    const [securePassText, setsecurePassText] = useState(true);
    const [secureIcon, setSecureIcon] = useState('eye')
    const [securePassIcon, setSecurePassIcon] = useState('eye');
    const [number, setNumber] = React.useState(route.params.number);
    const { signIn } = React.useContext(AuthContext);
    const [IsLoading, setIsLoading] = useState(false);
    const changePassword = async () => {
        console.log(number);
        if (password == null || password == '') {
            Alert.alert("error", "Please Enter password");
            return;
        }
        if (confrmPassword == null || confrmPassword == '') {
            Alert.alert("error", "Please Enter confirm Password");
            return;
        }
        if (password != confrmPassword) {
            Alert.alert("error", "Confirm Password does not match.");
            return;
        }

        setIsLoading(true);
        await fetch('https://dreamy-chatelet.173-214-170-234.plesk.page/api/AccountApi/ChangePassword', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'Number': number,
                'Password': password
            })
        }).then(res => res.json())
            .then(resData => {
                setIsLoading(false);
                if (resData.Success) {
                    Alert.alert("successful", "Password Changed Successfully!");
                    signIn(resData)
                } else {
                    Alert.alert("error", "Invalid Login Attempt");
                }
                console.log(resData);
            })
        console.log("Inside post request");
    }
    const handlePassVisibility = () => {
        if (secureIcon == 'eye') {
            setsecureText(!secureText)
            setSecureIcon("eye-off")
        } else if (secureIcon == 'eye-off') {
            setsecureText(!secureText)
            setSecureIcon("eye")
        }
    }
    const handleConfirmPassVisibility = () => {
        if (securePassIcon == 'eye') {
            setsecurePassText(!securePassText)
            setSecurePassIcon("eye-off")
        } else if (securePassIcon == 'eye-off') {
            setsecurePassText(!securePassText)
            setSecurePassIcon("eye")
        }
    }
    if (IsLoading) {
        return (
            <Loader />
        );
    }
    return (
        <ScrollView style={{backgroundColor:'#fff'}}>
            <View style={globalStyle.screenContainer}>
                <View style={globalStyle.LoginTopDiv}>
                </View>
                <View style={globalStyle.mb16}>
                    <Text style={globalStyle.LoginTitle}>Hey,</Text>
                    <Text style={globalStyle.LoginTitle}>Forgot password?</Text>
                </View>
                <View style={globalStyle.InputContainer}>
                    <FeatherIcon name="lock" color="#A199AC" size={20} style={globalStyle.InputIcon}></FeatherIcon>
                    <TextInput
                        style={[globalStyle.w100, { color: '#000' }]}
                        placeholder='New Password'
                        placeholderTextColor='#A199AC'
                        keyboardType='default'

                        value={password}
                        secureTextEntry={secureText}
                        onChangeText={(password) => { setPassword(password) }}
                    ></TextInput>
                    <TouchableOpacity style={{ position: 'absolute', right: 10 }}
                        onPress={handlePassVisibility}
                    >
                        <FeatherIcon name={secureIcon} size={20} color='#A199AC'></FeatherIcon>
                    </TouchableOpacity>
                </View>
                <View style={globalStyle.InputContainer}>
                    <FeatherIcon name="lock" color="#A199AC" size={20} style={globalStyle.InputIcon}></FeatherIcon>
                    <TextInput
                        style={[globalStyle.w100, { color: '#000' }]}
                        placeholder='Confirm password'
                        placeholderTextColor='#A199AC'
                        keyboardType="default"
                        secureTextEntry={securePassText}

                        value={confrmPassword}
                        onChangeText={(confrmPassword) => { setConfrmPassword(confrmPassword) }}
                    ></TextInput>
                    <TouchableOpacity style={{ position: 'absolute', right: 10 }}
                        onPress={handleConfirmPassVisibility}
                    >
                        <FeatherIcon name={securePassIcon} size={20} color='#A199AC'></FeatherIcon>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={globalStyle.Theambtn}
                    onPress={() => changePassword()}
                >
                    <Text style={globalStyle.TheambtnText}>Done</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default ResetPassword;