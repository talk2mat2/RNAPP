import React from "react";
import {
  Alert,
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Platform,
  ScrollView,
} from "react-native";
import styled from "styled-components/native";
import { Colors } from "../constants/colors";
const STATUSBAR_HEIGHT = Platform === "ios" ? 20 : StatusBar.currentHeight;

const DetailLisiView = () => {
  return (
    <View style={styles.Detaillist}>
      <Image
        style={styles.tinythumb}
        source={require("../../assets/Avater.jpg")}
      ></Image>
      <TouchableOpacity
        onPress={() => {
          Alert.alert("u clicked me");
        }}
      >
        <Text style={styles.headText}> Lorem ipsum dolor sit amet</Text>
        <Text style={styles.bottomText}> Lorem ipsum dolor sit amet,</Text>
      </TouchableOpacity>
    </View>
  );
};

const Chatlist = () => {
  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <Text style={styles.headText1}>Chat List </Text>
      </View>

      <ScrollView style={styles.ScrollViews}>
        <DetailLisiView />
        <DetailLisiView />
        <DetailLisiView />
        <DetailLisiView />
        <DetailLisiView />
        <DetailLisiView />
        <DetailLisiView />
        <DetailLisiView />
        <DetailLisiView />
        <DetailLisiView />
        <DetailLisiView />
        <DetailLisiView />
        <DetailLisiView />
        <DetailLisiView />
        <DetailLisiView />
        <DetailLisiView />
        <DetailLisiView />
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
  headText: { fontSize: 18 },
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
    borderRadius: 100,
  },
  containerDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  Container: {
    paddingTop: STATUSBAR_HEIGHT,
    padding: 2,
  },
});
