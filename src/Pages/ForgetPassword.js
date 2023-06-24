import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, Image, Alert, ActivityIndicator } from 'react-native';
import { globalStyle } from '../../styles/globalStyles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import Modal from "react-native-modal";
import Loader from '../components/Loader';

function ForgetPassword({ navigation, route }) {

    const [isLoading, setisLoading] = useState(false)
    const [userNumber, setUserNumber] = useState(route.params.number);
    const [isModalVisible, setModalVisible] = useState(false);

    //show and hide modal function
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const validateRegister = () => {
        if (userNumber == null || userNumber == '') {
            Alert.alert("Error", "Please Enter Number");
            return;
        }
        toggleModal();
    }

    const handleRegister = () => {
        toggleModal()
        setisLoading(true)
        var random = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
        console.log(random);
        // var Data = "Your Butler's Account OTP is " + random + ". Please don't share it with anyone."
        var url = "https://dreamy-chatelet.173-214-170-234.plesk.page/api/SmsApi/SendSms?message=" + random + "&number=" + userNumber
        console.log(url);
        fetch(url)
            .then((response) => {
                if (response.status == 200) {
                    // toggleModal()
                    setisLoading(false)
                    // console.log("New Random", random)
                    navigation.navigate('ForgetPassOTP', { number: userNumber, random: random })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }
    if (isLoading) {
        return (<Loader />)
    }
    return (
        <View style={globalStyle.screenContainer}>
            <View style={globalStyle.LoginTopDiv}>
            </View>
            <View style={globalStyle.mb16}>
                <Text style={globalStyle.LoginTitle}>Hey,</Text>
                <Text style={globalStyle.LoginTitle}>Forgot password?</Text>
            </View>
            <View style={globalStyle.InputContainer}>
                <FeatherIcon name="phone" size={20} style={globalStyle.InputIcon}></FeatherIcon>
                <TextInput
                    style={[globalStyle.w100, { color: "#000" }]}
                    placeholder='+ 92 XXX XXXXXXX'
                    keyboardType="number-pad"
                    placeholderTextColor='#A199AC'
                    maxLength={11}
                    value={userNumber}
                    onChangeText={(userNumber) => { setUserNumber(userNumber) }}
                ></TextInput>
            </View>
            <TouchableOpacity style={globalStyle.Theambtn}
                onPress={() => validateRegister()}
            >
                <Text style={globalStyle.TheambtnText}>Reset</Text>
            </TouchableOpacity>

            {/* Modal View */}
            <Modal isVisible={isModalVisible}>
                <View style={globalStyle.modalViewContainer}>
                    <View style={globalStyle.ModalView}>
                        <View style={globalStyle.modalBody}>
                            <View style={globalStyle.ModalImageView}>
                                <Image style={globalStyle.imageContain} source={require('../../assets/ModalImages/OTPModalImage.png')} />
                            </View>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: '#000' }}>Sent code successfully!</Text>
                            <Text style={{ fontSize: 15, color: '#A199AC', textAlign: 'center', marginHorizontal: 25 }}>The code has been sent to your phone number.</Text>
                        </View>
                        <TouchableOpacity style={globalStyle.modalFooter}
                            onPress={() => handleRegister()}
                        >
                            <Text style={globalStyle.TheamTextbtn}>Enter code</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    );
}

export default ForgetPassword;