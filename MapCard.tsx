import React from 'react'
import { StyleSheet, Text, View, Button, Alert} from 'react-native'
import { GooglePlaceDetail } from 'react-native-google-places-autocomplete';


function MapCard({
  markerList, 
  setMarkerList, 
  currentRegionDetails
}): JSX.Element {

  function handleAddToList(){
    console.log('button got pressed')
    const placeIdList = markerList.map((item) =>item.info.place_id)
    
    if (!placeIdList.includes(currentRegionDetails.place_id)){
      setMarkerList([
        ...markerList,
        {id: currentRegionDetails.place_id, info: currentRegionDetails}
        ])
    } else {
      Alert.alert('Location Already in List', '', [
        {text: 'OK'},
      ]);
    }
    
  }

  return(
    <View style={styles.card}>
      <Text>This is a Card</Text>
      <Text>{currentRegionDetails.name}</Text>
      <Text>Is it updating</Text>
      <Button
              title="Add to List"
              onPress={() => handleAddToList()}
          /> 
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 6, 
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height : 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2, 
    marginHorizontal: 4,
    marginVertical: 10,
    position: 'absolute',
    bottom: 125,
    right: 125
  }
})

export default MapCard;