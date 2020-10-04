import React, { useState } from "react";
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

import styled from "styled-components/native";
import { Colors } from "../../components/constants/colors";
import image from "../../assets/logo.png";
import NiceTextInput from "../../components/reusables.components/textinputs";
import SweetButtons from "../../components/reusables.components/buttons";
import { styles } from "./main.style";
import SignUp from "./loginScreen";
import SignUPScreen from './SignUPScreen'
import LoginScreen from './loginScreen'


const Container = styled.View`
  flex: 1;
  width: 100%;
  backgrround-color: blue;
`;
const Texts = styled.Text`
  color: red;
  background-color: ${Colors.white};
  width: 100%;
  height: 100%;
  color: blue;
`;


    




const Main = () => {

 
  const [CurrentView, setCurrentView] = useState({ screen: LoginScreen });

  const textColor =
    CurrentView.screen === LoginScreen ? Colors.white : Colors.orange;
  const BackColor =
    CurrentView.screen === LoginScreen ? Colors.orange : Colors.white;
  const textColor2 =
    CurrentView.screen === SignUPScreen ? Colors.white : Colors.orange;
  const BackColor2 =
    CurrentView.screen === SignUPScreen ? Colors.orange : Colors.white; 




 

    
  const handlePress = (value) => {
    value === "signup" &&
      setCurrentView({ ...CurrentView, screen: SignUPScreen });
    value === "login" &&
      setCurrentView({ ...CurrentView, screen: LoginScreen });
  };
  return (
    <View style={styles.containers}>
      <Image
        style={styles.tinyLogo}
        source={require("../../assets/logo.png")}
      />
      <View style={styles.header}>
        <TouchableOpacity
          style={{ width: "50%" }}
          onPress={handlePress.bind(this, "login")}
        >
          <View style={{ ...styles2.headerblock, backgroundColor: BackColor }}>
            <Text style={{ ...styles2.Text, color: textColor }}>LOGIN</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ width: "50%" }}
          onPress={handlePress.bind(this, "signup")}
        >
          <View style={{ ...styles2.headerblock, backgroundColor: BackColor2 }}>
            <Text style={{ ...styles2.Text, color: textColor2 }}>SIGNG UP</Text>
          </View>
        </TouchableOpacity>
      </View>
      <CurrentView.screen/>
    </View>
  );
};
export default Main;

const styles2 = StyleSheet.create({
  Text: {
    color: Colors.white,
  },

  headerblock: {
    width: "100%",
    height: 30,
    backgroundColor: Colors.orange,
    borderColor: "silver",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
