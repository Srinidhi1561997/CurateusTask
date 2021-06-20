import React, {Component} from 'react';
import axios from 'axios';
import {
  FlatList,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Body, Card, Header, Left, Right, Title } from 'native-base';
import Styles from './Styles';
import CardView from './CardView';
import moment from 'moment';


class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse:[],
            activeIndex:0,
            activeId:1,
        }
    }
      
    componentDidMount(){
        let type='calendar';
        let API_URL = `http://app.curateus.com/interview/recommend_schedule`;
        axios
            .get(API_URL,{
                params: {
                   type
                  }
            })
            .then((response) => {
            // console.log('api success', response.data);
            this.setState({apiResponse:response.data,date:response.data[0].day,
                month:response.data[0].month_name, year:response.data[0].year, time:response.data[0].time})
            })
            .catch((error) => {
            // console.log('api error', error);
            });
    }

    // main render function
    render(){
        
        return(
            <View style={{flex:1}}>
                <StatusBar backgroundColor='#08b4cc'/>
               <Header style={{backgroundColor:'#08b4cc'}}>
                   <Left>
                        <Feather name='menu' size={22} color="#fff"/>
                   </Left>
                   <Body>
                   <Title style={{textAlign:'center', justifyContent:'center',alignItems:'center'}}>Schedule</Title>
                   </Body>
                   <Right>
                   <Feather name='menu' size={22} color="transparent"/>
                   </Right>
               </Header>
               <View style={Styles.Container}>
                    <CardView>
                        <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={this.state.apiResponse}
                        keyExtractor={(item, index) => index}
                        renderItem={({item, index}) => {
                          if (index!==this.state.activeIndex) {
                            return (                               
                                    <View style={{flexDirection:'column', paddingTop:5,paddingHorizontal:15}}>
                                    <Text style={{textAlign:'center',paddingBottom:5, color:'#08b4cc'}}>{item.month_name}</Text>
                                        <View style={{borderColor:'#08b4cc',width:50, height:50, borderRadius:25, borderWidth:0.4, justifyContent:'center'}}>
                                            <Text style={{alignSelf:'center', textAlign:'center', fontSize:25, color:'#08b4cc'}}
                                            onPress={()=>{this.setState({date:item.day,month:item.month_name, year:item.year, activeIndex:index, activeId:item.id, time:item.time})}}>{item.day}</Text>
                                        </View>  
                                        <Text style={{alignSelf:'center', textAlign:'center', fontSize:12, color:'#08b4cc', paddingBottom:20}}>#{item.time.length}</Text>                                  
                                    </View>
                            )}else if(index===this.state.activeIndex){
                                return (                               
                                    <View style={{flexDirection:'column', paddingTop:5,paddingHorizontal:15}}>
                                    <Text style={{textAlign:'center',paddingBottom:5, color:'#08b4cc'}}>{item.month_name}</Text>
                                        <View style={{backgroundColor:'#08b4cc',borderColor:'#08b4cc',width:50, height:50, borderRadius:25, borderWidth:0.4, justifyContent:'center'}}>
                                            <Text style={{alignSelf:'center', textAlign:'center', fontSize:25, color:'#fff'}}
                                            onPress={()=>{this.setState({date:item.day,month:item.month_name, year:item.year,activeIndex:index,activeId:item.id})}}>{item.day}</Text>
                                        </View>  
                                        <Text style={{alignSelf:'center', textAlign:'center', fontSize:12, color:'#08b4cc', paddingBottom:20}}>#{item.time.length}</Text>                                  
                                    </View>
                            )
                            }}}
                        />
                        <View style={{borderWidth:0.2, borderBottomColor:'transparent', borderLeftColor:'transparent', borderRightColor:'transparent', paddingTop:10}}>
                            <Text style={{ fontSize:16, color:'#000'}}>{this.state.month} {this.state.date}, {this.state.year}</Text>
                        </View>
                    </CardView>
                    <FlatList
                    showsVerticalScrollIndicator={false}
                    // horizontal={true}
                    data={this.state.time}
                    keyExtractor={(item, index) => index}
                    renderItem={({item, index}) => {
                      if (index!==this.state.activeIndex) {
                        //   console.log('print the only time', item.time)
                        return (
                            <View style={{flexDirection:'row', justifyContent:'space-between', padding:15}}>                            
                                    <Text>{item.time}</Text>
                                    <Text>{item.content}</Text>
                                    {item.content === null?
                                    <TouchableOpacity onPress={()=>this.props.navigation.navigate('Preview')}
                                    style={{borderWidth:1, borderColor:'#08b4cc', borderRadius:50, length:100, width:80, padding:5}}> 
                                        <Text style={{textAlign:'center'}}>Add</Text>
                                    </TouchableOpacity> :null}                         
                            </View>
                        )}}}
                    />
               </View>
            </View>
        )
    }
}

export default Schedule;