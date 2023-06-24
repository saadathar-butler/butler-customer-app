import React,{useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { globalStyle } from '../../styles/globalStyles';
import OTPInputView from '@twotalltotems/react-native-otp-input'

function VerifyNumber({route, navigation}) {
    const [random, setRandom] = useState(route.params.random);
    const [newRandom, setNewRandom] = useState(null);
    const [counter, setCounter] = useState(60);

    const VerifyNumber = (val) => {
        if (val == random || val == newRandom) {
            navigation.navigate('SignUp', { Number: route.params.number })
        } else {
            val = null
            Alert.alert("error", "Invalid OTP");
            return;
        }
    }

    useEffect(() => {
        const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
        return () => clearInterval(timer);
    }, [counter]);
    
    console.log('second', counter);


    const ResendCode = () =>{
        setCounter(60)
        var Number = route.params.number;
        console.log("NUmber",Number)
        var random = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        console.log(random);
        // var Data = "Your Butler's Account OTP is " + random + ". Please don't share it with anyone."
        var url = "https://dreamy-chatelet.173-214-170-234.plesk.page/api/SmsApi/SendSms?message=" + random  + "&number=" + Number
        console.log(url);
        fetch(url)
            .then((response) => {
                if (response.status == 200) {
                    console.log("New Random", random)
                    setNewRandom(random);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

   return (
        <View style={globalStyle.screenContainer}>
            <View style={globalStyle.LoginTopDiv}></View>
            <View>
                <Text style={globalStyle.LoginTitle}>Verify your</Text>
                <Text style={globalStyle.LoginTitle}>number, please.</Text>
                <Text style={globalStyle.codeDescp}>We've sent code to {route.params.number}</Text>
            </View>
            <View style={globalStyle.otpInputRow}>
                <OTPInputView
                    style={globalStyle.OTPInputView}
                    pinCount={4}
                    autoFocusOnLoad={false}
                    codeInputFieldStyle={globalStyle.OTPCellView}
                    codeInputHighlightStyle={globalStyle.OTPCellHighlightedView}
                    onCodeFilled={(code => {
                        VerifyNumber(code)
                    })}
                />
            </View>
            <TouchableOpacity style={globalStyle.Theambtn}
            onPress={VerifyNumber}
            >
                <Text style={globalStyle.TheambtnText}>Done</Text>
            </TouchableOpacity>
            {
                counter > 0 ?
                    <Text style={globalStyle.resendcodeinfo}>Resend Code in {counter} Seconds</Text>
                    :
                    <TouchableOpacity
                        style={{ alignItems: 'center', marginVertical: 10 }}
                        onPress={() => ResendCode()}
                    >
                        <Text style={globalStyle.TheamTextbtn}>Resend Code</Text>
                    </TouchableOpacity>
            }
            {/* <TouchableOpacity 
            style={{alignItems:'center',marginVertical:10}}
             onPress={()=>ResendCode()}
            >
                <Text style={globalStyle.TheamTextbtn}>Resend Code</Text>
            </TouchableOpacity> */}
        </View>
    );
}

export default VerifyNumber;
