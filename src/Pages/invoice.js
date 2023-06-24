import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, FlatList, ActivityIndicator } from 'react-native'
import { globalStyle } from '../../styles/globalStyles';



function Invoice({ navigation, route }) {
    const [bookingDetails, setBookingDetail] = useState(route.params.info);
    console.log(' details',bookingDetails);
    // const [IsLoading, setIsLoading] = useState(false);
    // const [invoice, setInvoice] = useState(route.params.Invoice)
    // const [sub, setSub] = useState(route.params.Sub)
    // const [material, setMaterial] = useState(route.params.Material)
    // const [id, setId] = useState(route.params.Id)
    // if (IsLoading) {
    //     return (

    //         <Loader></Loader>    
    //     );
    // }
    return (
        <>
            <ScrollView style={globalStyle.screenContainer}>
                <View style={globalStyle.invoiceHeader}>
                    {/* <View style={globalStyles.invoiceLogoContainer}>
                        <Image
                            style={globalStyles.invoiceLogoImage}
                            source={require('../../assets/Butler(1).png')}
                        />
                    </View> */}
                    <View style={globalStyle.invoiceHeaderTitle}>
                        <Text style={[globalStyle.fontDark,{ fontSize: 25, fontWeight: '500', }]}>Inovice</Text>
                        <Text style={globalStyle.fontDark}>Recieved</Text>
                    </View>
                </View>
                <View style={globalStyle.userinfoContainer}>
                    <View style={globalStyle.userInfoDes}>
                        <View style={globalStyle.userInfoDesRow}>
                            <Text style={globalStyle.fontDark} >Service: </Text><Text style={globalStyle.fontDark}>{bookingDetails.Title}</Text>
                        </View>
                        <View style={globalStyle.userInfoDesRow}>
                            <Text style={globalStyle.fontDark}>Booking Date: </Text><Text style={globalStyle.fontDark}>{bookingDetails.DateString}</Text>
                        </View>
                        <View style={globalStyle.userInfoDesRow}>
                            <Text style={globalStyle.fontDark}>Customer Name: </Text><Text style={globalStyle.fontDark}>{bookingDetails.CustomerName}</Text>
                        </View>
                        <View style={globalStyle.userInfoDesRow}>
                            <Text style={globalStyle.fontDark}>Address:</Text>{bookingDetails.customerAddress ?<Text style={[globalStyle.fontDark,{ width: '80%' }]}>{bookingDetails.CustomerAddress}</Text>:<Text style={globalStyle.fontDark}> - </Text>}
                        </View>
                        {/* <View style={globalStyle.userInfoDesRow}>
                            <Text>Order_No:</Text><Text>123</Text>
                        </View> */}
                        <View style={globalStyle.userInfoDesRow}>
                            <Text style={globalStyle.fontDark}>Payment Status: </Text><Text style={globalStyle.fontDark}>{bookingDetails.StatusEnum}</Text>
                        </View>
                    </View>
                </View>
                
                <Text style={globalStyle.invoiceSubHeading}>Services</Text>
                {bookingDetails.JobDetail.map((value, index) => {
                    return (
                        <View key={index} style={[globalStyle.row, globalStyle.invoiceListItem]}>
                            <Text style={[globalStyle.fontDark,globalStyle.invoiceItemTitle]}>{value.SubCategoryName}</Text>
                            <Text style={globalStyle.fontDark}>Pkr :{value.Amount}</Text>
                        </View>

                    );
                })
                }
                {/* {material.length != 0 &&
                    <>
                        <Text style={globalStyles.invoiceMaterialHeadin}>Material</Text>
                        {material.map((value, index) => {
                            return (
                                <View key={index} style={[globalStyles.row, globalStyles.invoiceListItem]}>
                                    <Text style={globalStyles.invoiceItemTitle}>{value.MaterialName}</Text>
                                    <Text>Pkr : {value.Cost}</Text>
                                </View>
                            );
                        })
                        }
                    </>
                } */}

            </ScrollView>
            <View style={globalStyle.costDetailsContainer}>
                <View style={globalStyle.row}>
                    <Text style={globalStyle.costDetailsText}>Total Amount:</Text>
                    <Text style={globalStyle.costDetailsText}>{bookingDetails.TotalAmount}</Text>
                </View>
                {/* {invoice.PaymentStatusEnum == 'Done' &&
                    <TouchableOpacity
                        style={globalStyles.button}
                        onPress={() => navigation.navigate('rating', { Data: invoice })}
                    >
                        <Text style={{ color: 'white', fontWeight: '500' }}>Continue</Text>
                    </TouchableOpacity>
                } */}
            </View>
        </>
    );
}

export default Invoice;