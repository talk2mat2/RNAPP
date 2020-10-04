import React, { useState } from "react";
import NiceTextInput from "../reusables.components/textinputs";
import SweetButtons from "../reusables.components/buttons";

import { Store } from "../../redux/store";
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
import { connect } from "react-redux";
import { Colors } from "../../components/constants/colors";
import {loginUserStartAxios ,loginUserSUcess } from "../../redux/action";

const LoginScreen = ({ loginUser }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (textInput, name) => {
    setState({ ...state, [name]: textInput });
  };

 

  const handleLogin = () => {
    const userdata = { email: state.email, password: state.password };

 loginUser(userdata)
  };

  return (
    <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
      <NiceTextInput
        handleChange={handleChange}
        value={state.email}
        name="email"
        placeholder={`Email`}
      />
      <NiceTextInput
        secureTextEntry={true}
        handleChange={handleChange}
        value={state.password}
        name="password"
        placeholder={`Password`}
      />
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <Text style={styles.Text2}>Remember me</Text>

        <Text style={styles.Text2}>Forgot Password</Text>
      </View>
      <View style={{ width: "100%", alignItems: "center", marginTop: 30 }}>
        <SweetButtons
          handlePress={() => {
            handleLogin();
          }}
          color={Colors.orange}
          value="LOGIN"
        />
        <SweetButtons color={Colors.googleblue} value="LOGIN WITH GOOGLE" />
        <View style={{ ...styles.center, marginTop: 20 }}>
          <Text style={styles.Text2}>New To me2love</Text>
          <Text style={styles.Text2}>REGISTER</Text>
        </View>
      </View>
    </View>
  );
};
const mapDispatchToProps = (dispatch) => {
  return { loginUser: (userdata)=> {dispatch(loginUserStartAxios(userdata))} };
};

export default connect(null, mapDispatchToProps)(LoginScreen);
