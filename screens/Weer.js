import React, {useState, useEffect,} from 'react';
import {  
  StyleSheet, 
  View, 
  useWindowDimensions, 
  ScrollView, 
  _ScrollView,
  Image,
} from 'react-native';
import { DataTable } from 'react-native-paper';
import { Text } from 'react-native-elements';




const WeerScreen = () =>
{
    const window = useWindowDimensions();
    //Zwolle
    const [Zwolle, setCityNameZwolle] = useState("");
    const [TemperatuurZwolle, setTemperatuurZwolle] = useState("");
    const [BewolkingZwolle, setBewolkingZwolle] = useState("");
    const [WeerImgZwolle, setWeerImgZwolle] = useState("");
    //Haarlem
    const [TemperatuurHaarlem, setTemperatuurHaarlem] = useState("");
    const [BewolkingHaarlem, setBewolkingHaarlem] = useState("");
    const [WeerImgHaarlem, setWeerImgHaarlem] = useState("");
    //Utrecht
    const [TemperatuurUtrecht, setTemperatuurUtrecht] = useState("");
    const [BewolkingUtrecht, setBewolkingUtrecht] = useState("");
    const [WeerImgUtrecht, setWeerImgUtrecht] = useState("");
    //Den Haag
    const [TemperatuurDenHaag, setTemperatuurDenHaag] = useState("");
    const [BewolkingDenHaag, setBewolkingDenHaag] = useState("");
    const [WeerImgDenHaag, setWeerImgDenHaag] = useState("");

    useEffect(() => {
      GetWeerZwolle();
      GetWeerHaarlem();
      GetWeerUtrecht();
      GetWeerDenHaag()
    },[]);
  
   
    
    const GetWeerZwolle= async () => {
    
          const URL = 'http://api.openweathermap.org/data/2.5/forecast?q=Zwolle&appid=ea494779f8bea47fdae9fba319fed300'
          fetch(URL)
          .then((response) => response.json())
          .then((responseJson) => {

          const CityZwolle = responseJson.city.name;

          const TempZwolleKelvin = responseJson.list[0].main.temp;
          const TempZwolleCelsius = (Math.floor(TempZwolleKelvin-273) + "°C");

          const BewolkingZwolle = responseJson.list[0].weather[0].description;
          const BewolkingImageZwolle = responseJson.list[0].weather[0].icon;
          
          setCityNameZwolle(CityZwolle);
          setTemperatuurZwolle(TempZwolleCelsius);

          setBewolkingZwolle(BewolkingZwolle);
          setWeerImgZwolle(BewolkingImageZwolle);
          })
          .catch(err => console.log(err));
  
      }

    const GetWeerHaarlem= async () => {

        const URL = 'http://api.openweathermap.org/data/2.5/forecast?q=Haarlem&appid=ea494779f8bea47fdae9fba319fed300'
        fetch(URL)
        .then((response) => response.json())
        .then((responseJson) => {

        const TempHaarlemKelvin = responseJson.list[0].main.temp;
        const TempHaarlemCelsius = (Math.floor(TempHaarlemKelvin-273) + "°C");

        const BewolkingHaarlem = responseJson.list[0].weather[0].description;
        const BewolkingImageHaarlem = responseJson.list[0].weather[0].icon;
  
        setTemperatuurHaarlem(TempHaarlemCelsius);

        setBewolkingHaarlem(BewolkingHaarlem);
        setWeerImgHaarlem(BewolkingImageHaarlem);
        })
        .catch(err => console.log(err));

        }

    const GetWeerUtrecht= async () => {

        const URL = 'http://api.openweathermap.org/data/2.5/forecast?q=Utrecht&appid=ea494779f8bea47fdae9fba319fed300'
        fetch(URL)
        .then((response) => response.json())
        .then((responseJson) => {

        const TempUtrechtKelvin = responseJson.list[0].main.temp;
        const TempUtrechtCelsius = (Math.floor(TempUtrechtKelvin-273) + "°C");

        const BewolkingUtrecht = responseJson.list[0].weather[0].description;
        const BewolkingImageUtrecht = responseJson.list[0].weather[0].icon;

        setTemperatuurUtrecht(TempUtrechtCelsius);

        setBewolkingUtrecht(BewolkingUtrecht);
        setWeerImgUtrecht(BewolkingImageUtrecht);
        })
        .catch(err => console.log(err));

        }

    const GetWeerDenHaag= async () => {

        const URL = 'http://api.openweathermap.org/data/2.5/forecast?q=Den%20Haag&appid=ea494779f8bea47fdae9fba319fed300'
        fetch(URL)
        .then((response) => response.json())
        .then((responseJson) => {

        const TempDenHaagKelvin = responseJson.list[0].main.temp;
        const TempDenHaagCelsius = (Math.floor(TempDenHaagKelvin-273) + "°C");

        const BewolkingDenHaag = responseJson.list[0].weather[0].description;
        const BewolkingImageDenHaag = responseJson.list[0].weather[0].icon;
        
        setTemperatuurDenHaag(TempDenHaagCelsius);

        setBewolkingDenHaag(BewolkingDenHaag);
        setWeerImgDenHaag(BewolkingImageDenHaag);
        })
        .catch(err => console.log(err));

    }

  return    <ScrollView style={styles.container}>  
  
                <Image source={require('../assets/achtergrond.jpg')} style={styles.backgroundImage} />

                <View>
                <DataTable>
                                <DataTable.Header>
                                  <DataTable.Title><Text></Text></DataTable.Title>
                                  <DataTable.Title><Text>Temperatuur</Text></DataTable.Title>
                                  <DataTable.Title style={{flex: 2,}} ><Text>Bewolking</Text></DataTable.Title>
                                </DataTable.Header>
                                <DataTable.Row >
                                  <DataTable.Cell><Text>{Zwolle}</Text></DataTable.Cell>
                                  <DataTable.Cell><Text>{TemperatuurZwolle}</Text></DataTable.Cell>
                                  <DataTable.Cell><Text>{BewolkingZwolle}</Text></DataTable.Cell>
                                  <DataTable.Cell><Image style={styles.img} source={{ uri: 'http://openweathermap.org/img/wn/' + WeerImgZwolle + '@2x.png' }}></Image></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row >
                                  <DataTable.Cell><Text>Haarlem</Text></DataTable.Cell>
                                  <DataTable.Cell><Text>{TemperatuurHaarlem}</Text></DataTable.Cell>
                                  <DataTable.Cell><Text>{BewolkingHaarlem}</Text></DataTable.Cell>
                                  <DataTable.Cell><Image style={styles.img} source={{ uri: 'http://openweathermap.org/img/wn/' + WeerImgHaarlem + '@2x.png' }}></Image></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row >
                                  <DataTable.Cell><Text>Utrecht</Text></DataTable.Cell>
                                  <DataTable.Cell><Text>{TemperatuurUtrecht}</Text></DataTable.Cell>
                                  <DataTable.Cell><Text>{BewolkingUtrecht}</Text></DataTable.Cell>
                                  <DataTable.Cell><Image style={styles.img} source={{ uri: 'http://openweathermap.org/img/wn/' + WeerImgUtrecht + '@2x.png' }}></Image></DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row >
                                  <DataTable.Cell><Text>Den Haag</Text></DataTable.Cell>
                                  <DataTable.Cell><Text>{TemperatuurDenHaag}</Text></DataTable.Cell>
                                  <DataTable.Cell><Text>{BewolkingDenHaag}</Text></DataTable.Cell>
                                  <DataTable.Cell><Image style={styles.img} source={{ uri: 'http://openweathermap.org/img/wn/' + WeerImgDenHaag + '@2x.png' }}></Image></DataTable.Cell>
                                </DataTable.Row>
                </DataTable>
                      
                  </View>
              </ScrollView>
          
}

export default WeerScreen;


const styles = StyleSheet.create({
  container:{
        
    }, 
    img: {
        width: 50,
        height: 50,
    },
    text: {
        color:'red',
    },
  backgroundImage: {
    flex: 1,
    zIndex: 0,
    position: 'absolute',
    width: '100%',
    height: '280%',
  },
})