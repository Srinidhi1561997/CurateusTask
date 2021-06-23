import React, {Component} from 'react';
import axios from 'axios';
import {
  FlatList,
  Text,
  View,
  Image,
  Linking,
  TouchableOpacity
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import StickyParallaxHeader from 'react-native-sticky-parallax-header';
import Styles from './Styles';

class Preview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse:[],
        }
    }
      
    componentDidMount(){
        let API_URL = `http://app.curateus.com/interview/get_preview`;
        axios
            .get(API_URL)
            .then((response) => {
            console.log('api success', response.data);
            this.setState({apiResponse:response.data, 
                thumbNail: response.data.thumbnail, 
                title:response.data.title,
                videoUrl:response.data.url})
            })
            .catch((error) => {
            // console.log('api error', error);
            });
    }

      renderForeground(){
          return(
              <View style={{height:200,alignItems:'center'}}>
                  <Image source={{uri:this.state.thumbNail}} style={Styles.vehicleImageStyle}/>
                  <Text style={{color:'#fff', fontWeight:'bold', fontSize:16, padding:20}}>{this.state.title}</Text>
              </View>
          )
      }
      

    // main render function
    render(){
        console.log('thumbnail image is', this.state.title)
        return(
            <View style={[Styles.Container,{backgroundColor:'#fff'}]}>
                <StickyParallaxHeader
                    leftTopIcon={require('./Assets/back.png')}
                    leftTopIconOnPress={()=>{this.props.navigation.navigate('Schedule')}}
                    rightTopIcon={null}
                    parallaxHeight={200}
                    headerHeight={56}
                    image={{uri:this.state.thumbNail}}
                    // backgroundImage={{uri:this.state.thumbNail}}
                    backgroundColor='#08b4cc'
                    headerType='AvatarHeader'
                    foreground={()=>this.renderForeground()}
                    title={this.state.title}
                    renderBody={()=>{
                        return(
                        <View style={{padding:10, flex:1}}>
                                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                    <View style={{flexDirection:'column'}}>
                                        <View style={{width:50, height:50, borderRadius:25, borderWidth:0.2, justifyContent:'center'}}>
                                            <MaterialIcons name='save' size={28} style={{alignSelf:'center'}}/>
                                        </View>
                                        <Text style={{textAlign:'center'}}>Save</Text>
                                    </View>
                                    <View style={{flexDirection:'column'}}>
                                        <View style={{width:50, height:50, borderRadius:25, borderWidth:0.2, justifyContent:'center'}}>
                                            <MaterialIcons name='recommend' size={28} style={{alignSelf:'center'}}/>
                                        </View>
                                        <Text style={{textAlign:'center'}}>Like</Text>
                                    </View>
                                    <View style={{flexDirection:'column'}}>
                                        <View style={{width:50, height:50, borderRadius:25, borderWidth:0.2, justifyContent:'center'}}>
                                            <MaterialIcons name="watch-later" size={28} style={{alignSelf:'center'}}/>
                                        </View>
                                        <Text style={{textAlign:'center'}}>Watch</Text>
                                    </View>
                                    <View style={{flexDirection:'column'}}>
                                        <View style={{width:50, height:50, borderRadius:25, borderWidth:0.2, justifyContent:'center'}}>
                                            <MaterialIcons name='star' size={28} style={{alignSelf:'center'}}/>
                                        </View>
                                        <Text style={{textAlign:'center'}}>WishList</Text>
                                    </View>
                                </View>
                            <Text style={{fontSize:14, color:'#000', paddingTop:10}}>{this.state.apiResponse.description}</Text>
                            <View style={Styles.detailsContainer}>
                    <Text style={Styles.detailsText}>IMDB : </Text>
                    <Text style={Styles.detailsTextValue} numberOfLines={1} ellipsizeMode='tail'>{this.state.apiResponse.imdb_rating}/10</Text>
                </View>    
                <View style={Styles.detailsContainer}>
                  <Text style={Styles.detailsText}>Duration : </Text>
                  {/\s/.test(this.state.apiResponse.media_time)?
                  <Text style={Styles.detailsTextValue} numberOfLines={1} ellipsizeMode='tail'>{this.state.apiResponse.media_time}</Text>:
                  <Text style={Styles.detailsTextValue} numberOfLines={1} ellipsizeMode='tail'>{parseInt(this.state.apiResponse.media_time)/60} Min</Text>}
                </View>
                <View style={Styles.detailsContainer}>
                    <Text style={Styles.detailsText}>Review : </Text>
                </View> 
                <Text >{this.state.apiResponse.review}</Text> 
                <View style={Styles.detailsContainer}>
                    <Text style={Styles.detailsText}>Type : </Text>
                    <Text style={Styles.detailsTextValue} numberOfLines={1} ellipsizeMode='tail'>{this.state.apiResponse.article_type}</Text>
                </View> 
                <View style={Styles.detailsContainer}>
                    <Text style={Styles.detailsText}>Available links : </Text>
                    <Text style={[Styles.detailsTextValue,{color:'blue'}]} onPress={()=>{Linking.openURL(this.state.apiResponse.url)}}>Click me</Text>
                </View> 
                </View>
                        )
                    }}
                />
                <View style={{padding:10, justifyContent:'center', alignItems:'center'}}>
                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Schedule', {title:this.state.title}), console.log('atlease test here', this.state.title)}}
                style={{alignItems:'center',alignContent:'center',justifyContent:'center',width:"50%", height:50, borderRadius:25, borderWidth:0.4, borderColor:'#08b4cc', backgroundColor:'#08b4cc'}}>
                    <Text style={{textAlign:'center',color:'#fff'}}>Schedule</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }
}

export default Preview;