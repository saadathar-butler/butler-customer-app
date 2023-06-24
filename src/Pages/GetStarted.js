import React from 'react';
import { Text, View, StyleSheet,  TouchableOpacity, Image, ImageBackground } from 'react-native'

function GetStarted({ navigation }) {
    
     return (
        <View style={[styles.GetStarted]}>
            <ImageBackground
                style={{ flex: 1, height: '100%', width: '100%' }}
                source={require('../../assets/IntroSlider/BG1.png')}>
                <Image style={styles.imageView} source={require('../../assets/IntroSlider/Intro3.png')}></Image>
                <View style={{ marginHorizontal: 20 }}>
                    <Text style={styles.titleText}>At your doorstep</Text>
                    <Text style={styles.IntroDescp}>
                        <Text>Butler will be there
                            <Text style={{ fontWeight: 'bold' }}> at your doorsteps. </Text>
                            We are just a click away.
                        </Text>
                    </Text>
                    <Image style={styles.crousalWidth} source={require('../../assets/IntroSlider/Carousal3.png')}></Image>
                </View>
                <View style={styles.btnsViewContainer}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => navigation.navigate('LoginRegister')}>
                        <Text style={{ color: '#fff',fontWeight:'800'}}>Get Started</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
}

export default GetStarted;

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
        elevation:10,
        shadowColor:'#572D8E',
        shadowRadius:12,
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
    btnsViewContainer:{
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        position: 'absolute',
        bottom:'10%'
    }
})