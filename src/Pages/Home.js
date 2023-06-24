import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { globalStyle } from '../../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons'
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home({ navigation }) {

    // Resent Bookings
    const [ActiveBookings, setActiveBookings] = useState([])
    const [count, setcount] = useState(0);
    const [isHomeServices, setisHomeServices] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState({});
    const [homeCare, setHomeCare] = useState({});
    const [healthCare, setHealthCare] = useState({});



    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', async () => {
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
                    });
            });


            var url = 'https://dreamy-chatelet.173-214-170-234.plesk.page/api/CategoryApi/ServiceCategory';
            fetch(url)
                .then((response) => response.json())
                .then((resData) => {
                    console.log(resData);
                    if (resData.Data[0] != null) {
                        setHomeCare(resData.Data[0])
                    }
                    if (resData.Data[1] != null) {
                        setHealthCare(resData.Data[1])
                    }

                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setIsLoading(false);
                });
        });
        return unsubscribe;
    }, [setHomeCare], [setHealthCare], [setActiveBookings]);
    console.log("Home Care", homeCare);
    console.log("Health Care", healthCare);
    console.log("User", user)
    console.log('bookings', ActiveBookings)

    if (isLoading) {
        return (<Loader />)
    }
    return (
        <ScrollView style={[globalStyle.screenContainer, { padding: 0 }]}>
            <View >
                <View style={globalStyle.pageHeader}>
                    <View style={globalStyle.HeaderRightDiv}></View>
                    <View style={globalStyle.HeaderLeftDiv}></View>
                    <View style={globalStyle.welcomeNoteContainer}>
                        <Text style={globalStyle.welcomeText}>Welcome,</Text>
                        <Text style={globalStyle.welcomeUserTitle}>{user.FullName}!</Text>
                    </View>
                </View>
                <View style={globalStyle.screenBody}>
                    {ActiveBookings.length > 0 &&
                        <>
                            <View style={globalStyle.row}>
                                <Text style={[globalStyle.textcolorLight, globalStyle.recentBookings]}>Recent bookings</Text>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('Booking')}
                                >
                                    <Icon name='arrow-forward' size={20} color='#592D8E' />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <FlatList
                                    data={ActiveBookings}
                                    horizontal={true}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity style={[globalStyle.Card, globalStyle.shadow]}
                                            onPress={() => navigation.navigate('BookingDetails', { Booking: item })}
                                        >
                                            <View style={globalStyle.categoryImgContainer}>
                                                <Image style={globalStyle.categoryImgStyle} source={{ uri: item.CategoryImageUrl }} />
                                            </View>
                                            <Text style={globalStyle.categoryTitle}>{item.CategoryName}</Text>
                                            <Text style={globalStyle.textcolorLight}>Order# {item.Id}</Text>
                                            <Text style={globalStyle.textcolorLight}>{item.BookingDate}</Text>
                                            {item.StatusEnum == 'Processing' ?
                                                <Text style={[globalStyle.Active, globalStyle.BookingStatus, { marginVertical: 0, marginHorizontal: 0, alignSelf: 'flex-start' }]}>{item.StatusEnum}</Text>
                                                :
                                                <Text style={[globalStyle.Pending, globalStyle.BookingStatus, { marginVertical: 0, marginHorizontal: 0, alignSelf: 'flex-start' }]}>{item.StatusEnum}</Text>
                                            }
                                        </TouchableOpacity>
                                    }
                                />
                            </View>
                        </>
                    }

                    {isHomeServices ?
                        <>
                            <View style={[globalStyle.row, { marginVertical: 10 }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={[globalStyle.activeTab, { marginRight: 15 }]}
                                        onPress={() => setisHomeServices(true)}
                                    >
                                        <Text style={[globalStyle.activetabText, globalStyle.tabTextstyle]}>Home Care</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setisHomeServices(false)}
                                    >
                                        <Text style={[globalStyle.inactivetabText, globalStyle.tabTextstyle]}>Health Care</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {homeCare.Category != null ?
                                <FlatList
                                    style={{ height: '100%' }}
                                    numColumns='2'
                                    showsVerticalScrollIndicator={false}
                                    data={homeCare.Category}
                                    keyExtractor={(item) => item.Id}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity style={globalStyle.categoryCard}
                                            onPress={() => navigation.navigate('SubCategories', { data: item })}
                                        >
                                            <View style={globalStyle.categoryImgContainer}>
                                                <Image style={globalStyle.categoryImgStyle} source={{ uri: item.ProfileImageUrl }} />
                                            </View>
                                            <Text style={globalStyle.categoryTitle}>{item.Name}</Text>
                                            <Text style={globalStyle.textcolorLight}>{item.ServiceCount}</Text>
                                        </TouchableOpacity>
                                    }
                                /> :
                                <View style={{
                                    backgroundColor: 'white', height: 300, alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <Text style={[globalStyle.fontDark, { fontSize: 25, fontWeight: '700' }]}>Coming Soon</Text>
                                </View>
                            }
                        </>
                        :
                        <>
                            <View style={[globalStyle.row, { marginVertical: 10 }]}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity style={{ marginRight: 15 }}
                                        onPress={() => setisHomeServices(true)}
                                    >
                                        <Text style={[globalStyle.inactivetabText, globalStyle.tabTextstyle]}>Home Care</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={globalStyle.activeTab}
                                        onPress={() => setisHomeServices(false)}
                                    >
                                        <Text style={[globalStyle.activetabText, globalStyle.tabTextstyle]}>Health Care</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {healthCare.Category != null ?
                                <FlatList
                                    style={{ height: '100%' }}
                                    numColumns='2'
                                    showsVerticalScrollIndicator={false}
                                    data={healthCare.Category}
                                    keyExtractor={(item) => item.Id}
                                    renderItem={({ item }) =>
                                        <TouchableOpacity style={globalStyle.categoryCard}
                                            onPress={() => navigation.navigate('SubCategories', { data: item })}
                                        >
                                            <View style={globalStyle.categoryImgContainer}>
                                                <Image style={globalStyle.categoryImgStyle} source={{ uri: item.ProfileImageUrl }} />
                                            </View>
                                            <Text style={globalStyle.categoryTitle}>{item.Name}</Text>
                                            <Text style={globalStyle.textcolorLight}>{item.ServiceCount}</Text>
                                        </TouchableOpacity>
                                    }
                                />
                                :
                                <View style={{ backgroundColor: 'white', height: 300, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={[globalStyle.fontDark, { fontSize: 25, fontWeight: '700' }]}>Coming Soon</Text>
                                </View>
                            }
                        </>
                    }

                </View>
            </View>
        </ScrollView>
    );
}

export default Home;