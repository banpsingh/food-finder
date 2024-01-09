import React, {useState, useEffect, useContext} from 'react';
import MapView, { Callout, CalloutSubview, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { GooglePlaceDetail, GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import {API_KEY} from '@env';
import {useLocationContext } from './Global/LocationContext';
import Card from './MapCard'
import {
  Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';



const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
 });


function MapScreen({navigation}): JSX.Element {
  const [region, setRegion] = useState({
    latitude: .78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  })
  const [currentRegionDetails, setCurrentRegionDetails] = useState<any>(null)
  // const [markerList, setMarkerList] = useState<any[]>([])
  const [showCard, setShowCard] = useState(false)
  const {markerList, setMarkerList} = useLocationContext()
  // const {markerList, setMarkerList} = useContext(LocationContext)

  

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setRegion({
          latitude : latitude,
          longitude: longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      error => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const mapMarkers = () => {
    return markerList.map((item) => 
      <Marker 
      coordinate={{
        latitude: item.info.geometry.location.lat,
        longitude: item.info.geometry.location.lng,
      }} 
      key = {item.info.place_id}
      >
        <Callout>
          <Text>
            {item.info.name}
          </Text>
            
        </Callout>
      </Marker>
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={styles.container}> */}

      <GooglePlacesAutocomplete
      placeholder='Search'
      fetchDetails={true}
      GooglePlacesSearchQuery={{
        rankby: 'distance',
        type: 'restaurant',
      }}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        setRegion({
          latitude: details == null ? region.latitude : details?.geometry.location.lat,
          longitude: details == null ? region.longitude : details?.geometry.location.lng,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        })
        setCurrentRegionDetails(details)
        setShowCard(true)
        
      }}
      query={{
        key: API_KEY,
        language: 'en',
        components: 'country:us',
        location: `${region.latitude}, ${region.longitude}`
      }}

      styles={{
        container: {
          flex: 1,
          zIndex: 1,
          width: '90%',
  
        },
        textInputContainer: {
          flexDirection: 'row',
        },
        textInput: {
          height: 38,
          width: 50,
          color: '#5d5d5d',
          fontSize: 16,
        },
        predefinedPlacesDescription: {
          color: '#1faadb',
        },
      }}
    />
    
     <MapView
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={region}
       zoomEnabled={true}
       showsUserLocation={true}
     >
      <Marker coordinate={{
        latitude: region.latitude,
        longitude: region.longitude,
      }}>
        <Callout >
          <View>
          <Text>{currentRegionDetails == null ? 'I here' : currentRegionDetails.name}</Text>
         </View>
        </Callout>
      </Marker>
      
      {mapMarkers()}
     
     </MapView>
     
     { showCard ? <Card 
      currentRegionDetails = {currentRegionDetails} 
      markerList = {markerList}
      setMarkerList = {setMarkerList}
      ></Card> : null}

      <View 
        style={{
          height: 100,
          width: 100,
          backgroundColor: '#fff',
          position: 'absolute',
          top: 50,
          right: 10
        }} >
          <Button
            title="Go to List"
            onPress={() => navigation.navigate('List')}
          />
      </View>
   {/* </View> */}
    </SafeAreaView>
  );
}



export default MapScreen;
