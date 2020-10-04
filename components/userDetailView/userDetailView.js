import React from "react";
import { Text, Image, StyleSheet, View, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Colors } from "../constants/colors";
import SafeAreaView from "react-native-safe-area-view";

const MyprofileView = styled.View`
  flex-direction: column;
  width: 100%;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 9px;
`;

const UserDetailView = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MyprofileView>
        <Image
          style={{ ...styles.tinyLogo }}
          source={require("../../assets/logo192.png")}
        />

        <Text style={styles.headText}>Emeka Edet</Text>
        <Text>90 years</Text>
        <Text>Nigeria, Lagos</Text>
        <Text>About Me</Text>
        <Text>texting testing testing testing</Text>
      </MyprofileView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userHeader: {
    height: 50,
    width: "100%",
    backgroundColor: Colors.main,
    alignItems: "center",
    justifyContent: "center",
  },
  tinyLogo: {
    width: "90%",
    height: "77%",
    margin: 9,
    borderRadius: 100,
  },
  headText: { fontSize: 20 },
});
export default UserDetailView;
