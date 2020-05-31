import React,{Component} from 'react';
import {StyleSheet, View, Text, SafeAreaView, Button, FlatList, AsyncStorage, RefreshControl, Alert, TouchableOpacity} from 'react-native';
import Dialog from "react-native-dialog";
import Constants from 'expo-constants';

export default class ShelterData extends Component{

  constructor(props){
    super(props);
  }

    state={
        DATA: ['Water','Food','Clothes'],
        shelters: [],
        setPromptVisible: false,
        colors: ['#ff0000','#ffff00','#00ff00'],
        i1: 0,
        i2: 0,
        i3: 0,
        buttonDisabled: false
    }

        itemStatus1 = () => {
            var x = this.state.i1;
        if(x >= 2){
          x = 0;
          this.setState({i1: x});
        }else{
          x = x + 1;
          this.setState({i1: x});
          console.log(this.state.i1);
        }}

        itemStatus2 = () => {
        var x = this.state.i2;
        if(x >= 2){
        x = 0;
        this.setState({i2: x});
        }else{
        x = x + 1;
        this.setState({i2: x});
        console.log(this.state.i2);
        }}

        itemStatus3 = () => {
        var x = this.state.i3;
        if(x >= 2){
        x = 0;
        this.setState({i3: x});
        }else{
        x = x + 1;
        this.setState({i3: x});
        console.log(this.state.i3);
        }}

        keyExtractor(index){
          return index.toString();
        };

        componentDidMount = async () => {
            this.setData();
          }

          componentWillUnmount = async () => {
            this.saveData();
          }

        saveData = async () =>{

          var lastColors = [{i1: this.state.i1},{i2: this.state.i2},{i3: this.state.i3}];

          try{
            await AsyncStorage.setItem(this.props.route.params.item.shelterName, JSON.stringify(lastColors));
            console.log('Colors saved!');
          }catch (error){
              console.log('Problems passing data' + error);
            }}

        setData = async () => {
          var response;
          var responseCopy =[];
    
          try {
            response = await AsyncStorage.getItem(this.props.route.params.item.shelterName);
            if(response == null){
              response = [{i1: 0},{i2: 0},{i3: 0}];
            }else{
            responseCopy = JSON.parse(response); 
            }
          console.log('This is set data response' + JSON.stringify(responseCopy));   

          } catch (error) {
              console.log('error saving to async storage: ' + error);
          }
      
          this.setState({i1: responseCopy[0].i1});
          this.setState({i2: responseCopy[1].i2});
          this.setState({i3: responseCopy[2].i3});
        };
    
    render(){

    return(
        <SafeAreaView style={styles.container}>
                <TouchableOpacity onPress={this.itemStatus1} onLongPress={() => Alert.alert('Delete not implemented')}>
                    <View style={styles.title}>
                <Text style={{backgroundColor: this.state.colors[this.state.i1], height: 30, fontSize: 20}}>{this.state.DATA[0]}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.itemStatus2} onLongPress={() => Alert.alert('Delete not implemented')}>
                    <View style={styles.title}>
                <Text style={{backgroundColor: this.state.colors[this.state.i2], height: 30, fontSize: 20}}>{this.state.DATA[1]}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.itemStatus3} onLongPress={() => Alert.alert('Delete not implemented')}>
                    <View style={styles.title}>
                <Text style={{backgroundColor: this.state.colors[this.state.i3], height: 30, fontSize: 20}}>{this.state.DATA[2]}</Text>
                    </View>
                </TouchableOpacity>
            <Button
              style={styles.button}
              disabled={this.state.buttonDisabled}
              title = 'Add resource'
              onPress={() => {Alert.alert('This feature is yet to be implemented...')}}
            />
        </SafeAreaView>
    )}}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
    },
    button: {
        flex: 1,
        alignContent: 'center',
    },
    title: {
        justifyContent: 'center',
        padding: 20,
        marginVertical: 5,
        marginHorizontal: 5,
      },
}) 
