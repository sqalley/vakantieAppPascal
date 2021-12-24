import React, {} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import AboutUsScreen from './screens/AboutUs';
import AlleVakantiesScreen from './screens/AlleVakanties';
import VakantiePerRegioScreen from './screens/VakantiePerRegio';
import WeerScreen from './screens/Weer';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();


export default function App() {

  return (
    <NavigationContainer>
       <Tab.Navigator>
         <Tab.Screen name="Alle vakanties" component={AlleVakantiesScreen}  options={{
            tabBarLabel: "Alle vakanties",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="palm-tree"
                color={color}
                size={26}
              />
            ),
          }}/>
         <Tab.Screen name="Vakantie per regio" component={VakantiePerRegioScreen} options={{
            tabBarLabel: "Vakantie per regio",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="map"
                color={color}
                size={26}
              />
            ),
          }}/>
         <Tab.Screen name="Weer" component={WeerScreen} options={{
            tabBarLabel: "Weer",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="weather-cloudy"
                color={color}
                size={26}
              />
            ),
          }}/>
        <Tab.Screen name="About me" component={AboutUsScreen} options={{
            tabBarLabel: "About me",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account-child-outline"
                color={color}
                size={26}
              />
            ),
          }}/>
      </Tab.Navigator>
      </NavigationContainer>
  );
}

