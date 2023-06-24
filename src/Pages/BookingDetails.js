import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { globalStyle } from '../../styles/globalStyles';
import Loader from '../components/Loader';
import CustomIcon from 'react-native-vector-icons/FontAwesome5'

function BookingDetails({ navigation, route }) {
    const [isLoading, setIsLoading] = useState(false);
    const [bookingDetail, setBookingDetail] = useState(route.params.Booking);


    console.log(bookingDetail)

    if (isLoading) {
        return (<Loader />)
    }
    return (
        <>
            <ScrollView style={[globalStyle.screenContainer, { padding: 0 }]}>
                <View style={[globalStyle.pageHeader, { backgroundColor: '#fff', marginVertical: 0, zIndex: -999, height: 100 }]}>
                    <View style={globalStyle.HeaderRightDiv}></View>
                    <View style={globalStyle.HeaderLeftDiv}></View>
                    <View style={[globalStyle.welcomeNoteContainer, { justifyContent: 'space-between' }]}>
                        <Text style={globalStyle.welcomeUserTitle}>Booking Details</Text>
                    </View>
                </View>
                <View style={globalStyle.screenBody}>
                    <View style={[globalStyle.bookingCard, globalStyle.shadow, { backgroundColor: '#FFFFFF' }]}>
                        <View style={[globalStyle.BookingInfo, { width: '100%' }]}>
                            <View style={[globalStyle.categoryImgContainer, { marginRight: 10 }]}>
                                <Image style={globalStyle.categoryImgStyle} source={{ uri: bookingDetail.CategoryImageUrl }} />
                            </View>
                            <View>
                                <Text style={globalStyle.bookingCardTitle}>{bookingDetail.CategoryName}</Text>
                                {bookingDetail.JobDetail.map((value, index) => {
                                    return (
                                        <View key={(index)}>
                                            <Text style={[globalStyle.textcolorLight, { width: '85%' }]}>{value.SubCategoryName}</Text>
                                        </View>
                                    )
                                })}
                            </View>
                        </View>
                        <TouchableOpacity onPress={()=>navigation.navigate('invoice',{info:bookingDetail})}
                            style={{position:'absolute' , top: 5 , right:5}}
                        >
                            <CustomIcon name="file-invoice" size={25} color="#592D8E" />
                        </TouchableOpacity>
                    </View>
                    <View style={[globalStyle.Card, globalStyle.shadow]}>
                        <Text style={globalStyle.cardTitle}>Details</Text>
                        <View style={globalStyle.row}>
                            <Text style={[globalStyle.textcolorLight, { fontWeight: '600' }]}>Order ID</Text>
                            <Text style={[globalStyle.textcolorDark, { fontWeight: '600' }]}>{bookingDetail.Id}</Text>
                        </View>
                        <View style={globalStyle.row}>
                            <Text style={[globalStyle.textcolorLight, { fontWeight: '600' }]}>Booking Date</Text>
                            <Text style={[globalStyle.textcolorDark, { fontWeight: '600' }]}>{bookingDetail.BookingDate}</Text>
                        </View>
                        <View style={globalStyle.row}>
                            <Text style={[globalStyle.textcolorLight, { fontWeight: '600' }]}>Total Cost</Text>
                            <Text style={[globalStyle.textcolorDark, { fontWeight: '600' }]}>{bookingDetail.TotalAmount.toLocaleString("ur-PK")}</Text>
                        </View>
                        <View style={globalStyle.row}>
                            <Text style={[globalStyle.textcolorLight, { fontWeight: '600' }]}>Status</Text>
                            {bookingDetail.StatusEnum == 'Processing' ?
                                <Text style={[globalStyle.Active, globalStyle.BookingStatus, { marginVertical: 0 }]}>{bookingDetail.StatusEnum}</Text>
                                : bookingDetail.StatusEnum == 'Complete' ?
                                    <Text style={[globalStyle.Completed, globalStyle.BookingStatus, { marginVertical: 0 }]}>{bookingDetail.StatusEnum}</Text>
                                    : bookingDetail.StatusEnum == 'Cancelled' ?
                                        <Text style={[globalStyle.Cancled, globalStyle.BookingStatus, { marginVertical: 0 }]}>{bookingDetail.StatusEnum}</Text>
                                        : bookingDetail.StatusEnum == 'Queued' ?
                                            <Text style={[globalStyle.Pending, globalStyle.BookingStatus, { marginVertical: 0 }]}>{bookingDetail.StatusEnum}</Text>
                                            :
                                            <Text style={[globalStyle.Pending, globalStyle.BookingStatus, { marginVertical: 0 }]}>{bookingDetail.StatusEnum}</Text>

                            }
                        </View>
                    </View>
                    <View style={[globalStyle.Card, globalStyle.shadow]}>
                        <Text style={globalStyle.cardTitle}>Upload Images</Text>
                        <View style={globalStyle.row}>
                            {bookingDetail.ImageUrl.map((data, index) => {
                                if (data !== null) {
                                    return (
                                        <View key={index} style={globalStyle.ImageContainer}>
                                            <Image style={{ width: '100%', height: '100%' }} source={{ uri: data }} />
                                        </View>
                                    )
                                }
                            })}
                        </View>
                    </View>

                    <View style={[globalStyle.Card, globalStyle.shadow]}>
                        <Text style={globalStyle.cardTitle}>Description</Text>
                        <View>
                            <Text style={globalStyle.textcolorLight}>{bookingDetail.Description}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

export default BookingDetails;