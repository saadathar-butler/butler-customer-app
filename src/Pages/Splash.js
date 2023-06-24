import React from 'react'
import { Text, Image, View, ImageBackground, StyleSheet, StatusBar } from 'react-native'

function SplashScreen() {

    const logo = require('../../assets/AppLogo.png')
    const SplashTop = require('../../assets/SplashTop.png')
    const SplashBottom = require('../../assets/SplashBottom.png')
    return (
        <>
            <StatusBar backgroundColor={'transparent'} translucent={true}/>
            <View style={styles.container}>
                <Image style={styles.logoContainer}
                    source={logo}
                    resizeMode="contain"
                />
                <Image style={{position:'absolute',top:0,width:'100%',height:200}}
                    source={SplashTop}
                    resizeMode="cover"
                />
                <Image style={{position:'absolute',bottom:0 ,width:'100%',height:200}}
                    source={SplashBottom}
                    resizeMode="cover"
                />
                {/* <Loader /> */}
            </View>
        </>
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: "100%",
        backgroundColor: "#592D8E",
        position: 'relative'
    },
    logoContainer: {
        width: '75%',
        height: 150,
        position: 'absolute',
        top: '40%',
    },

    logo: {
        width: "100%",
        height: '150%',
    }
})