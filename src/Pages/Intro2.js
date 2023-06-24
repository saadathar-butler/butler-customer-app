import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native'


function Intro2({ navigation }) {
    return (
        <View style={[styles.GetStarted]}>
            <ImageBackground
                style={{ flex: 1, height: '100%', width: '100%' }}
                source={require('../../assets/IntroSlider/BG1.png')}>
                <Image style={styles.imageView} source={require('../../assets/IntroSlider/Intro2.png')}></Image>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={styles.titleText}>Booking & Confirmation</Text>
                    <Text style={styles.IntroDescp}>
                        <Text>Select the service &
                            <Text style={{ fontWeight: 'bold' }}> book </Text>
                            as per your convenience.
                        </Text>
                    </Text>
                    <Image style={styles.crousalWidth} source={require('../../assets/IntroSlider/Carousal2.png')}></Image>
                </View>
                <View style={styles.bottomBtnsRow}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('LoginRegister')}>
                        <Text style={{ color: '#A199AC', fontWeight: '800' }}>Skip</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('GetStarted')}>
                        <Text style={styles.nextBtn}>Next</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}
export default Intro2;

const styles = StyleSheet.create({

    crousalWidth: {
        resizeMode: 'contain',
        width: 80
    },

    button: {
        // position:'absolute',
        // bottom:'5%',
        alignItems: "center",
        backgroundColor: "#592D8E",
        padding: 10,
        borderRadius: 12,
        marginVertical: 20,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        width: '80%',
        elevation: 10,
        shadowColor: '#572D8E',
        shadowRadius: 12,
    },
    text:
    {
        height: 100,
        fontSize: 30,
        color: 'white',
        marginVertical: 25,
        alignItems: 'center'
    },
    loginForm: {
        padding: 20,
        marginTop: 50
    },
    input: {
        color: 'black',
        backgroundColor: '#DCDCDC',
        borderRadius: 20,
        width: '100%',
        maxWidth: '100%',
        paddingHorizontal: 10,
        marginVertical: 10
    },
    loginHeader:
    {
        paddingTop: 35,
        alignItems: 'center',
        width: '100%',
        height: 150,
        backgroundColor: "#572392",
        color: 'white',
        borderBottomRightRadius: 50,

    },
    textCenter:
    {
        textAlign: 'center',
    },
    GetStarted: {
        padding: 0,
        margin: 0,
        width: '100%',
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    imageView: {
        width: '100%',
        height: '50%',
        resizeMode: 'contain',
        marginLeft: 15
    },
    titleText: {
        fontSize: 20,
        color: '#A199AC',
        fontWeight: 'bold'
    },
    IntroDescp: {
        fontSize: 25,
        fontWeight: '400',
        color: '#0E0021'
    },
    btnsViewContainer: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: '10%'
    },
    bottomBtnsRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        bottom: '10%',
        width: '90%',
        marginHorizontal: 20
    },
    nextBtn: {
        textAlign: 'center',
        backgroundColor: "#592D8E",
        padding: 10,
        width: 80,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 10,
        shadowColor: '#572D8E',
        shadowRadius: 12,
        color: '#fff'
    }
})