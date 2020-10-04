import React ,{useState} from 'react';
import {View} from 'react-native'
import { Colors } from "../../components/constants/colors";


const NiceHeader=(props)=>{

    const textColor=CurrentView.screen.LoginScreen?Colors.orange:Colors.white
    const BackColor=CurrentView.screen.LoginScreen?Colors.white:Colors.orange
    
    state
    return(
        <View {...props.viewstyle}  style={{backgroundColor:BackColor}}>
            <Text {...props.textstyle} style={{color:textColor}}>{props.value}</Text>
        </View>
    )
}

export default NiceHeader