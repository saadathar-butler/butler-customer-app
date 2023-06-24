import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import { globalStyle } from '../../styles/globalStyles';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../components/Loader'
import FontAwesomeIcom from 'react-native-vector-icons/FontAwesome'
import moment from 'moment';
import Modal from "react-native-modal";

function AddServices({ navigation, route }) {
    const [location, setLocation] = React.useState({
        latitude: 0,
        longitude: 0,
    });

    console.log('location at add service', location);


    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [image, setImage] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [user, setUser] = useState({});
    const [date, setDate] = useState(new Date());
    const [SelectedCategory, useSelectItem] = useState(route.params.SelectedItem)
    const [isModalVisible, setModalVisible] = useState(false);

    //show and hide modal function
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    React.useEffect(() => {
        Geolocation.getCurrentPosition(data => {
            setLocation({
                latitude: Number(data.coords.latitude),
                longitude: Number(data.coords.longitude),

            })
        })
        //Asad code
        const unsubscribe = navigation.addListener('focus', async () => {

            await AsyncStorage.getItem('SelectedCategory').then(res => {
                console.log(JSON.parse(res))
                console.log("Drlrfsfsf", SelectedCategory);
            });

            await AsyncStorage.getItem('UserData').then(res => {
                console.log(JSON.parse(res))
                setUser(JSON.parse(res))
            });

            await AsyncStorage.getItem('Location').then(loc => {
                const add = JSON.parse(loc)
                if (add != jobLocation) {
                    setJobLocation(add);
                }
            });
            AsyncStorage.removeItem('Location');
        });
        return unsubscribe;

    }, [setJobLocation])

    console.log('job location:', jobLocation);
    console.log("SelecteD Category", SelectedCategory);
    console.log("USer", user);

    const showDatePicker = () => {
        setDatePickerVisibility(!isDatePickerVisible);
    };

    const handleConfirm = (date) => {
        Alert.alert("A date has been picked: ", date.toDateString());
        setDate(date)
        showDatePicker();
    };

    // image Upload
    const handleImage = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: false,
        }).then(image => {
            console.log(image);
            ImgToBase64.getBase64String(image.path)
                .then(base64String => {
                    var req = "data:image/jpeg;base64," + base64String;
                    console.log('imagetoBase64', req);
                    uploadImage(req);
                })
                .catch(err => doSomethingWith(err));
        });
    }

    const RemoveImage = (ImgIndex) => {
        console.log(ImgIndex);
        image.splice(ImgIndex, 1);
        setImage(image.filter(item => item !== ImgIndex));
    }

    const uploadImage = async (image) => {
        console.log('image', image)
        setIsLoading(true)
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
                    console.log(resData);
                    console.log("Image Response", resData.ImageUrl);
                    setImage(oldArray => [...oldArray, resData.ImageUrl]);
                    console.log('images', image);
                } else {
                    Alert.alert("error", "Image is Not Upload");
                }
                console.log(resData);
            })
    }
    console.log("Images", image);

    const AddJob = async () => {
        console.log(SelectedCategory);
        console.log("User", user.Contact);
        console.log("description", description);
        console.log("image", image)
        if (jobLocation == null || jobLocation == '') {
            Alert.alert("error", "Please Enter Your Current Location");
            return;

        }
        console.log("Job Address", jobLocation);

        setIsLoading(true);
        await fetch('https://dreamy-chatelet.173-214-170-234.plesk.page/api/JobApi/ApplicationJob', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                'CategoryId': SelectedCategory.Category.Id,
                'CategoryName': SelectedCategory.Category.Name,
                'Title': SelectedCategory.Category.Name,
                'Description': description,
                'CustomerContact': user.Contact,
                'ImageUrl': image[0],
                'ImageUrl2': image[1],
                'ImageUrl3': image[2],
                'JobAddress': jobLocation,
                'BookingDate': moment(date).format("DD-MMM-yyyy hh:mm a"),
                'SubCategories': SelectedCategory.SelectedItem,
                'TotalAmount': SelectedCategory.Amount
            })
        }).then(res => res.json())
            .then(resData => {
                setIsLoading(false);
                if (resData.Success) {
                    console.log("Job Response", resData);
                    toggleModal();
                } else {

                    Alert.alert("error", "Unable To Add Job");
                }
                console.log(resData);
                //setMessage(resData.message)
            })
    }
    console.log(' location', location.latitude, location.longitude);
    if (isLoading) {
        return (<Loader />)
    }

    return (
        <>
            <ScrollView style={[globalStyle.screenContainer, { padding: 0 }]}>
                <View style={[globalStyle.pageHeader, { backgroundColor: '#fff', marginVertical: 0, zIndex: -999, height: 100 }]}>
                    <View style={globalStyle.HeaderRightDiv}></View>
                    <View style={globalStyle.HeaderLeftDiv}></View>
                    <View style={[globalStyle.welcomeNoteContainer, { justifyContent: 'center' }]}>
                        <Text style={globalStyle.welcomeUserTitle}>Confirmation</Text>
                    </View>
                </View>

                <View style={[globalStyle.Card, globalStyle.shadow, { display: 'flex', flexDirection: 'row' }]}>
                    <View style={[globalStyle.categoryImgContainer, { marginRight: 10 }]}>
                        <Image style={globalStyle.categoryImgStyle} source={{ uri: SelectedCategory.Category.ProfileImageUrl }} />
                    </View>
                    <View>
                        <Text style={globalStyle.serviceTitle}>{SelectedCategory.Category.Name}</Text>
                        {SelectedCategory.SelectedItem.map((value, index) => {
                            return (
                                <View key={index}>
                                    <Text style={globalStyle.textcolorLight}>{value.Name}</Text>
                                </View>
                            )

                        })}
                    </View>
                </View>
                <View style={globalStyle.InputContainer}>
                    <Ionicons name="ios-location-outline" size={20} color='#A199AC' style={globalStyle.InputIcon} />
                    <TextInput
                        style={[{ color: '#000', marginRight: '18%', width: '80%' }]}
                        onChangeText={(jobLocation) => setJobLocation(jobLocation)}
                        placeholder='Enter Your Location'
                        multiline
                        placeholderTextColor='#A199AC'
                        keyboardType="default"
                        value={jobLocation}
                    // onChangeText={(userNumber) => setuserNumber(userNumber)}
                    ></TextInput>
                    <TouchableOpacity style={{ position: 'absolute', right: 10 }}
                        onPress={() => navigation.navigate('Map', { latitude: location.latitude, longitude: location.longitude })}
                    >
                        <MaterialIcon name='my-location' size={25} color='#592D8E' />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={globalStyle.InputContainer}
                    onPress={showDatePicker}
                >
                    <Ionicons name="calendar-outline" size={20} color='#A199AC' style={globalStyle.InputIcon} />
                    <Text style={[globalStyle.textcolorDark, { paddingVertical: 15, }]}>{date.toDateString()} : {date.toLocaleTimeString()}</Text>
                </TouchableOpacity>
                <View style={[globalStyle.Card, globalStyle.shadow]}>
                    <Text style={globalStyle.cardTitle}>Upload Images</Text>
                    <View style={{ flexDirection: 'row' }}>
                        {image.length !== 0 &&
                            image.map((data, index) => {
                                return (
                                    <View style={[globalStyle.ImageContainer, { marginHorizontal: 10 }]}>
                                        <Image style={{ width: '100%', height: '100%', borderRadius: 11 }} source={{ uri: data }} />
                                        <TouchableOpacity onPress={() => RemoveImage(index)} style={{ borderRadius: 5, padding: 3, backgroundColor: '#FED034', position: 'absolute', right: -7, top: -7 }}>
                                            <FontAwesomeIcom name='times' size={14} color='#fff' />
                                        </TouchableOpacity>
                                    </View>
                                )
                            })

                        }
                        {image.length !== 3 &&
                            <TouchableOpacity style={globalStyle.ImageContainer}
                                onPress={handleImage}
                            >
                                <Image style={globalStyle.imageBtnStyle} source={require("../../assets/AddPhoto.png")} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>

                <View style={[globalStyle.Card, globalStyle.shadow]}>
                    <Text style={globalStyle.cardTitle}>Description</Text>
                    <View>
                        <TextInput
                            multiline={true}
                            numberOfLines={10}
                            underlineColorAndroid="transparent"
                            style={globalStyle.textarea}
                            placeholder='Enter issue description'
                            placeholderTextColor='#A199AC'
                            onChangeText={(description) => setDescription(description)}
                            value={description}
                        />
                    </View>
                </View>
                <TouchableOpacity style={[globalStyle.Theambtn, { marginVertical: 0 }]}
                    onPress={() => AddJob()}
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        <Text style={globalStyle.TheambtnText}>Continue</Text>
                        <Text style={globalStyle.TheambtnText}>Rs: {SelectedCategory.Amount.toLocaleString("ur-PK")}</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode='datetime'
                onConfirm={handleConfirm}
                onCancel={showDatePicker}
            />

            {/* Modal View */}
            <Modal isVisible={isModalVisible}>
                <View style={globalStyle.modalViewContainer}>
                    <View style={globalStyle.ModalView}>
                        <View style={globalStyle.modalBody}>
                            <View style={globalStyle.ModalImageView}>
                                <Image style={globalStyle.imageContain} source={require('../../assets/ModalImages/booked.png')} />
                            </View>
                            <Text style={{ fontSize: 20, fontWeight: '600', color: '#000' }}>Booked successfully!</Text>
                            <Text style={{ fontSize: 15, color: '#A199AC', textAlign: 'center', marginHorizontal: 25 }}>Your request has been sent. Our
                                agent will contact you soon.</Text>
                        </View>
                        <TouchableOpacity style={globalStyle.modalFooter}
                            onPress={() => navigation.navigate('Home')}
                        >
                            <Text style={globalStyle.TheamTextbtn}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </>
    );
}

export default AddServices;
