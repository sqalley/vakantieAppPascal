import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';


export default class ProfileDetail extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <ScrollView>

        <Image source={require('../assets/achtergrond.jpg')} style={styles.backgroundImage} />


        <View style={styles.container}>
          <View style={[styles.card, styles.profileCard]}> 
            <Image source={require ("../assets/avatar.jpg")}  style={styles.avatar}/>
            <Text  style={styles.name}>Pascal Palmbergen</Text>
          </View> 

          <View style={styles.card}>
            <Text style={styles.cardTittle}>Ict Skills</Text>   
            <Text> - Laravel</Text>   
            <Text> - PHP</Text>   
            <Text> - React native</Text>   
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTittle}>Hobby's</Text>   
            <Text> - Gamen</Text>   
            <Text> - Programmeren</Text>   
            <Text> - Motorracen</Text>   
          </View>

          <View style={styles.photosCard}>
            <Text style={styles.cardTittle}>foto's</Text>   
            <View style={styles.photosContainer}>
              <Image style={styles.photo} source={require ("../assets/fotos/1.jpg")} />
              <Image style={styles.photo} source={require ("../assets/fotos/2.jpg")} />
              <Image style={styles.photo} source={require ("../assets/fotos/3.jpg")} />
              <Image style={styles.photo} source={require ("../assets/fotos/4.jpg")} />
              <Image style={styles.photo} source={require ("../assets/fotos/5.jpg")} />
              <Image style={styles.photo} source={require ("../assets/fotos/6.jpg")} />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:10,
    //backgroundColor : 'rgba(52, 52, 52, 0)'
  },
  backgroundImage: {
    flex: 1,
    zIndex: 0,
    position: 'absolute',
    width: '100%',
    height: '120%',
  },
  cardTittle:{
    color:"#add8e6",
    fontSize:22,
    marginBottom:5,
  },
  avatar:{
    width:150,
    height:150,
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: 10
  },
  card:{
    backgroundColor: "#FFFFFF",
    borderRadius:10,
    padding:10,
    height:100,
    marginTop:10,
  },
  profileCard:{
    height:200,
    alignItems: 'center',
    marginTop:20,
  },
  name:{
    marginTop:10,
    fontSize:22,
    color:"#808080",
  },
  photosContainer:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 'auto',
  },
  photosCard:{
    marginTop:10,
    backgroundColor: "#FFFFFF",
    borderRadius:10,
  },
  photo:{
    width:113,
    height:113,
    marginTop:5,
    marginBottom: 5,
    marginRight:5,
    marginLeft:5,
  }
});