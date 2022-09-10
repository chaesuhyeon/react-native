import * as Location from 'expo-location';
import { StatusBar } from "expo-status-bar";
import React,{ useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Dimensions, ActivityIndicator } from "react-native";
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window"); // Dimensions로 screen 크기 알아내기
//console.log(SCREEN_WIDTH);

const API_KEY = "ea061898b12c20566040c21a413ceeb4";
const icons ={
  Clouds :"cloudy",
  Clear : "day-sunny",
  Rain : "rains",
  Atmosphere : "cloudy-gusts",
  Snow : "snow",
  Drizzle : "rain",
  ThunderStorm : "lightning"
}

export default function App() {
  const [city, setCity] = useState("Loading....");
  const [days, setDays] = useState([]);
  const [ok, setOK] = useState(true);
  const getWeather = async() =>{
    const {granted} = await Location.requestForegroundPermissionsAsync();
    //console.log(permission) // {"android": {"accuracy": "fine", "scoped": "fine"}, "canAskAgain": true, "expires": "never", "granted": true, "status": "granted"}
    if(!granted){
      setOK(false);
    }

    const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});
    //console.log(location);
    //console.log(location[0].city)

    setCity(location[0].city)
    const response = await fetch(
       `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=c4df86adda4a8c9682507993770fa28f&units=metric`
      //`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}`
      );
    const json = await response.json();
    console.log(json)
    //console.log(json.daily);
   setDays(json.daily);

  };

  useEffect(()=>{
    getWeather();
  },[]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
        <View style={{... styles.day , alignItems:"center"}}>
          <ActivityIndicator 
            color="white" 
            size="large" 
            style={{marginTop:10}}/>
        </View>
        ) : (
          days.map((day, index) =>
          <View key={index} style={styles.day}>
              <View style={{
                flexDirection:"row", 
                alignItems:"center",
                width:"100%",
                justifyContent:"space-between"
                }}>
                <Text style={styles.temp}>
                  {parseFloat(day.temp.day).toFixed(1)}
                </Text>
                <Fontisto name={icons[day.weather[0].main]} size={68} color="black" />
              </View>
          <Text style={styles.description}>{day.weather[0].main}</Text>
          <Text style={styles.tinyText}>{day.weather[0].description}</Text>
          </View>
          )
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFD400",
  },

  city: {
    flex: 1.2,
    justifyContent: "center",
    alignItems: "center",
  },

  cityName: {
    fontSize: 68,
    fontWeight: "500",
  },

  weather: {},

  day: {
    width: SCREEN_WIDTH,
    //alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontWeight: "600",
    fontSize: 100,
  },
  description: {
    marginTop: -30,
    fontSize: 30,
  },
  tinyText :{
    fontSize:15,
  }
});
