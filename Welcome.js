import { StatusBar } from "expo-status-bar";

import React, { useState } from "react";
import Myprofile from "./components/myProFile/myProfile";
import Icon from "react-native-vector-icons/FontAwesome";
import {resetLoading} from './redux/action'
import { connect ,useDispatch} from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { Colors } from "./components/constants/colors";
import Styled from "styled-components/native";
import Main from "./components/loginsignup/Main";

function Welcome(state) {
  const dispatch=useDispatch()
  const [isVisible, setIsVisible] = useState(false);
  const handlePress = (value) => {
    value === "normal" && setIsVisible(true);
  };
  const handlePress2 = () => {
    setIsVisible(!isVisible);
    dispatch(resetLoading())
  };

  const Landing = (
    <ImageBackground
      resizeMode="cover"
      style={styles.background}
      source={require("./assets/landing3.jpg")}
    >
      <View style={styles.header}>
        <Text style={{ fontSize: 50, color: "#fff" }}>me2love</Text>
        <Text style={{ fontSize: 16, color: "#fff" }}>
          chat, meet hot singles around you
        </Text>
      </View>

      <View style={styles.logincontainer}>
        <TouchableOpacity
          onPress={handlePress.bind(this, "google")}
          activeOpacity={0.5}
          style={{
            ...styles.btngoogle,
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Icon
            style={{ position: "absolute", left: 50 }}
            color="white"
            name="google"
            size={30}
          />
          <Text
            style={{
              color: Colors.white,
              fontSize: 16,
            }}
          >
            LOGIN WITH GOOGLE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handlePress.bind(this, "normal")}
          activeOpacity={0.5}
          style={styles.btn}
        >
          <Text style={{ color: Colors.white, fontSize: 16 }}>
            LOGIN OR SIGN UP
          </Text>
        </TouchableOpacity>
      </View>

      <StatusBar />
    </ImageBackground>
  );

  return (
    <React.Fragment>
      {Landing}
      <Modal visible={isVisible} animationType="slide">
        <View>
          <TouchableOpacity onPress={handlePress2} >
           <Icon name="close" size={24}/>
          </TouchableOpacity>
          <Main loading={state.userInfo.loading} />
        </View>
      </Modal>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Welcome);

const styles = StyleSheet.create({
  logincontainer: {
    alignItems: "center",
    width: "90%",
    marginBottom: 30,
  },
  btngoogle: {
    backgroundColor: Colors.googleblue,
    height: 50,
    width: "90%",
    borderRadius: 40,
    marginBottom: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    backgroundColor: Colors.main,
    height: 50,
    width: "90%",
  },
  container: {
    flex: 1,

    alignItems: "center",
    // justifyContent: 'center',
  },
  background: {
    flex: 1,

    alignItems: "center",
    justifyContent: "flex-end",
  },

  header: {
    position: "absolute",
    top: 10,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  main: {},
});
