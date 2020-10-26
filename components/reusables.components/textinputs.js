import React from "react";
import { TextInput, StyleSheet } from "react-native";
import styled from "styled-components/native";

const TextInputs = styled.TextInput`
  border: 2px solid ${({ error }) => (error ? "red" : "#dadada")};

  border-radius: 2px;
  margin: 4px 0 4px;
  width: 90%;
  height: 40px;
  margin-bottom: 20px;
  font-size: 16px;
  padding: 0 10px 0 10px;
`;

const NiceTextInput = (props) => {
  const name = props.name;

  return (
    <TextInputs
      {...props}
      secureTextEntry={props.secureTextEntry}
      error={null}
      placeholder={props.placeholder}
      {...props}
      editable
      maxLength={props.maxLength}
      value={props.value}
      onChangeText={(textInput) => {
        props.handleChange(textInput, name);
      }}
    />
  );
};

export default NiceTextInput;
