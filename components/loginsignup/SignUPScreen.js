import React,{useState} from 'react';
import NiceTextInput from "../reusables.components/textinputs";
import SweetButtons from "../reusables.components/buttons";
import {
    Alert,
    Text,
    View,
    StyleSheet,
    Modal,
    Image,
    TextInput,
    TouchableOpacity,
  } from "react-native";
  import { styles } from "./main.style";
  import { Colors } from "../../components/constants/colors";


  const SignUPScreen =(props )=>{ 

    const [state, setState] = useState({
      email: "",
      password: "",
      password2: "",
      firstName: "",
      lastName: "",
      errormessage: "",
    });

  const handleChange=(textInput,name)=>{
 console.log(textInput,name)
 setState({...state,[name]:textInput})
     }
  // const handleChange = ( { name, value } ) => {
  //   setState({ ...state, [name]: value });
  // }
   
const handleSignUp=()=>{
  
}





      return (
    <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
      <NiceTextInput handleChange={handleChange} value={state.email} name="email" placeholder={`Email`} />
      <NiceTextInput handleChange={handleChange} value={state.firstName}   name="firstName" placeholder={`first name`} />
      <NiceTextInput handleChange={handleChange} value={state.lastName}  name="password" name="lastName" placeholder={`last name`} />
      <NiceTextInput secureTextEntry={true} handleChange={handleChange} value={state.password}  name='password' placeholder={`password`} />
      <NiceTextInput secureTextEntry={true} handleChange={handleChange} value={state.password2}   name="password2" placeholder={`confirm password`} />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Text style={styles.Text2}>I Want To Receive me2love Newsletter</Text>
      </View>
      <View style={{ width: "100%", alignItems: "center", marginTop: 30 }}>
        <SweetButtons color={Colors.orange} value="LOGIN" />
  
        <View style={{ ...styles.center, marginTop: 20 }}>
          <Text style={styles.Text2}>Already Have An Account</Text>
          <Text style={styles.Text2}>LOGIN</Text>
        </View>
      </View>
    </View>
  );
    }


    export default SignUPScreen