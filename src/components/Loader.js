import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

function Loader() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: 1, width: '100%', height: '100%' }}>
            <ActivityIndicator style={{ position: 'absolute' }} size="large" color="#FED034"></ActivityIndicator>
        </View>

    );
}

export default Loader;