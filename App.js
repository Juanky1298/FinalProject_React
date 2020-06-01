import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {Icon} from 'react-native-elements';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Map from './Map';
import Shelter from './Shelter';
import ShelterData from './ShelterData';
import ShelterInfo from './ShelterInfo';

//https://reactnavigation.org/docs/stack-navigator
const ShelterStack = createStackNavigator();
function ShelterStackNavigator() {
  return(
    <ShelterStack.Navigator initialRouteName='Shelter List' headerMode='float'>
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
    <MapStack.Navigator initialRouteName='Shelter Locations' headerMode='float'>
        <MapStack.Screen
          name='Shelter Locations'
          component={Map}
          />
          <MapStack.Screen
          name='Shelter Info'
          component={ShelterInfo}
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
        activeColor: '#3d0b37' ,
        inactiveColor: '#63264a',
        barStyle:{backgroundColor: '#ffffff'},
        }}
      >
        <TabNav.Screen
          name='ShelterScreen'
          component={ShelterStackNavigator}
          options={{
          title: 'Shelters',
          tabBarLabel: 'Shelters',
          // activeColor: '#f0edf6' ,
          // inactiveColor: '#3e2465',
          // barStyle:{backgroundColor: '#694fad'},
            tabBarIcon:() =>(
              <View>
                <Icon 
                name={'home'}
                size={25}
                // style={{color: '#e23f5b'}}
                />
              </View>
            )
          }}/>
          <TabNav.Screen
          name='Map'
          component={MapStackNavigator}
          options={{
            title: 'Map',
            tabBarLabel: 'Map',
            // activeColor: '#a6cfb1',
            // inactiveColor: '#d5b6a2',
            // barStyle:{backgroundColor: '#c0d684'},
            tabBarIcon:() =>(
              <View>
                <Icon 
                name={'map'}
                size={25}
                // style={{color: '#f13ec4'}}
                />
              </View>
            )
          }}/>
      </TabNav.Navigator>
    </NavigationContainer>
  );
}
