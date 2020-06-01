import React,{Component} from 'react';
import MapView, { Marker, Callout } from 'react-native-maps';
import {View, Text, StyleSheet, SafeAreaView, Dimensions, Alert, AsyncStorage} from 'react-native';
import Dialog from "react-native-dialog";

const mapStyle=[
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#242f3e"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#263c3f"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#6b9a76"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#38414e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#212a37"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9ca5b3"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#746855"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#1f2835"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#f3d19c"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#2f3948"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#d59563"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#515c6d"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#17263c"
      }
    ]
  }
]

export default class Map extends Component{
  
    state={
          setPromptVisible: false,
          shelters: [],
          shelterLong: -66.59,
          shelterLat: 18.22,
          shelterName: '',
          coords: [],
        }

        async componentDidMount(){
          //this.deleteData();
          var coords;
          var coordsCopy;
          this.state.coords = [];
      
          try{
            coords=await AsyncStorage.getItem('GeoInfo');
            coordsCopy=JSON.parse(coords);
            coordsCopy.forEach((element, index) => {
              this.state.coords.push(element); 
            });
          }catch(error){
            console.log('Error on componentDidMount: ' + error); 
          }
          this.setState({setPromptVisible: false});
      }

        async deleteData(){
          try{
              AsyncStorage.clear();
          }catch (error){
              console.log(error);
          }
        }

      storeData = async () => {
        //console.log('this is storeData');
        
        var response;
        var responseCopy =[];
  
        try {
          response = await AsyncStorage.getItem('GeoInfo');
          if(response == null){
            response = []
          }
          responseCopy = JSON.parse(response);      
        } catch (error) {
            console.log('error saving to async storage: ' + error);
        }
    
        responseCopy.push(
          {
            shelterName: this.state.shelterName,
            shelterLong: this.state.shelterLong,
            shelterLat: this.state.shelterLat,
          }
        );
        console.log('Push to state successful');
        try{
          await AsyncStorage.setItem('GeoInfo', JSON.stringify(responseCopy));
        }catch(error){
          console.log('error saving to async storage: ' + error);
        }

        this.componentDidMount();
      };

        makeDialogVisible = (event) =>{
        this.setState({setPromptVisible: true});
        this.setState({shelterLong: event.coordinate.longitude});
        this.setState({shelterLat: event.coordinate.latitude});
        this.setState({shelterName: ""});
        };
    
        onPress_Ok_ShelterNameDialog = () =>{
        if(this.state.shelterName !== ""){
        this.storeData();
        this.setState({setPromptVisible: false});
        }else{
          Alert.alert('No shelter name was entered.')
        }}
    
       onPress_CANCEL_ShelterNameDialog = () =>{
        this.setState({setPromptVisible: false});
           };
    
       onChangeText = userText => {
        this.setState({shelterName: userText}); 
         };
    
        handlerLongClick = (event) => {
         Alert.alert(
          "🚨WARNING🚨",
          'Do you want to create a shelter?',
          [
            { text: 'Cancel', style: 'cancel',},
            { text: 'OK' , onPress: () => this.makeDialogVisible(event)},
          ],
          { cancelable: false }
        );}

        render(){
      return(
        <SafeAreaView>
         <Dialog.Container visible={this.state.setPromptVisible}>
          <Dialog.Title>Enter the shelter's name</Dialog.Title>
          <Dialog.Input onChangeText={text => this.onChangeText(text)}></Dialog.Input>
          <Dialog.Button label="OK" onPress={this.onPress_Ok_ShelterNameDialog}/>
          <Dialog.Button label="Cancel" onPress={this.onPress_CANCEL_ShelterNameDialog}/>
        </Dialog.Container>

        <MapView 
        style={styles.mapStyle}
        onLongPress={e => this.handlerLongClick(e.nativeEvent)} 
         region={{
           latitudeDelta: 100,
           longitudeDelta: 100,
           latitude: this.state.shelterLat,
           longitude: this.state.shelterLong
        }}
        customMapStyle={mapStyle}
        >
            {
            this.state.coords.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{latitude: marker.shelterLat, longitude: marker.shelterLong}}
              >
                <Callout onPress={() => this.props.navigation.navigate('Shelter Info', {item: marker.shelterName})}>
                  <Text>{marker.shelterName}</Text>
                </Callout>
              </Marker>
            ))
          }
        </MapView>
        </SafeAreaView>
        )};
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});