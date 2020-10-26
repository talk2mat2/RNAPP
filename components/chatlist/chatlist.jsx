import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  TouchableOpacity,
  Modal,
  Alert,
  Text,
  View,
  StatusBar,
  TextInput,
  Image,
  StyleSheet,
  Platform,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styled from "styled-components/native";
import { Colors } from "../constants/colors";
import UserDetailView from "../userDetailView/userDetailView";
import Chat from "../Chat/Chat";
const STATUSBAR_HEIGHT = Platform === "ios" ? 20 : StatusBar.currentHeight;

const DetailLisiView = (props) => {
  // const { msgFrom, msgBody } = props;

  // console.log(props.imgurl[0]["url"]);
  return (
    StatusBar,
    (
      <View style={{ ...styles.Detaillist, width: "100%" }}>
        <Image
          style={styles.tinythumb}
          source={{
            uri:
              typeof props.imgurl !== "undefined" && props.imgurl.length > 0
                ? props.imgurl[0]["url"]
                : null,
          }}
        ></Image>
        <TouchableOpacity
          style={{ width: "80%" }}
          onPress={() => {
            props.onPress();
          }}
        >
          <Text style={styles.smallText2}> {props.msgFrom}</Text>
          <Text numberOfLines={1} style={styles.bottomText}>
            {" "}
            {props.msgPreview}
          </Text>
        </TouchableOpacity>
      </View>
    )
  );
};

const Chatlist = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [sender, setSender] = useState("");
  const chatMsg = useSelector((state) => state.chatList);
  const handlePress = (value) => {
    setSender(value);
    setIsVisible(!isVisible);
  };

  const listALLmessage = () => {
    const newArr = Object.keys(chatMsg);
    // const body=
    return newArr.map((id, i) => (
      <DetailLisiView
        key={i}
        imgurl={chatMsg[id]["remoteUserProfile"]["Pictures"]}
        msgFrom={chatMsg[id]["name"]}
        msgPreview={chatMsg[id]["chatss"][chatMsg[id]["chatss"].length - 1].msg}
        onPress={handlePress.bind(this, { id: id, name: chatMsg[id]["name"] })}
      />
    ));
  };

  return (
    <View style={styles.Container}>
      <StatusBar />
      <View style={styles.Header}>
        <Text style={styles.headText1}>Chat List </Text>
      </View>
      <Modal visible={isVisible} animationType="slide">
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 5,
            left: 3,
            zIndex: 2,
            width: 50,
          }}
          onPress={() => {
            handlePress();
          }}
        >
          <Icon
            style={{
              width: "100%",
              width: 300,
              height: 300,
              left: 1,
              top: 3,
            }}
            name="arrow-left"
            size={27}
          />
        </TouchableOpacity>
        <Chat socket={props.socket} sender={sender} />
      </Modal>

      <ScrollView style={styles.ScrollViews}>
        {listALLmessage()}
        {/* {chatMsg.map((xx, i) => (
          <DetailLisiView key={i} data={xx} onPress={handlePress} />
        ))} */}
      </ScrollView>
    </View>
  );
};

export default Chatlist;

const styles = StyleSheet.create({
  Detaillist: {
    flexDirection: "row",
    alignItems: "center",
  },
  smallText2: {
    color: Colors.text,
    fontWeight: "bold",
    margin: 1,
    fontSize: 18,
    fontFamily: "sans-serif",
  },
  headText: { fontSize: 18, color: Colors.text },
  headText1: { fontSize: 20 },
  bottomText: { fontSize: 16, color: Colors.grey },
  Header: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    borderColor: "silver",
    borderWidth: 2,
    fontSize: 20,
  },
  ScrollViews: {
    paddingHorizontal: 3,
    paddingVertical: 1,

    width: "100%",
    height: "100%",
  },
  tinythumb: {
    width: 60,
    height: 60,
    margin: 3,
    marginRight: 14,
    marginLeft: 8,
    borderRadius: 13,
  },
  containerDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  Container: {
    // paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: Colors.background,
    padding: 2,
  },
});
