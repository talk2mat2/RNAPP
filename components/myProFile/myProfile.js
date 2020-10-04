import React from 'react';
import {Text,Image,StyleSheet} from 'react-native'
import styled from 'styled-components/native'





const MyprofileView=styled.View`
flex-direction:column;
width:100%;
align-items:center;
padding-top:50px;
padding-bottom:9px;




`

const Myprofile=()=>{
    return(
<MyprofileView>
<Text>My Profile</Text>
<Image  style={{...styles.tinyLogo}} source={require("../../assets/logo192.png")}/>

<Text>Emeka Edet</Text>
<Text>90 years</Text>
<Text>Nigeria, Lagos</Text>
<Text>About Me</Text>
<Text>texting testing testing testing</Text>

</MyprofileView>
)
}



const styles=StyleSheet.create({

    tinyLogo: {
        width: "90%",
        height: "77%",
        margin: 9,
        borderRadius:100,
      }
   
   
    }
)
export default Myprofile