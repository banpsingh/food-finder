import React, {useState, createContext, useContext, useEffect} from "react";
import { GooglePlaceDetail } from "react-native-google-places-autocomplete";
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface Marker {
  // id : number;
  info: GooglePlaceDetail;
}

interface LocationContextValue {
  markerList : Marker[] | [];
  setMarkerList : React.Dispatch<React.SetStateAction<Marker[]>>;
}


const LocationContext = createContext<LocationContextValue | undefined>(undefined);


export const LocationProvider = ({children}) => {
  const [markerList, setMarkerList] = useState<Marker[]|[]>([]);

  // Load data from AsyncStorage on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('myDataKey');
        if (storedData) {
          setMarkerList(JSON.parse(storedData));
        }
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  // Save data to AsyncStorage whenever it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('myDataKey', JSON.stringify(markerList));
      } catch (error) {
        console.error('Error saving data:', error);
      }
    };

    saveData();
  }, [markerList]);

  return(
    <LocationContext.Provider value={{ markerList, setMarkerList}}>
      {children}
    </LocationContext.Provider>
  )
}

export const useLocationContext = () => {
  const locationContext = useContext(LocationContext);
  if (locationContext === undefined) {
    throw new Error('useLocationContext must be inside a LocationProvider');
  }
  return locationContext;
}

