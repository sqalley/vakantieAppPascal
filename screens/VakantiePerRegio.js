import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect,} from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  useWindowDimensions,  
  ScrollView,
  Image, 
} from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import SelectDropdown from 'react-native-select-dropdown';
import { DataTable } from 'react-native-paper';
import CountDown from 'react-native-countdown-component';
import axios from 'axios'


const VakantiePerRegioScreen = ({navigation,route}) =>
{
  const window = useWindowDimensions();



  const [message, setMessage] = useState("");
  //herfstvakantie
  const [berichtHerfst, setBerichtHerfst] = useState("");
  const [berichtStartDatumHerfst, setBerichtStartDatumHerfst] = useState("");
  const [BerichtEindDatumHerfst, setBerichtEindDatumHerfst] = useState("");
  //kerstvakantie
  const [berichtKerst, setBerichtKerst] = useState("");
  const [berichtStartDatumKerst, setBerichtStartDatumKerst] = useState("");
  const [berichtEindDatumKerst, setBerichtEindDatumKerst] = useState("");
  //voorjaarsvakantie
  const [berichtVoorjaars, setBerichtVoorjaars] = useState("");
  const [berichtStartDatumVoorjaars, setBerichtStartDatumVoorjaars] = useState("");
  const [berichtEindDatumVoorjaars, setBerichtEindDatumVoorjaars] = useState("");
  //meivakantie
  const [berichtMei, setBerichtMei] = useState("");
  const [berichtStartDatumMei, setBerichtStartDatumMei] = useState("");
  const [berichtEindDatumMei, setBerichtEindDatumMei] = useState("");
  //zomervakantie
  const [berichtZomer, setBerichtZomer] = useState("");
  const [berichtStartDatumZomer, setBerichtStartDatumZomer] = useState("");
  const [berichtEindDatumZomer, setBerichtEindDatumZomer] = useState("");

  const [coords, setCoords] = useState({ });
  const [showMap, setShowMap] =useState(false);
  const [vakanties, SetVakanties] =useState([]);
  //counter naar volgende vakantie
  const [vakantieCounter, setVakantieCounter] = useState([]);
  const [Available, SetAvailable] = useState(false);
  

  useEffect(() => {
    GetGeoLocation();
    GetHolidayData();
    //GetVakantieCounter();
  },[]);

  // function GetVakantieCounter() {
  //     axios
  //     .get(
  //       "https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/2021-2022?output=json"
  //     )
  //     .then((res) => {
  //       const data = {};
  //       let dataSet = false;
  //       res.data.content[0].vacations.forEach((element) => {
  //         let ans = calculateDays(element.regions[0].startdate);
  //         if (dataSet) {
  //           return;
  //         }
  //         if (ans <= 0) {
  //           return;
  //         }
  //         data.type = element.type;
  //         data.regions = element.regions;
  //         data.daysToGo = ans;
  //         dataSet = true;
  //       });
  //       console.log(data);
  //       setVakantieCounter(data)
  //       SetAvailable(true);
  //     });
  // }
  //console.log(vakantieCounter);
  
  const GetHolidayData= async () => {

  
        const URL = 'https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/2021-2022?output=json'
        fetch(URL)
        .then((response) => response.json())
        .then((responseJson) => {
        const content = responseJson.content[0].vacations;
        SetVakanties(content);
        //console.log(data);


        })
        .catch(err => console.log(err));

    }

    // function calculateDays(date) {
    //   const MsPerDay = 1000 * 3600 * 24;
    //   const date1 = new Date();
    //   const date2 = new Date(date);
    //   return Math.floor((date2 - date1) / MsPerDay);
    // }

    const GetGeoLocation = async () =>
    {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted')
          {
              setMessage('Geen toestemming tot locatie gegeven');
              return;
          }
  
           let location = await Location.getCurrentPositionAsync({});
      
          setCoords(location.coords);

          SetAvailable(true);
    }
    

    const optiesRegio = ["Regio Noord", "Regio Midden", "Regio Zuid"]


  return  <ScrollView style={styles.container}>

              <Image source={require('../assets/achtergrond.jpg')} style={styles.backgroundImage} />

              <View style={styles.dropDown}>
                <SelectDropdown
                  searchPlaceholder="Search"
                  labelField="label"
                  data={optiesRegio}
                  onSelect={(selectedItem, index) => {
                    
                    //welke
                   if (selectedItem =="Regio Noord" )
                   {
                    //setBerichtZomer('zomer' + " " + vakanties[4].regions[0].startdate + " " + "Kerst vakantie" + vakanties[1].regions[0].startdate);
                    setBerichtHerfst('Herfst vakantie' + " ");
                    setBerichtStartDatumHerfst(new Date(vakanties[0].regions[0].startdate));
                    setBerichtEindDatumHerfst(new Date(vakanties[0].regions[0].enddate));

                    setBerichtKerst('Kerst vakantie' + " ");
                    setBerichtStartDatumKerst(new Date(vakanties[1].regions[0].startdate));
                    setBerichtEindDatumKerst(new Date(vakanties[1].regions[0].enddate));

                    setBerichtVoorjaars('Voorjaars vakantie' + " ");
                    setBerichtStartDatumVoorjaars(new Date(vakanties[2].regions[0].startdate));
                    setBerichtEindDatumVoorjaars(new Date(vakanties[2].regions[0].enddate));

                    setBerichtMei('Mei vakantie' + " ");
                    setBerichtStartDatumMei(new Date(vakanties[3].regions[0].startdate));
                    setBerichtEindDatumMei(new Date(vakanties[3].regions[0].enddate));

                    setBerichtZomer('Zomer vakantie' + " ");
                    setBerichtStartDatumZomer(new Date(vakanties[4].regions[0].startdate));
                    setBerichtEindDatumZomer(new Date(vakanties[4].regions[0].enddate));

                    setCoords({latitude :52.3873878, longitude : 4.6462194} );
                   }
                   if (selectedItem =="Regio Midden" )
                   {
                    setBerichtHerfst('Herfst vakantie' + " ");
                    setBerichtStartDatumHerfst(new Date(vakanties[0].regions[1].startdate));
                    setBerichtEindDatumHerfst(new Date(vakanties[0].regions[1].enddate));

                    setBerichtKerst('Kerst vakantie' + " ");
                    setBerichtStartDatumKerst(new Date(vakanties[1].regions[0].startdate));
                    setBerichtEindDatumKerst(new Date(vakanties[1].regions[0].enddate));

                    setBerichtVoorjaars('Voorjaars vakantie' + " ");
                    setBerichtStartDatumVoorjaars(new Date(vakanties[2].regions[1].startdate));
                    setBerichtEindDatumVoorjaars(new Date(vakanties[2].regions[1].enddate));

                    setBerichtMei('Mei vakantie' + " ");
                    setBerichtStartDatumMei(new Date(vakanties[3].regions[0].startdate));
                    setBerichtEindDatumMei(new Date(vakanties[3].regions[0].enddate));

                    setBerichtZomer('Zomer vakantie' + " ");
                    setBerichtStartDatumZomer(new Date(vakanties[4].regions[1].startdate));
                    setBerichtEindDatumZomer(new Date(vakanties[4].regions[1].enddate));

                    
                    setCoords({latitude :52.092876, longitude : 5.104480} );
                   }
                   if (selectedItem =="Regio Zuid" )
                   {
                    setBerichtHerfst('Herfst vakantie' + " ");
                    console.log(vakanties[0].regions[2].startdate);
                    setBerichtStartDatumHerfst(new Date(vakanties[0].regions[2].startdate));
                    setBerichtEindDatumHerfst(new Date(vakanties[0].regions[2].enddate));

                    setBerichtKerst('Kerst vakantie' + " ");
                    setBerichtStartDatumKerst(new Date(vakanties[1].regions[0].startdate));
                    setBerichtEindDatumKerst(new Date(vakanties[1].regions[0].enddate));

                    setBerichtVoorjaars('Voorjaars vakantie' + " ");
                    setBerichtStartDatumVoorjaars(new Date(vakanties[2].regions[2].startdate));
                    setBerichtEindDatumVoorjaars(new Date(vakanties[2].regions[2].enddate));

                    setBerichtMei('Mei vakantie' + " ");
                    setBerichtStartDatumMei(new Date(vakanties[3].regions[0].startdate));
                    setBerichtEindDatumMei(new Date(vakanties[3].regions[0].enddate));

                    setBerichtZomer('Zomer vakantie' + " ");
                    setBerichtStartDatumZomer(new Date(vakanties[4].regions[2].startdate));
                    setBerichtEindDatumZomer(new Date(vakanties[4].regions[2].enddate));

                    setCoords({latitude :	52.078663, longitude : 4.288788} );
                   }
    

                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem
                  }}
                  rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown

                    return item
                  }}
                />
              </View>

              {/* <View>
                {Available ? (
                <CountDown
                  until={60 * 60 * 24 * (vakantieCounter.daysToGo + 1)}
                  timeToShow={["D", "H"]}
                  timeLabels={{d: "Dagen", h: "uren"}}
                  onFinish={() => alert('finished')}
                  onPress={() => alert('hello')}
                  digitStyle={{ backgroundColor: "red"}}
                  digitTxtStyle={{ color: "#fff"}}
                  size={20}
                />
                ) : (
                  <Text>no</Text>
                )}

              </View> */}
          
              <View style={styles.berichtContainer}>  
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title style={styles.TitleEind}>Vakantie</DataTable.Title>
                    <DataTable.Title style={styles.TitleBegin}>Begin datum</DataTable.Title>
                    <DataTable.Title style={styles.TitleEind}>Eind datum</DataTable.Title>
                  </DataTable.Header>
                  <DataTable.Row>
                    <DataTable.Cell style={styles.TitleEind} >{berichtHerfst != ""? berichtHerfst: "Selecteer"}</DataTable.Cell>
                    <DataTable.Cell style={styles.TitleBegin}>{berichtStartDatumHerfst != ""? berichtStartDatumHerfst.toLocaleDateString(): "Een"}</DataTable.Cell>
                    <DataTable.Cell style={styles.TitleEind}>{BerichtEindDatumHerfst != ""? BerichtEindDatumHerfst.toLocaleDateString(): "regio"}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell style={styles.TitleEind}>{berichtKerst} </DataTable.Cell>
                    <DataTable.Cell style={styles.TitleBegin}>{berichtStartDatumKerst != ""? berichtStartDatumKerst.toLocaleDateString(): ""}</DataTable.Cell>
                    <DataTable.Cell style={styles.TitleEind}>{berichtEindDatumKerst != ""? berichtEindDatumKerst.toLocaleDateString(): ""}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell style={styles.TitleEind}>{berichtVoorjaars} </DataTable.Cell>
                    <DataTable.Cell style={styles.TitleBegin}>{berichtStartDatumVoorjaars != ""? berichtStartDatumVoorjaars.toLocaleDateString(): ""}</DataTable.Cell>
                    <DataTable.Cell style={styles.TitleEind}>{berichtEindDatumVoorjaars != ""? berichtEindDatumVoorjaars.toLocaleDateString(): ""}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell style={styles.TitleEind}>{berichtMei} </DataTable.Cell>
                    <DataTable.Cell style={styles.TitleBegin}>{berichtStartDatumMei != ""? berichtStartDatumMei.toLocaleDateString(): ""}</DataTable.Cell>
                    <DataTable.Cell style={styles.TitleEind}>{berichtEindDatumMei != ""? berichtEindDatumMei.toLocaleDateString(): ""}</DataTable.Cell>
                  </DataTable.Row>
                  <DataTable.Row>
                    <DataTable.Cell style={styles.TitleEind}>{berichtZomer}</DataTable.Cell>
                    <DataTable.Cell style={styles.TitleBegin}> {berichtStartDatumZomer != ""? berichtStartDatumZomer.toLocaleDateString(): "Huidige locatie"}</DataTable.Cell>
                    <DataTable.Cell style={styles.TitleEind}>{berichtEindDatumZomer != ""? berichtEindDatumZomer.toLocaleDateString(): ""}</DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
                
              </View>


            {/* <TouchableHighlight onPress={GetGeoLocation}><Text>Haal de huidige locatie op</Text></TouchableHighlight> */}
              <Text>{message}</Text>
              {Available ? (
                <MapView
                  style={styles.map}
                  region={{
                    //coords
                    latitude: coords.latitude,
                    longitude: coords.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                  }}>
                    <Marker
                    draggable
                    coordinate={coords}
                    pinColor='blue'
                    />
                  </MapView>
                 ) : (
                  <Text style={styles.LoadMapMsg}>Even wachten tot de huidige locatie word opgehaald, dit kan tot 5 seconden duren!</Text>
                )}
                        
              <StatusBar style="auto" />
              
           </ScrollView>;
}

export default VakantiePerRegioScreen;



const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: 'stretch',
    },
    LoadMapMsg: {
      color: 'white',
      textAlign: 'center',
    },
    TitleBegin: {
      justifyContent: 'center',
    },
    TitleEind: {
      justifyContent: 'center',
    },
    backgroundImage: {
      flex: 1,
      zIndex: 0,
      position: 'absolute',
      width: '100%',
      height: '110%',
    },
    berichtContainer:{
      marginTop: 20,
      //color: '#FFFFFF',
      backgroundColor: 'rgba(255,255,255,0.1)',
      borderRadius: 10,
    },
    dropDown:{
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 50,
    },
    bericht: {
      height: 50,
      alignSelf: 'stretch',
      fontSize: 15,
      borderWidth: 2,
      borderColor: "gray",
    },
    map:{
      alignSelf: 'stretch',
      width: window.width,
      height: 250,
      borderWidth: 1,
    borderColor: '#DCDCDC',
      borderRadius: 10
    }
  });