import React from "react";
import { Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Colors } from "../constants/colors";

const Views = styled.View`
  height: 50px;
  width: 95%;
  font-size: 16px;
  align-items: center;
  justify-content: center;
  color: white;
  margin-top: 25px;
`;
const SweetButtons = (props) => {
  return (
    <TouchableOpacity
      onPress={props.handlePress}
      style={{
        width: "99%",

        alignItems: "center",
        elevation: 4,
        ...props.style,
      }}
    >
      <Views
        style={{
          width: props.width || "90%",
          height: props.height || 50,
          backgroundColor: props.color,
          flexDirection: "row",
        }}
        {...props}
      >
        <Text style={{ color: Colors.background }}>{props.children}</Text>
        <Text style={{ fontSize: 17, color: Colors.background, margin: 7 }}>
          {props.value}
        </Text>
      </Views>
    </TouchableOpacity>
  );
};

export default SweetButtons;
