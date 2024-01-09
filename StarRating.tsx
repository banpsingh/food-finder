import React from 'react';
import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import {  Rating } from 'react-native-ratings';




const StarRating = ({rating}) => {
  return (
    <View style={styles.container}>

          <Rating
            type="star"
            startingValue={rating}
            imageSize={20}
            readonly
            style={styles.rating}/>
          <Text>{rating}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    width:'50%',
  },

  rating: {
    // paddingVertical: 10,

  },
});

export default StarRating;