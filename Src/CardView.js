import * as React from 'react';
import {View} from 'react-native';
import Styles from './Styles';

// reusable card component
export default function CardView(props) {
    return (
     <View style={Styles.CategoryCard}>
         <View style={Styles.CardContent}>
            {props.children}
         </View>       
     </View>
    );
}