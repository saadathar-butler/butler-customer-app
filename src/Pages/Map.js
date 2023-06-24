import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoder';
import { Icon } from 'react-native-vector-icons/Ionicons';
import GetLocation from 'react-native-get-location'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { globalStyle } from '../../styles/globalStyles';
import Geolocation from '@react-native-community/geolocation';
function Map({ route, navigation }) {
  const { latitude, longitude } = route.params;

  const [location, setLocation] = React.useState({

    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  });
  const [getCurrentLocation, setGetCurrentLocation] = React.useState();

  React.useEffect(() => {

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      // timeout: 15000,
    })
      .then(loc => {
        setLocation({
          latitude: loc.latitude,
          longitude: loc.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        });
        console.log('location set', location);

      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
  }, [setLocation])

  console.log('currentlocation: ', location);
  Geocoder.geocodePosition({ lat: location.latitude, lng: location.longitude })
    .then(loc => {
      setGetCurrentLocation(loc[0].formattedAddress);
      let Location = JSON.stringify(getCurrentLocation);
      console.log('location stored in Async', Location);
      try {
        AsyncStorage.setItem('Location', Location);
        console.log('Async Location', Location)
      } catch (e) {
        // saving error
        console.log(e);
      }
    });
  console.log('location currently ', location);
  console.log('getCurrentlocation', getCurrentLocation)
  console.log('Navigated Location', latitude, longitude);
  return (

    <View style={styles.container}>
      <MapView

        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        showsUserLocation={true}
        initialRegion={location}
        moveOnMarkerPress={true}
      >
        <Marker
          coordinate={location}
          title={"Select Your Location"}
          draggable />
      </MapView>

      <TouchableOpacity style={[globalStyle.Theambtn, { width: '80%' }]}
        onPress={() => { navigation.navigate('AddService', { post: getCurrentLocation }) }} >
        <Text style={{ color: 'white', fontWeight: 'bold' }}>Select</Text>
      </TouchableOpacity>

    </View>
  );
}

export default Map;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    //   height: 535,
    //   width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#FED034",
    padding: 10,
    borderRadius: 100 / 2,
    marginVertical: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%'
  },
});
