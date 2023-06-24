import React, { useState } from 'react';
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { globalStyle } from '../../styles/globalStyles';

function Terms() {
    return (
        <>
            <ScrollView style={[globalStyle.screenContainer, { padding: 0 }]}>
                <View style={[globalStyle.pageHeader, { backgroundColor: '#fff', marginVertical: 0, zIndex: -999, height: 100 }]}>
                    <View style={globalStyle.HeaderRightDiv}></View>
                    <View style={globalStyle.HeaderLeftDiv}></View>
                    <View style={[globalStyle.welcomeNoteContainer, { justifyContent: 'center' }]}>
                        <Text style={globalStyle.welcomeUserTitle}>Terms & Conditions</Text>
                    </View>
                </View>
                <View style={globalStyle.termsRow} >
                    <Text style={[globalStyle.textcolorLight, { marginRight: 10 }]}>{'\u2022'}</Text>
                    <Text style={globalStyle.textcolorLight}>Customer will pay for material</Text>
                </View>
                <View style={globalStyle.termsRow}  >
                    <Text style={[globalStyle.textcolorLight, { marginRight: 10 }]}>{'\u2022'}</Text>
                    <Text style={globalStyle.textcolorLight}>Customer cannot give his/her personal number to worker</Text>
                </View>
                <View style={globalStyle.termsRow}  >
                    <Text style={[globalStyle.textcolorLight, { marginRight: 10 }]}>{'\u2022'}</Text>
                    <Text style={globalStyle.textcolorLight}>Customer cannot directly contact worker for any query you have to contact Butler's head office</Text>
                </View>
                <View style={globalStyle.termsRow}  >
                    <Text style={[globalStyle.textcolorLight, { marginRight: 10 }]}>{'\u2022'}</Text>
                    <Text style={globalStyle.textcolorLight}>Customer will ensure that the worker is in complete uniform if any worker is not wearing complete uniform send his picture to Butlers and you will earn reward</Text>
                </View>
                <View style={globalStyle.termsRow} >
                    <Text style={[globalStyle.textcolorLight, { marginRight: 10 }]}>{'\u2022'}</Text>
                    <Text style={globalStyle.textcolorLight}>If job did not complete on the first day in that case customer will have to inform head office</Text>
                </View>
                <View style={globalStyle.termsRow} >
                    <Text style={[globalStyle.textcolorLight, { marginRight: 10 }]}>{'\u2022'}</Text>
                    <Text style={globalStyle.textcolorLight}>Prices can be varied up to 10  - 15 % after inspection of the site</Text>
                </View>
                <View style={globalStyle.termsRow} >
                    <Text style={[globalStyle.textcolorLight, { marginRight: 10 }]}>{'\u2022'}</Text>
                    <Text style={globalStyle.textcolorLight}>You can claim the warranty after the completion of job within 7 days. </Text>
                </View>
                <View style={globalStyle.termsRow} >
                    <Text style={[globalStyle.textcolorLight, { marginRight: 10 }]}>{'\u2022'}</Text>
                    <Text style={globalStyle.textcolorLight}>Any additional work will be charged separately</Text>
                </View>
            </ScrollView>
        </>
    );
}

export default Terms;