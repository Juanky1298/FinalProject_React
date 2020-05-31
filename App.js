import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {Icon} from 'react-native-elements';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Map from './Map';
import Shelter from './Shelter';
import ShelterData from './ShelterData';

//https://reactnavigation.org/docs/stack-navigator
const ShelterStack = createStackNavigator();
function ShelterStackNavigator() {
  return(
    <ShelterStack.Navigator initialRouteName='Shelters' headerMode='float'>
        <ShelterStack.Screen
          name='Shelter List'
          component={Shelter}   
          />
        <ShelterStack.Screen
          name='Shelter Info'
          component={ShelterData}
          />
    </ShelterStack.Navigator>
  );
}

const MapStack = createStackNavigator();
function MapStackNavigator() {
  return(
    <MapStack.Navigator initialRouteName='Shelters' headerMode='float'>
        <MapStack.Screen
          name='Shelter Locations'
          component={Map}
          />
    </MapStack.Navigator>
  );
}

//https://reactnavigation.org/docs/material-bottom-tab-navigator
const TabNav = createMaterialBottomTabNavigator();

export default function AppContainer() {
  return(
    <NavigationContainer>
      <TabNav.Navigator
        initialRouteName='ShelterScreen'
        tabBarOptions={{
        showLabel: true,
        shifting: true,
        }}
      >
        <TabNav.Screen
          name='ShelterScreen'
          component={ShelterStackNavigator}
          options={{
          title: 'Shelters',
          tabBarLabel: 'Shelters',
          activeColor: '#f0edf6',
          inactiveColor: '#3e2465',
          barStyle:{backgroundColor: '#694fad'},
            tabBarIcon:() =>(
              <View>
                <Icon 
                name={'home'}
                size={25}
                style={{color: '#e23f5b'}}/>
              </View>
            )
          }}/>
          <TabNav.Screen
          name='Map'
          component={MapStackNavigator}
          options={{
            title: 'Map',
            tabBarLabel: 'Map',
            activeColor: '#a6cfb1',
            inactiveColor: '#d5b6a2',
            barStyle:{backgroundColor: 'tomato'},
            tabBarIcon:() =>(
              <View>
                <Icon 
                name={'map'}
                size={25}
                style={{color: '#f13ec4'}}/>
              </View>
            )
          }}/>
      </TabNav.Navigator>
    </NavigationContainer>
  );
}
