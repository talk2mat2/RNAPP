import React from 'react';
import {Text,TouchableOpacity} from 'react-native'
import styled from 'styled-components/native'

const Views = styled.View`

    height:50px;
    width:95%;
    font-size:16px;
    align-items:center;
   justify-content:center;
    color:white;
    margin-top:25px;

`
const SweetButtons=(props)=>{


return(
<TouchableOpacity onPress={props.handlePress} style={{width:"100%",alignItems:"center"}  }>
    <Views style={{backgroundColor:props.color}} {...props} >
        <Text style={{color:'white'}}>
           {props.value} 
        </Text>
    </Views>
</TouchableOpacity>
)
}

export default SweetButtons