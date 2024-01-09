import { ScreenHeight } from '@rneui/base'
import { SearchBar } from '@rneui/themed';
import React, {useState} from 'react'
import { StyleSheet, FlatList, View, SafeAreaView, ScrollView} from 'react-native'
import { Marker, useLocationContext } from './Global/LocationContext'
import ListCard from './ListCard'




function ListScreen({navigation}): JSX.Element {
  const {markerList, setMarkerList} = useLocationContext()

  console.log(markerList)

  // const listMarkers = () => {
  //   return markerList.map((item) => 
  //     <ListCard 
  //       key = {item.info.place_id}
  //       id = {item.info.place_id}
  //       info = {item.info}
  //       navigation ={navigation}/>
  //   )
  // }

  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  const renderList = markerList.filter((item) => (item.info.name.toUpperCase().includes(search.toUpperCase().trim().replace(/\s/g, ""))));


  const renderItem = ({item}) => {
    // when no input, show all
    // if (search === "") {
    //   return <ListCard 
    //             key = {item.info.place_id}
    //             id = {item.info.place_id}
    //             info = {item.info}
    //             navigation ={navigation}/>;
    // }
    // // filter of the name
    // if (item.info.name.toUpperCase().includes(search.toUpperCase().trim().replace(/\s/g, ""))) {
    //   return <ListCard 
    //             key = {item.info.place_id}
    //             id = {item.info.place_id}
    //             info = {item.info}
    //             navigation ={navigation}/>;
    // }
    return <ListCard 
                key = {item.info.place_id}
                id = {item.info.place_id}
                info = {item.info}
                navigation ={navigation}/>;
  };

  return(
    <SafeAreaView style={styles.container}>
      {/* <ScrollView>
    
        {listMarkers()}
        </ScrollView> */}
        <SearchBar
          placeholder="Type Here..."
          onChangeText={updateSearch}
          value={search}/>
          
        <FlatList
          data={renderList}
          renderItem={renderItem}
          keyExtractor={item => item.info.place_id}
        />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    height:'100%',
  },
});

export default ListScreen;