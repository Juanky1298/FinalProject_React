import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {Icon} from 'react-native-elements';
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Map from './Map';
import Shelter from './Shelter';
import ShelterData from './ShelterData';
import ShelterInfo from './ShelterInfo';

const MyTheme = {
  dark: false,
  colors: {
    primary: '#f3f9d2',
    background: '#ffffff',
    card: '#f3f9d2',
    text: '#000000',
    border: '#ffffff',
  },
};

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
    <MapStack.Navigator initialRouteName='Shelter Locations' headerMode='screen'>
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

  const { colors } = useTheme();

  return(
    <NavigationContainer theme={MyTheme}>
      <TabNav.Navigator
        initialRouteName='ShelterScreen'
        tabBarOptions={{
        showLabel: true,
        shifting: true,
        activeColor: '#3d0b37' ,
        inactiveColor: {color: colors.background},
        }}
      >
        <TabNav.Screen
          name='ShelterScreen'
          component={ShelterStackNavigator}
          options={{
          title: 'Shelters',
          tabBarLabel: 'Shelters',
          activeColor: '#f0edf6' ,
          inactiveColor: {color: colors.background},
          barStyle:{backgroundColor: '#694fad'},
            tabBarIcon:() =>(
              <View>
                <Icon 
                name={'home'}
                size={25}
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
            tabBarIcon:() =>(
              <View>
                <Icon 
                name={'map'}
                size={25}
                />
              </View>
            )
          }}/>
      </TabNav.Navigator>
    </NavigationContainer>
  );
}
