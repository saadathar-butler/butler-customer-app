import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeIcon from 'react-native-vector-icons/Foundation'
import MaterialComunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Home from '../Pages/Home';
import Bookings from '../Pages/Booking';
import Notification from '../Pages/Notification';
import Settings from '../Pages/Settings';
import SubCategories from '../Pages/SubCategories';
import AddServices from '../Pages/AddService';
import Terms from '../Pages/TermsAndConditions';
import BookingDetails from '../Pages/BookingDetails';
import Map from '../Pages/Map';
import EditProfile from '../Pages/EditProfile';
import Invoice from '../Pages/invoice';

const Tabs = createMaterialBottomTabNavigator();

function MainTabs() {
    return (
        <Tabs.Navigator
            Color="#FFFF"
            activeColor="#592D8E"
            barStyle={{ backgroundColor: '#fff' }}
        >
            <Tabs.Screen
                name="HomeStack"
                component={HomeStackScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (
                        <HomeIcon name="home" color={color} size={24} ></HomeIcon>
                    ),
                }}
            />
            <Tabs.Screen name="bookings" component={BookingStackScreen}
                options={{
                    tabBarLabel: 'Bookings',
                    tabBarIcon: ({ color }) => (
                        <MaterialComunityIcon name="calendar-month-outline" color={color} size={24} ></MaterialComunityIcon>
                    ),
                }}
            />
            <Tabs.Screen name="NotificationScreen" component={NotificationStackScreen}
                options={{
                    tabBarLabel: 'Notifications',
                    tabBarIcon: ({ color }) => (
                        <Icon name="notifications-outline" color={color} size={24} ></Icon>
                    ),
                }}
            />
            <Tabs.Screen name="SettingStack" component={SettingStackScreen}
                options={{
                    tabBarLabel: 'More',
                    tabBarIcon: ({ color }) => (
                        <MaterialComunityIcon name="view-dashboard-outline" color={color} size={24} ></MaterialComunityIcon>
                    ),
                }}
            />
        </Tabs.Navigator>
    );
}

export default MainTabs;

const HomeStack = createNativeStackNavigator()
const BookingStack = createNativeStackNavigator()
const NotificationStack = createNativeStackNavigator()
const SettingStack = createNativeStackNavigator()

function HomeStackScreen ({navigation}) {

    return(
    <HomeStack.Navigator initialRouteName='Home' >
        <HomeStack.Screen name="Home"
            component={Home}
            options={{
                headerShown: false,
                headerTitleAlign:'left',
                headerTitleStyle:{fontWeight:'300',color:'#A199AC'},
            }}>
        </HomeStack.Screen>
        <HomeStack.Screen name="SubCategories"
            component={SubCategories}
            options={{
                headerShown: true,
                title:'',
                headerShadowVisible:false,

            }}>
        </HomeStack.Screen>
        <HomeStack.Screen name="AddService"
            component={AddServices}
            options={{
                headerShown: true,
                title:'',
                headerShadowVisible:false,
            }}>
        </HomeStack.Screen>
        <HomeStack.Screen name="Map"
            component={Map}
            options={{
                headerShown: true,
                title:'',
                headerShadowVisible:false,
                headerTitleAlign:'left',
                headerTitleStyle:{fontWeight:'300',color:'#A199AC'},

            }}>
        </HomeStack.Screen>
        <HomeStack.Screen name="Booking" component={Bookings}></HomeStack.Screen>
        <HomeStack.Screen name="BookingDetails"  component={BookingDetails}
        options={{
            headerShown: true,
            title:'',
            headerShadowVisible:false,
            headerTitleAlign:'left',
            headerTitleStyle:{fontWeight:'300',color:'#A199AC'},
        }}
        ></HomeStack.Screen>
    </HomeStack.Navigator>
    )
}

const BookingStackScreen = () => (

    <BookingStack.Navigator screenOptions={{
        headerShown: false
    }}>
        <BookingStack.Screen name="Booking" component={Bookings}></BookingStack.Screen>
        <BookingStack.Screen name="BookingDetails"  component={BookingDetails}
        options={{
            headerShown: true,
            title:'',
            headerShadowVisible:false,
            headerTitleAlign:'left',
            headerTitleStyle:{fontWeight:'300',color:'#A199AC'},
        }}
        ></BookingStack.Screen>
        <BookingStack.Screen name="invoice"  component={Invoice}
        options={{
            headerShown: true,
            title:'',
            headerShadowVisible:false,
            headerTitleAlign:'left',
            headerTitleStyle:{fontWeight:'300',color:'#A199AC'},
        }}
        ></BookingStack.Screen>
    </BookingStack.Navigator>
)

const NotificationStackScreen = () => (
    <NotificationStack.Navigator screenOptions={{
        headerShown: false
    }}>
        <NotificationStack.Screen name="Notification" component={Notification}
        ></NotificationStack.Screen>
    </NotificationStack.Navigator>
)

const SettingStackScreen = () => (
    <SettingStack.Navigator screenOptions={{
        headerShown: false,
    }}>
        <SettingStack.Screen name="Settings" component={Settings}></SettingStack.Screen>
        <SettingStack.Screen name="TermsAndConditions" component={Terms}
        options={{
            headerShown: true,
            title:'',
            headerShadowVisible:false,
            headerTitleAlign:'left',
            headerTitleStyle:{fontWeight:'300',color:'#A199AC'},

        }}
        ></SettingStack.Screen>
        <SettingStack.Screen name="EditProfile" component={EditProfile}
        options={{
            headerShown: true,
            title:'',
            headerShadowVisible:false,
            headerTitleAlign:'left',
            headerTitleStyle:{fontWeight:'300',color:'#A199AC'},

        }}
        ></SettingStack.Screen>
    </SettingStack.Navigator>
)
