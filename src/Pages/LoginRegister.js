import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, SafeAreaView, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { globalStyle } from '../../styles/globalStyles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { AuthContext } from '../components/Context';
import Loader from '../components/Loader';


function LoginRegister({ navigation }) {

    // AuthContex for SignIn
    const { signIn } = React.useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isRegistered, setisRegistered] = useState(true);
    const [userNumber, setuserNumber] = useState('');
    const [password, setpassword] = useState('');
    const [secureText, setsecureText] = useState(true);
    const [secureIcon, setSecureIcon] = useState('eye')

    const handlePassVisibility = () => {
        if (secureIcon == 'eye') {
            setsecureText(!secureText)
            setSecureIcon("eye-off")
        } else if (secureIcon == 'eye-off') {
            setsecureText(!secureText)
            setSecureIcon("eye")
        }
    }

    const handleRegister = (Number) => {
        if (Number == null || Number == '') {
            Alert.alert("Error", "Please Enter Number");
            return;
        }
        setIsLoading(true)
        var random = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        console.log(random);
        // var Data = "Your Butler's Account OTP is " + random + ". Please don't share it with anyone."
        var url = "https://dreamy-chatelet.173-214-170-234.plesk.page/api/SmsApi/SendSms?message=" + random  + "&number=" + userNumber
        console.log(url);
        fetch(url)
            .then((response) => {
                if (response.status == 200) {
                    console.log("New Random", random)
                    setIsLoading(false)
                    navigation.navigate('VerifyNumber', { number: Number, random: random })
                }
            })
            .catch((error) => {
                setIsLoading(false)
                console.error(error);
            });
    }
    const handleLogin = async (Number, password) => {
        if (Number == null || Number == '') {
            Alert.alert("error", "Please Enter Number");
            return;
        }
        if (password == null || password == '') {
            Alert.alert("error", "Please Enter Password");
            return;
        }

        setIsLoading(true);
        await fetch('https://dreamy-chatelet.173-214-170-234.plesk.page/api/AccountApi/Login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'UserName': Number,
                'Password': password
            })
        }).then(res => res.json())
            .then(resData => {
                setIsLoading(false);
                if (resData.Success) {
                    signIn(resData)
                } else {
                    Alert.alert("error", "Invalid Login Attempt");
                }
            })
    }

    if (isLoading) {
        return (<Loader />)
    }

    return (
        <ScrollView style={{backgroundColor:'#fff'}}> 
            <View style={globalStyle.screenContainer}>
                <View style={globalStyle.LoginTopDiv}>
                </View>
                {isRegistered ?
                    <>
                        <View>
                            <Text style={globalStyle.LoginTitle}>Welcome Back,</Text>
                            <Text style={globalStyle.LoginTitle}>Login Now.</Text>
                        </View>
                        <View style={globalStyle.LoginOptionsRow}>
                            <TouchableOpacity>
                                <Text style={globalStyle.LoginOptionsTitle}>Already a customer</Text>
                            </TouchableOpacity>
                            <Text style={globalStyle.LoginOptionsTitle}> / </Text>
                            <TouchableOpacity
                                onPress={() => { setisRegistered(false) }}
                            >
                                <Text style={[globalStyle.LoginOptionsTitle, { color: "#A199AC" }]}>New customer</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={globalStyle.InputContainer}>
                            <FeatherIcon name="phone" size={20} color='#A199AC' style={globalStyle.InputIcon}></FeatherIcon>
                            <TextInput
                                style={[globalStyle.w100, { color: '#000' }]}
                                placeholder='+ 92 XXX XXXXXXX'
                                placeholderTextColor='#A199AC'
                                keyboardType="number-pad"
                                maxLength={11}
                                value={userNumber}
                                onChangeText={(userNumber) => setuserNumber(userNumber)}
                            ></TextInput>
                        </View>
                        <View style={globalStyle.InputContainer}>
                            <FeatherIcon name="lock" size={20} color="#A199AC" style={globalStyle.InputIcon}></FeatherIcon>
                            <TextInput
                                style={[globalStyle.w100, { color: '#000' }]}
                                placeholder='**********'
                                keyboardType='default'
                                placeholderTextColor='#A199AC'
                                secureTextEntry={secureText}
                                value={password}
                                onChangeText={(password) => setpassword(password)}
                            ></TextInput>
                            <TouchableOpacity style={{ position: 'absolute', right: 10 }}
                                onPress={handlePassVisibility}
                            >
                                <FeatherIcon name={secureIcon} size={20} color='#A199AC'></FeatherIcon>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={globalStyle.Theambtn}
                            onPress={() => { handleLogin(userNumber, password) }}
                        >
                            <Text style={globalStyle.TheambtnText}>Login</Text>
                        </TouchableOpacity>
                        <View style={globalStyle.ForgotPassRow}>
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('ForgetPassword', { number: userNumber }) }}
                            >
                                <Text style={[globalStyle.TheamTextColor, { fontWeight: '600', fontSize: 16  }]}>Forgot Password??</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    :
                    <>
                        <View>
                            <Text style={globalStyle.LoginTitle}>Hey,</Text>
                            <Text style={globalStyle.LoginTitle}>Get Registered.</Text>
                        </View>
                        <View style={globalStyle.LoginOptionsRow}>
                            <TouchableOpacity
                                onPress={() => { setisRegistered(true) }}
                            >
                                <Text style={[globalStyle.LoginOptionsTitle, { color: "#A199AC" }]}>Already a customer</Text>
                            </TouchableOpacity>
                            <Text style={globalStyle.LoginOptionsTitle}> / </Text>
                            <TouchableOpacity
                                onPress={() => { setisRegistered(false) }}
                            >
                                <Text style={globalStyle.LoginOptionsTitle}>New customer</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={globalStyle.InputContainer}>
                            <FeatherIcon name="phone" size={20} color='#A199AC' style={globalStyle.InputIcon}></FeatherIcon>
                            <TextInput
                                style={globalStyle.w100}
                                placeholder='+ 92 XXX XXXXXXX'
                                placeholderTextColor='#A199AC'
                                keyboardType="number-pad"
                                maxLength={11}
                                value={userNumber}
                                onChangeText={(userNumber) => setuserNumber(userNumber)}
                            ></TextInput>
                        </View>
                        <TouchableOpacity style={globalStyle.Theambtn}
                            onPress={() => handleRegister(userNumber)}
                        >
                            <Text style={globalStyle.TheambtnText}
                            >Next</Text>
                        </TouchableOpacity>
                    </>
                }
            </View>
        </ScrollView>
    );
}

export default LoginRegister;