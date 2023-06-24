import React, { useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { globalStyle } from '../../styles/globalStyles';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { AuthContext } from '../components/Context';
import Loader from '../components/Loader';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from "react-native-modal";

function EditProfile({ navigation }) {

    const [isModalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [user, setUser] = useState({});
    const [userName, setUserName] = useState('');
    const [userNumber, setUserNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {

            await AsyncStorage.getItem('UserData').then(res => {
                var user = JSON.parse(res)
                setUserName(user.FullName);
                setUserNumber(user.Contact)
                setImage(user.ProfileImageUrl);
                setUser(JSON.parse(res));
            });

        });
        return unsubscribe;
    }, [user]);

    console.log("User", user);

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
                toggleModal()
                console.log(resData);
            })
        console.log("Inside post request");
    }

    const handlePhoto = () => {
        console.log("Imasdad")
        ImagePicker.openPicker({
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

    const handleCamera = ()=>
    {
       
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
          }).then(image => {
            console.log(image);
            ImgToBase64.getBase64String(image.path)
            .then(base64String => {
                var req = "data:image/jpeg;base64,"+base64String;
                console.log(req);
                uploadImage(req);
            })
            .catch(err => doSomethingWith(err));
          });
          
    }

    const handleSaveProfile = async () => {
        console.log(userName);
        console.log
        var obj = {
            'FullName': userName,
            'ProfileImageUrl': image,
            'Id': user.Id,
            'Contact': userNumber,
        };
        console.log(obj);

        setIsLoading(true);
        await fetch('https://dreamy-chatelet.173-214-170-234.plesk.page/api/CustomerApi/EditCustomer?Id=' + user.Id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(obj)
        }).then(res => res.json())
            .then(resData => {
                setIsLoading(false);
                if (resData.Success) {
                    console.log("Job Response", resData);
                    AsyncStorage.setItem("UserData", JSON.stringify(obj));
                    navigation.navigate('Settings')
                } else {
                    console.log("Error");
                }
                console.log(resData);
            })
    }

    
    if (isLoading) {
        return (<Loader />)
    }

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <ScrollView style={{backgroundColor:'#fff'}}>
            <View style={[globalStyle.screenContainer, { padding: 0, }]}>
                <View style={globalStyle.pageHeader}>
                    <View style={globalStyle.HeaderRightDiv}></View>
                    <View style={globalStyle.HeaderLeftDiv}></View>
                    <View style={[globalStyle.welcomeNoteContainer, { justifyContent: 'center' }]}>
                        <Text style={globalStyle.welcomeUserTitle}>Edit Profile</Text>
                    </View>
                </View>
                <View style={[globalStyle.userProfileContainer, { marginTop: 20 }]}>
                    <View style={globalStyle.userProfile}>
                        {image !== null ?
                            <Image style={[globalStyle.imageFit, { borderRadius: 19 }]} source={{ uri: image }}></Image>
                            :
                            <Image style={[globalStyle.imageFit, { borderRadius: 19 }]} source={require('../../assets/img_avatar.png')}></Image>
                        }
                        <TouchableOpacity style={globalStyle.editIcon} onPress={() =>toggleModal()}>
                            <Image style={globalStyle.imageContain} source={require('../../assets/AddPhoto.png')} />
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={globalStyle.InputContainer}>
                    <FeatherIcon color='#A199AC' name="phone" size={20} style={globalStyle.InputIcon}></FeatherIcon>
                    <TextInput
                        style={[globalStyle.w100, { color: '#000' }]}
                        placeholder='+ 92 XXX XXXXXXX'
                        placeholderTextColor='#A199AC'
                        editable={false}
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
                <TouchableOpacity onPress={() => handleSaveProfile()} style={globalStyle.Theambtn}>
                    <Text style={globalStyle.TheambtnText}>Confirm</Text>
                </TouchableOpacity>
            </View>

            <Modal isVisible={isModalVisible}
            onBackdropPress={toggleModal}
            >
                <View style={globalStyle.modalViewContainer}>
                    <View style={globalStyle.ModalView}>
                        <View style={globalStyle.modalBody}>
                            <TouchableOpacity style={globalStyle.Theambtn} onPress={handleCamera}>
                                <Text style={{ color: 'white' }}>Upload From Camera</Text>

                            </TouchableOpacity>

                            <TouchableOpacity style={globalStyle.Theambtn} onPress={handlePhoto}>
                                <Text style={{ color: 'white' }}>Upload From Photo</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </ScrollView>

    );
}

export default EditProfile;