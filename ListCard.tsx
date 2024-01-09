import React from 'react'
import { ScreenHeight } from '@rneui/base'
import { StyleSheet, Text, Image, ImageBackground, View, Button, TouchableOpacity} from 'react-native'
import { useLocationContext } from './Global/LocationContext'
import StarRating from './StarRating'
import Config from "react-native-config";
import {API_KEY} from '@env'



function ListCard({id,info, navigation}): JSX.Element {
  const {markerList, setMarkerList} = useLocationContext()

  const photoRef = info.photos[0].photo_reference;
  const apiKey = API_KEY;
  const photoUrl = 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=' 
                    + photoRef + '&key=' + apiKey;
  const image = {uri: photoUrl};
  
  function handleRemove(id) {
    const newMarkerList = markerList.filter((item) => item.info.place_id !== id);
    setMarkerList(newMarkerList)
  }


  return(
    <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
      <View style={styles.card}>
        {/* <Image
          style={styles.photoBanner}
          source={{
            uri: photoUrl,
          }}
        /> */}
        <ImageBackground source={image} resizeMode="cover" imageStyle={styles.photoBanner}>
          <Text style={styles.bannerText}>{info.name}</Text>
          <Text>Price Level: {info.price_level}</Text>
          <Text>Rating: {info.rating}</Text>
        </ImageBackground>
        <StarRating rating = {info.rating}/>
        <Button
          title='Delete'
          onPress={()=>handleRemove(info.place_id)}
          />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20, 
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height : 1},
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2, 
    marginHorizontal: 10,
    marginVertical: 10,
    height: 0.20 * ScreenHeight,
    // position: 'absolute',
    // bottom: 125,
    // right: 125
  },
  photoBanner: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow:'hidden',
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',

  },
  bannerText: {
    color: 'white',
    fontFamily: 'CourierNewPS-BoldMT',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 10,
  },
})


export default ListCard;