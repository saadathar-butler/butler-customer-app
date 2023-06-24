import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { globalStyle } from '../../styles/globalStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { AuthContext } from '../components/Context';
import EnyptoIcon from 'react-native-vector-icons/Entypo'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';
function Settings({ navigation }) {
    // AuthContex for SignOut
    const { signOut } = React.useContext(AuthContext);
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(null);
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('state', async () => {
            await AsyncStorage.getItem('UserData').then(res => {
                console.log(JSON.parse(res))
                setUser(JSON.parse(res))
                var user = JSON.parse(res)
                setImage(user.ProfileImageUrl)
            });
        });
        return unsubscribe;
    }, [user]);

    console.log("User", image);

    if (isLoading) {
        return (<Loader />)
    }

    return (
        <View style={[globalStyle.screenContainer, { padding: 0 }]}>
            <View style={[globalStyle.pageHeader, { backgroundColor: '#fff', marginTop: 15, zIndex: -999, height: 95 }]}>
                <View style={globalStyle.HeaderRightDiv}></View>
                <View style={[globalStyle.HeaderLeftDiv, { backgroundColor: '#FEED06' }]}></View>
            </View>
            <View style={{ margin: 10, }}>
                <View style={globalStyle.profileCardContainer}>
                    <View style={[globalStyle.Card, globalStyle.shadow, { flexDirection: 'row', alignItems: 'center', opacity: 1 }]}>
                        <View style={[globalStyle.userProfile, { marginRight: 5 }]}>
                            {image !== null ?
                                <Image style={[globalStyle.imageFit, { borderRadius: 19 }]} source={{uri: image}}></Image>
                                :
                                <Image style={[globalStyle.imageFit, { borderRadius: 19 }]} source={require('../../assets/img_avatar.png')}></Image>
                            }

                        </View>
                        <View style={globalStyle.profileCardInfo}>
                            <Text style={[globalStyle.welcomeUserTitle, { color: '#592D8E' }]}>{user.FullName}</Text>
                            <TouchableOpacity style={globalStyle.editProfilebtn}
                                onPress={() => navigation.navigate('EditProfile')}
                            >
                                <MaterialIcons name='pencil-circle' size={20} color="#E5E3E9" />
                                <Text style={globalStyle.textcolorLight}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={() => navigation.navigate('TermsAndConditions')}
                >
                    <View style={[globalStyle.settingCustomButton, globalStyle.shadow]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ height: 30, width: 30 }}>
                                <Image resizeMethod='auto' resizeMode='contain' style={{ width: '100%', height: '100%' }} source={require('../../assets/InputIcons/Terms.png')} />
                            </View>
                            <Text style={globalStyle.CustomButtonText}>Terms and Conditions</Text>
                        </View>
                        <EnyptoIcon name="chevron-small-right" size={20} color="#A199AC" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={globalStyle.Theambtn}
                    onPress={() => { signOut() }}
                >
                    <Text style={globalStyle.TheambtnText}
                    >Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Settings;