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
import CountDown from 'react-native-countdown-component';
import axios from 'axios'





const AlleVakantiesScreen = () =>
{
    const window = useWindowDimensions();

    //herfstvakantie
    const [StartDatumHerfstNoord, setStartDatumHerfstNoord] = useState("");
    const [StartDatumHerfstMidden, setStartDatumHerfstMidden] = useState("");
    const [StartDatumHerfstZuid, setStartDatumHerfstZuid] = useState("");
    //kerstvakantie
    const [StartDatumKerstNoord, setStartDatumKerstNoord] = useState("");
    const [StartDatumKerstMidden, setStartDatumKerstMidden] = useState("");
    const [StartDatumKerstZuid, setStartDatumKerstZuid] = useState("");
    //Voorjaarsvakantie
    const [StartDatumVoorjaarsNoord, setStartDatumVoorjaarsNoord] = useState("");
    const [StartDatumVoorjaarsMidden, setStartDatumVoorjaarsMidden] = useState("");
    const [StartDatumVoorjaarsZuid, setStartDatumVoorjaarsZuid] = useState("");
    //Meivakantie
    const [StartDatumMeiNoord, setStartDatumMeiNoord] = useState("");
    const [StartDatumMeiMidden, setStartDatumMeiMidden] = useState("");
    const [StartDatumMeiZuid, setStartDatumMeiZuid] = useState("");
    //Zomervakantie
    const [StartDatumZomerNoord, setStartDatumZomerNoord] = useState("");
    const [StartDatumZomerMidden, setStartDatumZomerMidden] = useState("");
    const [StartDatumZomerZuid, setStartDatumZomerZuid] = useState("");

    const [vakanties, SetVakanties] =useState([]);

    const [vakantieCounter, setVakantieCounter] = useState([]);
    const [Available, SetAvailable] = useState(false);
  

    useEffect(() => {
      GetHolidayData();
      GetVakantieCounter();
    },[]);


    function GetVakantieCounter() {
      axios
      .get(
        "https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/2021-2022?output=json"
      )
      .then((res) => {
        const data = {};
        let dataSet = false;
        res.data.content[0].vacations.forEach((element) => {
          let ans = calculateDays(element.regions[0].startdate);
          if (dataSet) {
            return;
          }
          if (ans <= 0) {
            return;
          }
          data.type = element.type;
          data.regions = element.regions;
          data.daysToGo = ans;
          dataSet = true;
        });
        console.log(data);
        setVakantieCounter(data)
        SetAvailable(true);
      });
  }
  //console.log(vakantieCounter);

  function calculateDays(date) {
    const MsPerDay = 1000 * 3600 * 24;
    const date1 = new Date();
    const date2 = new Date(date);
    return Math.floor((date2 - date1) / MsPerDay);
  }
  
   
    
    function GetHolidayData() {
  
          const URL = 'https://opendata.rijksoverheid.nl/v1/sources/rijksoverheid/infotypes/schoolholidays/schoolyear/2021-2022?output=json'
          fetch(URL)
          .then((response) => response.json())
          .then((responseJson) => {
          //console.log(responseJson);
          //console.log(responseJson.content);
          const content = responseJson.content[0].vacations;
              SetVakanties(content);

              //herfst
              setStartDatumHerfstNoord(new Date(vakanties[0].regions[0].startdate).toLocaleDateString());
              setStartDatumHerfstMidden(new Date(vakanties[0].regions[1].startdate).toLocaleDateString());
              setStartDatumHerfstZuid(new Date(vakanties[0].regions[2].startdate).toLocaleDateString());
              //kerst
              setStartDatumKerstNoord(new Date(vakanties[1].regions[0].startdate).toLocaleDateString());
              setStartDatumKerstMidden(new Date(vakanties[1].regions[0].startdate).toLocaleDateString());
              setStartDatumKerstZuid(new Date(vakanties[1].regions[0].startdate).toLocaleDateString());
              //voorjaars
              setStartDatumVoorjaarsNoord(new Date(vakanties[2].regions[0].startdate).toLocaleDateString());
              setStartDatumVoorjaarsMidden(new Date(vakanties[2].regions[1].startdate).toLocaleDateString());
              setStartDatumVoorjaarsZuid(new Date(vakanties[2].regions[2].startdate).toLocaleDateString());
              //Mei
              setStartDatumMeiNoord(new Date(vakanties[3].regions[0].startdate).toLocaleDateString());
              setStartDatumMeiMidden(new Date(vakanties[3].regions[0].startdate).toLocaleDateString());
              setStartDatumMeiZuid(new Date(vakanties[3].regions[0].startdate).toLocaleDateString());
              //Zomer
              setStartDatumZomerNoord(new Date(vakanties[4].regions[0].startdate).toLocaleDateString());
              setStartDatumZomerMidden(new Date(vakanties[4].regions[1].startdate).toLocaleDateString());
              setStartDatumZomerZuid(new Date(vakanties[4].regions[2].startdate).toLocaleDateString());

              SetAvailable(true);
          })
          .catch(err => console.log(err));
  
      }

  return    <ScrollView style={styles.container}>  
  
                <Image source={require('../assets/achtergrond.jpg')} style={styles.backgroundImage} />

                <View>
                {Available ? (
                        <DataTable>
                                <DataTable.Header style={styles.table}>
                                  <DataTable.Title><Text></Text></DataTable.Title>
                                  <DataTable.Title><Text>Regio noord</Text></DataTable.Title>
                                  <DataTable.Title><Text>Regio midden</Text></DataTable.Title>
                                  <DataTable.Title><Text>Regio zuid</Text></DataTable.Title>
                                </DataTable.Header>
                                <DataTable.Row style={styles.tableRow}>
                                  <DataTable.Cell><Text>Herfst</Text></DataTable.Cell>
                                  <DataTable.Cell>{StartDatumHerfstNoord}</DataTable.Cell>
                                  <DataTable.Cell>{StartDatumHerfstMidden }</DataTable.Cell>
                                  <DataTable.Cell>{StartDatumHerfstZuid }</DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row style={styles.tableRow}>
                                  <DataTable.Cell><Text>Kerst</Text></DataTable.Cell>
                                  <DataTable.Cell>{StartDatumKerstNoord }</DataTable.Cell>
                                  <DataTable.Cell>{StartDatumKerstMidden }</DataTable.Cell>
                                  <DataTable.Cell>{StartDatumKerstZuid }</DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row style={styles.tableRow}>
                                  <DataTable.Cell><Text>Voorjaars</Text></DataTable.Cell>
                                  <DataTable.Cell>{StartDatumVoorjaarsNoord }</DataTable.Cell>
                                  <DataTable.Cell>{StartDatumVoorjaarsMidden }</DataTable.Cell>
                                  <DataTable.Cell>{StartDatumVoorjaarsZuid }</DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row style={styles.tableRow}>
                                  <DataTable.Cell><Text>Mei</Text></DataTable.Cell>
                                  <DataTable.Cell>{StartDatumMeiNoord }</DataTable.Cell>
                                  <DataTable.Cell>{StartDatumMeiMidden }</DataTable.Cell>
                                  <DataTable.Cell>{StartDatumMeiZuid }</DataTable.Cell>
                                </DataTable.Row>
                                <DataTable.Row style={styles.tableRow}>
                                  <DataTable.Cell><Text>Zomer</Text></DataTable.Cell>
                                  <DataTable.Cell>{StartDatumZomerNoord }</DataTable.Cell>
                                  <DataTable.Cell>{StartDatumZomerMidden }</DataTable.Cell>
                                  <DataTable.Cell>{StartDatumZomerZuid }</DataTable.Cell>
                                </DataTable.Row>
                        </DataTable>
                  ) : (
                  <Text>Geen tijden beschikbaar</Text>
                )}
                  </View>

                <View style={styles.countdown}>
                  <Text style={styles.TijdText}>Tijd tot de eerstvolgende vakantie</Text>
                  {Available ? (
                    <CountDown
                      until={60 * 60 * 24 * (vakantieCounter.daysToGo + 1)}
                      timeToShow={["D", "H"]}
                      timeLabels={{d: "Dagen", h: "uren"}}
                      onFinish={() => alert('De vakantie is officieel begonnen!')}
                      onPress={() => alert('Nog even wachten!')}
                      digitStyle={{ backgroundColor: "gray"}}
                      digitTxtStyle={{ color: "black"}}
                      size={20}
                    />
                  ) : (
                    <Text>Geen tijden beschikbaar</Text>
                  )}
                </View>

              </ScrollView>
          
}

export default AlleVakantiesScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    
  },
  countdown: {
    marginTop: 30,
  },
  TijdText: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 5,
  },
  h1: {
    textAlign: 'center',
    marginTop: 50,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  table: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginTop: 30,
  },
  tableRow: {
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  backgroundImage: {
    flex: 1,
    zIndex: 0,
    position: 'absolute',
    width: '100%',
    height: '250%',
  },
})