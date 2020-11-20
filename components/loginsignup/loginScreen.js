import React, { useState, useEffect } from "react";
import NiceTextInput from "../reusables.components/textinputs";
import SweetButtons from "../reusables.components/buttons";
import Icon from "react-native-vector-icons/FontAwesome";
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
import {
  loginUserStartAxios,
  loginUserSUcess,
  ClearErrorMessage,
} from "../../redux/action";
import { errorMessage } from "../../redux/selector";
const LoginScreen = (props) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [errorresponse, setErrorresponse] = useState([]);

  const handleChange = (textInput, name) => {
    setState({ ...state, [name]: textInput });
    props.ClearError();
  };
  const { errorMessages } = props;
  useEffect(() => {
    setErrorresponse(errorMessages);
    // setTimeout(() => {
    //   setErrorresponse({});
    // }, 6000);
  }, [errorMessages]);
  const handleLogin = () => {
    if(!state.email||!state.password){
      return Alert.alert('you must fill all details')
    }
    const userdata = { email: state.email, password: state.password };

    props.loginUser(userdata);
  };

  return (
    <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
      {errorresponse.message ? (
        <Text style={{ color: "red" }}>{errorresponse.message}</Text>
      ) : null}
      <NiceTextInput
        style={errorresponse.message ? styles.errorMessage : null}
        autoCapitalize="none"
        handleChange={handleChange}
        value={state.email}
        name="email"
        placeholder={`Email`}
      />
      <NiceTextInput
        style={errorresponse.message ? styles.errorMessage : null}
        autoCapitalize="none"
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
        <SweetButtons
          color={Colors.googleblue}
          value="LOGIN WITH GOOGLE"
        ></SweetButtons>
        <View style={{ ...styles.center, marginTop: 20 }}>
          <Text style={styles.Text2}>New To me2love ?</Text>
          <Text
            onPress={props.handlePress.bind(this, "signup")}
            style={styles.Text2}
          >
            REGISTER
          </Text>
        </View>
      </View>
    </View>
  );
};
const mapStateToProps = (state) => {
  return { errorMessages: errorMessage(state) };
};
const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (userdata) => {
      dispatch(loginUserStartAxios(userdata));
    },
    ClearError: () => {
      dispatch(ClearErrorMessage());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
