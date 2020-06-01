import React,{Component} from 'react';
import {View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, AsyncStorage, RefreshControl} from 'react-native';
import Constants from 'expo-constants';

export default class Shelter extends Component{

  state={
    shelters: [],
    refreshing: false,
  }

  //https://reactnativeforyou.com/how-to-add-pull-down-to-refresh-feature-in-react-native/
  _onRefresh = () => {
    this.setState({refreshing: true});
    this.loadData().then(() => {
    this.setState({refreshing: false});
    });
  }

  keyExtractor(index){
    console.log(JSON.stringify(index))
    return index.toString();
  };

  componentDidMount(){
    this.loadData();
  }

  async loadData(){
    try{
        let response = await AsyncStorage.getItem('GeoInfo');
        let sheltersCopy = JSON.parse(response);
        this.setState({shelters: sheltersCopy});
      }catch (error){
          console.log('Problems passing data' + error);
        }
      };

  render(){
    return(
    <View style={styles.container}>
      <FlatList
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}/>}
        data={this.state.shelters}
        keyExtractor={(item, index) => this.keyExtractor(index)}
        renderItem={({ item }) =>(
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Shelter Info', {item: item, index: item.index})}>
            <Text style={styles.title}>{item.shelterName}</Text>
          </TouchableOpacity>
          )}
      />
    </View>
    )}}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight,
    },
    title: {
      justifyContent: 'center',
      fontSize: 20,
      padding: 20,
      marginVertical: 5,
      marginHorizontal: 16,
      backgroundColor: '#00ffae',
      textAlign: 'center'
    },
  });
  