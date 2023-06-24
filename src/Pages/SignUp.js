import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { globalStyle } from '../../styles/globalStyles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { AuthContext } from '../components/Context';
import Loader from '../components/Loader';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';

function SignUp({ navigation, route }) {
    const { signUp } = React.useContext(AuthContext);

    const [userNumber, setUserNumber] = useState(route.params.Number);
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confrmPassword, setConfrmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [secureText, setsecureText] = useState(true);
    const [securePassText, setsecurePassText] = useState(true);
    const [secureIcon, setSecureIcon] = useState('eye')
    const [securePassIcon, setSecurePassIcon] = useState('eye');
    const [image, setImage] = React.useState(null);

    const uploadImage = async (image) => {

        await fetch('https://dreamy-chatelet.173-214-170-234.plesk.page/api/ImageApi/uploadImage', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'base64Image': image
            })
        }).then(res => res.json())
            .then(resData => {
                setIsLoading(false);
                if (resData.Success) {
                    console.log("Image Response", resData.ImageUrl);
                    setImage(resData.ImageUrl);
                } else {
                    Alert.alert("error", "Image is Not Upload");
                }
                console.log(resData);
            })
        console.log("Inside post request");
    }

    const handlePhoto = () => {
        console.log("Imasdad")
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            useFrontCamera: true,
        }).then(image => {
            console.log(image);
            ImgToBase64.getBase64String(image.path)
                .then(base64String => {
                    var req = "data:image/jpeg;base64," + base64String;
                    uploadImage(req);
                })
                .catch(err => doSomethingWith(err));
        });

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

    const handleSignUp = async (userNumber, userName, password, confrmPassword) => {
        if (userName == null || userName == '') {
            Alert.alert("Error", "Please Enter User Name.");
            return;
        }
        if (password == null || password == '') {
            Alert.alert("Error", "Please Enter Password.");
            return;
        }
        if (confrmPassword == null || confrmPassword == '') {
            Alert.alert("Error", "Please Enter Confirm Password.");
            return;
        }

        if (confrmPassword != password) {
            Alert.alert("Error", "Password and Confirm Password not matched!");
            return;
        }
        console.log("Images", image)
       
        setIsLoading(true);
        var bodyObject = {
            'Contact': userNumber,
            'Password': password,
            'ConfirmPassword': confrmPassword,
            'FullName': userName,
            'ProfileImageUrl': image
        };
        console.log(bodyObject);
        await fetch('https://dreamy-chatelet.173-214-170-234.plesk.page/api/AccountApi/RegisterCustomer', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(bodyObject)
        }).then(res => res.json())
            .then(resData => {
                console.log(resData);
                setIsLoading(false);
                if (resData.Success) {
                    signUp(resData)
                } else {
                    for (let error of resData.ValidationErrors) {
                        Alert.alert("error", error);
                    }
                }
                console.log(resData);
            })
    }
    if (isLoading) {
        return (<Loader />)
    }
    return (
        <ScrollView>
            <View style={globalStyle.screenContainer}>
                <View style={globalStyle.LoginTopDiv}>
                </View>
                <View>
                    <Text style={globalStyle.LoginTitle}>You,re</Text>
                    <Text style={globalStyle.LoginTitle}>almost there!.</Text>
                </View>
                <View style={[globalStyle.userProfileContainer, { marginTop: 20 }]}>
                    <View style={globalStyle.userProfile}>
                        {image !== null ?
                            <Image style={[globalStyle.imageFit, { borderRadius: 19 }]} source={{uri: image}}></Image>
                            :
                            <Image style={[globalStyle.imageFit, { borderRadius: 19 }]} source={require('../../assets/img_avatar.png')}></Image>
                        }

                        <TouchableOpacity style={globalStyle.editIcon} onPress={()=> handlePhoto()}>
                            <Image style={globalStyle.imageContain} source={require('../../assets/AddPhoto.png')} />
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={globalStyle.InputContainer}>
                    <FeatherIcon color='#A199AC' name="phone" size={20} style={globalStyle.InputIcon}></FeatherIcon>
                    <TextInput
                        style={[globalStyle.w100, { color: '#000' }]}
                        placeholder='+ 92 XXX XXXXXXX'
                        editable={false}
                        placeholderTextColor='#A199AC'
                        keyboardType="number-pad"
                        maxLength={11}
                        value={userNumber}
                        onChangeText={(userNumber) => { setUserNumber(userNumber) }}
                    ></TextInput>
                </View>
                <View style={globalStyle.InputContainer}>
                    <FeatherIcon name="user" color='#A199AC' size={20} style={globalStyle.InputIcon}></FeatherIcon>
                    <TextInput
                        style={[globalStyle.w100, { color: '#000' }]}
                        placeholder='Name'
                        keyboardType="default"
                        placeholderTextColor='#A199AC'
                        value={userName}
                        onChangeText={(userName) => { setUserName(userName) }}
                    ></TextInput>
                </View>
                <View style={globalStyle.InputContainer}>
                    <FeatherIcon name="lock" color="#A199AC" size={20} style={globalStyle.InputIcon}></FeatherIcon>
                    <TextInput
                        style={[globalStyle.w100, { color: '#000' }]}
                        placeholder='Password'
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
                <TouchableOpacity onPress={() => handleSignUp(userNumber, userName, password, confrmPassword)} style={globalStyle.Theambtn}>
                    <Text style={globalStyle.TheambtnText}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

export default SignUp;