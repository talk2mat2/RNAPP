import React, { useState } from "react";
import NiceTextInput from "../reusables.components/textinputs";
import SweetButtons from "../reusables.components/buttons";
import { Picker } from "@react-native-community/picker";
import CheckBox from "@react-native-community/checkbox";
import WithLoader from "../Loader/LoaderHoc";
import { useDispatch } from "react-redux";
import { loginUserStartAxios } from "../../redux/action";
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
import axios from "axios";
import { State } from "react-native-gesture-handler";

const SignUPScreen = (props) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    email: "",
    password: "",
    password2: "",
    firstName: "",
    lastName: "",
    errormessage: "",
    Gender: "",
    newsLetter: false,
  });
  const handleRegister = () => {
    const data = {
      Email: state.email,
      Password: state.password,
      Password2: state.password2,
      firstName: state.firstName,
      lastName: state.lastName,
      Gender: state.Gender,
    };

    props.setLoading(true);
    axios
      .post("https://server-me2love.herokuapp.com/api/v1/Register", data)
      .then((res) => {
        const userdata = { email: state.email, password: state.password };
        props.setLoading(false);
        setState({ ...state, errormessage: "" });

        dispatch(loginUserStartAxios(userdata));
      })
      .catch((error) => {
        if (error.response) {
          setState({ ...state, errormessage: error.response.data.message });

          props.setLoading(false);
        }
      });
  };

  const handleChange = (textInput, name) => {
    setState({ ...state, [name]: textInput });
  };
  // const handleChange = ( { name, value } ) => {
  //   setState({ ...state, [name]: value });
  // }

  const handleSignUp = () => {};

  return (
    <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
      {state.errormessage ? (
        <Text style={{ color: "red", marginHorizontal: 20 }}>
          {state.errormessage}
        </Text>
      ) : null}
      <NiceTextInput
        autoCapitalize="none"
        handleChange={handleChange}
        value={state.email}
        name="email"
        placeholder={`Email`}
      />
      <NiceTextInput
        handleChange={handleChange}
        value={state.firstName}
        name="firstName"
        placeholder={`first name`}
      />
      <NiceTextInput
        handleChange={handleChange}
        value={state.lastName}
        name="lastName"
        placeholder={`last name`}
      />

      <NiceTextInput
        autoCapitalize="none"
        secureTextEntry={true}
        handleChange={handleChange}
        value={state.password}
        name="password"
        placeholder={`password`}
      />
      <NiceTextInput
        autoCapitalize="none"
        secureTextEntry={true}
        handleChange={handleChange}
        value={state.password2}
        name="password2"
        placeholder={`confirm password`}
      />
      {/* <NiceTextInput
        handleChange={handleChange}
        value={state.Gender}
        name="Gender"
        placeholder={`gender `}
      /> */}
      <Picker
        selectedValue={state.Gender}
        itemStyle={{ height: 50, width: 100 }}
        style={{
          borderColor: "silver",
          marginVertical: 6,
          height: 50,
          width: "90%",
          color: "grey",
        }}
        onValueChange={(itemValue, itemIndex) =>
          setState({ ...state, Gender: itemValue })
        }
      >
        <Picker.Item label="" value={""} />
        <Picker.Item label="male" value={"male"} />
        <Picker.Item label="female" value={"female"} />
      </Picker>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <View>
          <CheckBox
            tintColors={{ true: Colors.main, false: Colors.main }}
            value={state.newsLetter}
            onChange={() => {
              setState({ ...state, newsLetter: !state.newsLetter });
            }}
          />
        </View>
        <Text style={styles.Text2}>I Want To Receive me2love Newsletter</Text>
      </View>
      <View style={{ width: "100%", alignItems: "center", marginTop: 30 }}>
        <SweetButtons
          handlePress={() => {
            handleRegister();
          }}
          color={Colors.orange}
          value="REGISTER "
        />

        <View style={{ ...styles.center, marginTop: 20 }}>
          <Text style={styles.Text2}>
            Already Have An Account{" "}
            <Text
              onPress={props.handlePress.bind(this, "login")}
              style={styles.Text2}
            >
              LOGIN
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WithLoader(SignUPScreen);
