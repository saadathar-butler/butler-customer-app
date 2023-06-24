import React, { useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import { globalStyle } from '../../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../components/Loader';

function Notification({ navigation }) {
    const [IsLoading, setIsLoading] = useState(false);
    const [notifications, setNotifications] = useState([])
    React.useEffect(async () => {
        const unsubscribe = navigation.addListener('focus', () => {
            setIsLoading(true);
            AsyncStorage.getItem('UserData').then(async res => {
                console.log(JSON.parse(res));
                var userObject = JSON.parse(res)
                
                var url = 'https://dreamy-chatelet.173-214-170-234.plesk.page/api/NotificationApi/GetListing?CustomerId=' + userObject.Id;
                await fetch(url)
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json);
                        setNotifications(json.Data);
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        console.error(error);
                        setIsLoading(false);
                    });
            });
            return unsubscribe;
        });
    }, [setNotifications])
    
    console.log(notifications)
    if (IsLoading) {
        return (

            <Loader/>
        );
    }

    return (

        <View style={[globalStyle.screenContainer, { padding: 0 }]}>
            <View style={globalStyle.pageHeader}>
                <View style={globalStyle.HeaderRightDiv}></View>
                <View style={globalStyle.HeaderLeftDiv}></View>
                <View style={[globalStyle.welcomeNoteContainer, { justifyContent: 'center' }]}>
                    <Text style={globalStyle.welcomeUserTitle}>Notifications</Text>
                </View>
            </View>
            <View style={[globalStyle.screenBody]}>

                {notifications.length > 0 ?

                    <View>
                        <FlatList
                            data={notifications}
                            // keyExtractor=
                            renderItem={({ item }) =>
                                <View style={[globalStyle.Card, globalStyle.shadow]}>
                                    <Text style={globalStyle.textcolorLight}>{item.Content}</Text>
                                    <Text style={globalStyle.textcolorLight}>{item.Duration}</Text>
                                </View>
                            }
                        >

                        </FlatList>
                    </View>
                    :
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '40%' }}>
                        <View style={{ height: 150, width: 150, }}>
                            <Image style={{ width: '100%', height: '100%', resizeMode: 'contain' }} source={require('../../assets/Bell.png')} />
                        </View>
                        <Text style={[globalStyle.textcolorLight, { fontSize: 24 }]}>No notifications found</Text>
                    </View>
                }
            </View>
        </View>
    );
}

export default Notification;