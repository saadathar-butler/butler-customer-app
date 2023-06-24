import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { globalStyle } from '../../styles/globalStyles';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Bookings({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isActiveBookins, setIsActiveBookings] = useState(true);
    const [user, setUser] = useState({});
    const [ActiveBookings, setActiveBookings] = useState([]);
    const [PreviousBookings, setPreviousBookings] = useState([]);

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('state' ,async () => {
            setIsLoading(true);
            await AsyncStorage.getItem('UserData').then(res => {
                console.log(JSON.parse(res))
                setUser(JSON.parse(res))
                var userObject = JSON.parse(res)
                var url = 'https://dreamy-chatelet.173-214-170-234.plesk.page/api/JobApi/GetActiveBooking?CustomerId=' + userObject.Id;
                fetch(url)
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json);
                        setActiveBookings(json.Data);
                    })
                    .catch((error) => {
                        console.error(error);
                        setIsLoading(false);
                    });

                    var url = 'https://dreamy-chatelet.173-214-170-234.plesk.page/api/JobApi/GetPreviousBooking?CustomerId=' + userObject.Id;
                fetch(url)
                    .then((response) => response.json())
                    .then((json) => {
                        console.log(json);
                        setPreviousBookings(json.Data);
                        setIsLoading(false);
                    })
                    .catch((error) => {
                        console.error(error);
                        setIsLoading(false);
                    });
            });

        });
        return unsubscribe;
    }, [setActiveBookings] , [setPreviousBookings]);
    console.log('active Bookings', ActiveBookings);
    console.log('Previous Bookings', PreviousBookings);
    if (isLoading) {
        return (<Loader />)
    }

    return (
        <View style={[globalStyle.screenContainer, { padding: 0 }]}>
            <View style={globalStyle.pageHeader}>
                <View style={globalStyle.HeaderRightDiv}></View>
                <View style={globalStyle.HeaderLeftDiv}></View>
                <View style={[globalStyle.welcomeNoteContainer, { justifyContent: 'center' }]}>
                    <Text style={globalStyle.welcomeUserTitle}>All Bookings</Text>
                </View>
            </View>
            <View style={globalStyle.screenBody}>
                {isActiveBookins ?
                    <>
                        <View style={[globalStyle.row, { marginVertical: 10 }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={[globalStyle.activeTab, { marginRight: 15 }]}
                                    onPress={() => setIsActiveBookings(true)}
                                >
                                    <Text style={[globalStyle.activetabText, globalStyle.tabTextstyle]}>Active</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setIsActiveBookings(false)}
                                >
                                    <Text style={[globalStyle.inactivetabText, globalStyle.tabTextstyle]}>Previous</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <FlatList
                                data={ActiveBookings}
                                renderItem={({ item }) =>
                                    <TouchableOpacity style={[globalStyle.bookingCard, globalStyle.shadow]}
                                        onPress={() => navigation.navigate('BookingDetails',{Booking: item})}
                                    >
                                        <View style={globalStyle.BookingInfo}>
                                            <View style={[globalStyle.categoryImgContainer, { marginRight: 10 }]}>
                                                <Image style={globalStyle.categoryImgStyle} source={{uri: item.CategoryImageUrl}} />
                                            </View>
                                            <View>
                                                <Text style={globalStyle.bookingCardTitle}>{item.CategoryName}</Text>
                                                <Text style={globalStyle.textcolorLight}>{item.Id}</Text>
                                                <Text style={globalStyle.textcolorLight}>{item.BookingDate}</Text>
                                            </View>
                                        </View>
                                        {item.StatusEnum == 'Processing' ?
                                            <Text style={[globalStyle.Active, globalStyle.BookingStatus]}>{item.StatusEnum}</Text>
                                            :
                                            <Text style={[globalStyle.Pending, globalStyle.BookingStatus]}>{item.StatusEnum}</Text>
                                        }
                                    </TouchableOpacity>
                                }
                            />
                        </View>
                    </>
                    :
                    <>
                        <View style={[globalStyle.row, { marginVertical: 10 }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={{ marginRight: 15 }}
                                    onPress={() => setIsActiveBookings(true)}
                                >
                                    <Text style={[globalStyle.inactivetabText, globalStyle.tabTextstyle]}>Active</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={globalStyle.activeTab}
                                    onPress={() => setIsActiveBookings(false)}
                                >
                                    <Text style={[globalStyle.activetabText, globalStyle.tabTextstyle]}>Previous</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <FlatList
                                data={PreviousBookings}
                                renderItem={({ item }) =>
                                    <TouchableOpacity style={[globalStyle.bookingCard, globalStyle.shadow]}
                                        onPress={() => navigation.navigate('BookingDetails',{Booking:item})}
                                    >
                                        <View style={globalStyle.BookingInfo}>
                                            <View style={[globalStyle.categoryImgContainer, { marginRight: 10 }]}>
                                                <Image style={globalStyle.categoryImgStyle} source={{uri: item.CategoryImageUrl}} />
                                            </View>
                                            <View>
                                                <Text style={globalStyle.bookingCardTitle}>{item.CategoryName}</Text>
                                                <Text style={globalStyle.textcolorLight}>{item.Id}</Text>
                                                <Text style={globalStyle.textcolorLight}>{item.BookingDate}</Text>
                                            </View>
                                        </View>
                                        {item.StatusEnum == 'Complete' ?
                                            <Text style={[globalStyle.Completed, globalStyle.BookingStatus]}>{item.StatusEnum}</Text>
                                            :
                                            <Text style={[globalStyle.Cancled, globalStyle.BookingStatus]}>{item.StatusEnum}</Text>
                                        }
                                    </TouchableOpacity>
                                }
                            >
                            </FlatList>
                        </View>
                    </>
                }
            </View>
        </View>
    );
}

export default Bookings;