import React, { useState } from "react";
import { Picker } from "@react-native-community/picker";
import { currentUserDetails, loading } from "../../redux/selector";
import CheckBox from "@react-native-community/checkbox";
import { upDateUserStartAxios, DeleteMyImage } from "../../redux/action";

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import WithLoader from "../Loader/LoaderHoc";

import { connect } from "react-redux";
import {
  TouchableOpacity,
  Modal,
  Alert,
  Text,
  View,
  TextInput,
  Image,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import styled from "styled-components/native";
import { Colors } from "../constants/colors";
import UserDetailView from "../userDetailView/userDetailView";
import Chat from "../Chat/Chat";
import NiceTextInput from "../reusables.components/textinputs";
import SweetButtons from "../reusables.components/buttons";
import UploaderScreen from "../uploaderscreen/UploaderScreen";
import { compose } from "redux";
const STATUSBAR_HEIGHT = Platform === "ios" ? 20 : StatusBar.currentHeight;

const DetailLisiView = (props) => {
  return <View style={styles.Detaillist}></View>;
};

const EditProfile = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  const {
    Religion,
    Animals,
    Drinking,
    Smoking,
    USA,
    Bassketball,
    Camping,
    country,
    Football,
    Music,
    Party,
    nightLife,
    interestedInMen,
    interestedInWomen,
    firstName,
    lastName,
    isVerified,
    lastSeen,
    offLineMessage,
    Pictures,
    Email,
    Gender,
    Meta,
    aboutMe,
    Education,
    state,
    county,
    _id,
    Age,
    RegisterdDate,
  } = props.CurrentUser ? props.CurrentUser : 1;
  const [userstate, setUserState] = useState({
    Animals,
    Religion,
    Drinking,
    Smoking,
    USA,
    Bassketball,
    Camping,
    country,
    Football,
    Music,
    Party,
    nightLife,
    firstName,
    interestedInMen,
    interestedInWomen,
    aboutMe,
    Education,
    lastName,
    isVerified,
    lastSeen,

    Email,
    Gender,
    Meta,
    Age,
    RegisterdDate,
  });

  const handleUpdate = () => {
    try {
      props.upDateData(userstate);
      props.handleVisibleModal();
    } catch (err) {
      setIsVisible(!isVisible);
    }
  };
  const handleChange = (textInput, name) => {
    // console.log(textInput, name);
    setUserState({ ...userstate, [name]: textInput });
  };
  const handleChecked = (name) => {
    name === 1 &&
      setUserState({
        ...userstate,
        interestedInMen: !userstate.interestedInMen,
      });
    name === 2 &&
      setUserState({
        ...userstate,
        interestedInWomen: !userstate.interestedInWomen,
      });
    // setChecked(!checked);
  };
  const handleLikes = (name) => {
    setUserState({ ...userstate, [name]: !userstate[`${name}`] });
  };
  const handlePress = () => {
    setIsVisible(!isVisible);
  };

  const handleDelete = (id, url) => {
    props.deleteImage(id, url);
  };

  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <TouchableOpacity
          style={{
            margin: 2,
            width: "100%",
            position: "absolute",
          }}
        >
          <Icon
            onPress={() => {
              props.handleVisibleModal();
            }}
            name="arrow-left"
            size={26}
          />
        </TouchableOpacity>
        <Text style={styles.headText1}>Edit Profile </Text>
      </View>
      <Modal visible={isVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 5,
              left: 3,
              zIndex: 2,
              minWidth: 50,
            }}
            onPress={() => {
              handlePress();
            }}
          >
            <Icon
              style={{
                width: "100%",

                left: 3,
                top: 3,
              }}
              name="close"
              size={27}
            />
          </TouchableOpacity>

          <UploaderScreen handlepress={handlePress} />
        </View>
      </Modal>
      <ScrollView>
        <View
          style={{
            height: "100%",
            alignItems: "center",
            flex: 1,
            marginBottom: 20,
            paddingBottom: 100,
          }}
        >
          <View style={{ width: "90%", flex: 1 }}>
            <View style={styles.inputwrap}>
              <Text style={styles.label}>First Name :</Text>
              <NiceTextInput
                name="firstName"
                handleChange={handleChange}
                value={userstate.firstName}
                style={{ width: "100%", ...styles.NiceText }}
              />
            </View>
            <View style={styles.inputwrap}>
              <Text style={styles.label}>Last Name :</Text>
              <NiceTextInput
                name="lastName"
                value={userstate.lastName}
                handleChange={handleChange}
                style={{ width: "100%", ...styles.NiceText }}
              />
            </View>
            <View style={{ ...styles.inputwrap, alignItems: "flex-start" }}>
              <Text style={styles.label}>Age :</Text>
              <Picker
                selectedValue={userstate.Age}
                itemStyle={{ height: 50, width: 100 }}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) =>
                  setUserState({ ...userstate, Age: itemValue })
                }
              >
                <Picker.Item label="17" value={18} />
                <Picker.Item label="19" value={19} />
                <Picker.Item label="21" value={21} />
                <Picker.Item label="22" value={22} />
                <Picker.Item label="23" value={23} />
                <Picker.Item label="24" value={24} />
                <Picker.Item label="25" value={25} />
                <Picker.Item label="26" value={26} />
                <Picker.Item label="27" value={27} />
                <Picker.Item label="28" value={28} />
                <Picker.Item label="29" value={29} />
                <Picker.Item label="30" value={30} />
                <Picker.Item label="31" value={31} />
                <Picker.Item label="32" value={32} />
                <Picker.Item label="33" value={33} />
                <Picker.Item label="34" value={34} />
                <Picker.Item label="35" value={35} />
                <Picker.Item label="36" value={36} />
                <Picker.Item label="37" value={37} />
                <Picker.Item label="38" value={38} />
                <Picker.Item label="39" value={39} />
                <Picker.Item label="40" value={40} />
                <Picker.Item label="41" value={41} />

                <Picker.Item label="42" value={42} />
                <Picker.Item label="43" value={43} />
                <Picker.Item label="44" value={44} />
                <Picker.Item label="45" value={45} />
                <Picker.Item label="46" value={46} />
                <Picker.Item label="47" value={47} />
                <Picker.Item label="48" value={48} />
                <Picker.Item label="49" value={49} />
                <Picker.Item label="50" value={50} />
                <Picker.Item label="51" value={51} />
                <Picker.Item label="52" value={52} />
                <Picker.Item label="53" value={53} />
                <Picker.Item label="54" value={54} />
                <Picker.Item label="55" value={55} />
                <Picker.Item label="56" value={56} />
                <Picker.Item label="57" value={57} />
                <Picker.Item label="58" value={58} />
                <Picker.Item label="59" value={59} />
                <Picker.Item label="60" value={60} />
                <Picker.Item label="61" value={61} />
                <Picker.Item label="62" value={62} />
                <Picker.Item label="63" value={63} />
                <Picker.Item label="64" value={64} />
                <Picker.Item label="65" value={65} />
                <Picker.Item label="66" value={66} />
                <Picker.Item label="67" value={67} />
                <Picker.Item label="68" value={68} />
                <Picker.Item label="69" value={69} />
                <Picker.Item label="70" value={70} />
              </Picker>
            </View>
            <View style={styles.inputwrap}>
              <Text style={styles.label}>Educational Level :</Text>

              <View style={{ width: 300, marginLeft: 80 }}>
                <Picker
                  selectedValue={userstate.Education}
                  style={{ height: 50, width: "80%" }}
                  onValueChange={(itemValue, itemIndex) =>
                    setUserState({ ...userstate, Education: itemValue })
                  }
                >
                  <Picker.Item
                    label="bachelors degree"
                    value="bachelors degree"
                  />
                  <Picker.Item label="masters degree" value="masters degree" />
                  <Picker.Item
                    label="associates degree"
                    value="associates degree"
                  />
                  <Picker.Item
                    label="doctoral degree"
                    value="doctoral degree"
                  />
                  <Picker.Item label="high school" value="high school" />
                </Picker>
              </View>
            </View>
            <View style={styles.inputwrap}>
              <Text style={styles.label}>Email : (private)</Text>
              <View style={{ ...styles.disabled, height: 40 }}>
                <Text style={{ fontSize: 16 }}>{userstate.Email}</Text>
              </View>
            </View>
            <View style={styles.inputwrap}>
              <Text style={styles.label}>My Pictures</Text>
              <View
                style={{
                  height: 120,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 0,
                }}
              >
                <View style={{ width: 40 }}>
                  {Pictures.length > 4 ? null : (
                    <TouchableOpacity
                      style={{
                        justifyContent: "center",

                        width: 50,
                        height: "100%",
                      }}
                      onPress={handlePress}
                    >
                      <Icon
                        name="plus"
                        size={26}
                        style={{ alignSelf: "flex-start" }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                {Pictures.map((item, index) => (
                  <View style={{ width: 60 }} key={index}>
                    <Icon
                      onPress={handleDelete.bind(this, item._id, item.url)}
                      style={{
                        position: "absolute",
                        top: 5,
                        left: 5,
                        zIndex: 2,
                      }}
                      color="red"
                      name="close"
                      size={30}
                    />
                    <Image
                      style={{ ...styles.EditImage }}
                      source={{
                        uri: item.url,
                      }}
                    />
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.inputwrap}>
              <Text style={styles.label}>About Me :</Text>
              <NiceTextInput
                name="aboutMe"
                multiline={true}
                maxLength={500}
                value={userstate.aboutMe}
                handleChange={handleChange}
                style={{ width: 300, ...styles.NiceText, height: 100 }}
              />
            </View>
            <View style={styles.inputwrap}>
              <Text style={styles.label}>Interested in :</Text>
              <View
                style={{ ...styles.disabled, height: 30, marginBottom: 40 }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 20,
                    marginTop: 10,
                  }}
                >
                  <View style={styles.checkbox}>
                    <CheckBox
                      tintColors={{ true: Colors.main, false: Colors.main }}
                      value={userstate.interestedInMen}
                      onChange={handleChecked.bind(this, 1)}
                    />
                    <Text>Men</Text>
                  </View>
                  <View style={styles.checkbox}>
                    <CheckBox
                      tintColors={{ true: Colors.main, false: Colors.main }}
                      onCheckColor="orange"
                      onFillColor="orange"
                      value={userstate.interestedInWomen}
                      onChange={handleChecked.bind(this, 2)}
                    />
                    <Text>Women</Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.inputwrap}>
              <Text style={styles.label}>Likes :</Text>
              <View style={{ ...styles.disabled }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 20,
                    marginTop: 10,
                  }}
                >
                  <View style={styles.checkbox}>
                    <CheckBox
                      tintColors={{ true: Colors.main, false: Colors.main }}
                      value={userstate.Music}
                      onChange={handleLikes.bind(this, "Music")}
                    />
                    <Text>Music</Text>
                  </View>
                  <View style={styles.checkbox}>
                    <CheckBox
                      tintColors={{ true: Colors.main, false: Colors.main }}
                      value={userstate.Smoking}
                      onChange={handleLikes.bind(this, "Smoking")}
                    />
                    <Text>Smoking</Text>
                  </View>
                  <View style={styles.checkbox}>
                    <CheckBox
                      tintColors={{ true: Colors.main, false: Colors.main }}
                      value={userstate.USA}
                      onChange={handleLikes.bind(this, "USA")}
                    />
                    <Text>USA</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 20,
                    marginTop: 10,
                  }}
                >
                  <View style={styles.checkbox}>
                    <CheckBox
                      tintColors={{ true: Colors.main, false: Colors.main }}
                      value={userstate.Bassketball}
                      onChange={handleLikes.bind(this, "Bassketball")}
                    />
                    <Text>Basketball</Text>
                  </View>
                  <View style={styles.checkbox}>
                    <CheckBox
                      tintColors={{ true: Colors.main, false: Colors.main }}
                      value={userstate.Camping}
                      onChange={handleLikes.bind(this, "Camping")}
                    />
                    <Text>Camping</Text>
                  </View>
                  <View style={styles.checkbox}>
                    <CheckBox
                      tintColors={{ true: Colors.main, false: Colors.main }}
                      value={userstate.Football}
                      onChange={handleLikes.bind(this, "Football")}
                    />
                    <Text>Football</Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 20,
                    marginTop: 10,
                  }}
                >
                  <View style={styles.checkbox}>
                    <CheckBox
                      tintColors={{ true: Colors.main, false: Colors.main }}
                      value={userstate.Party}
                      onChange={handleLikes.bind(this, "Party")}
                    />
                    <Text>Party</Text>
                  </View>
                  <View style={styles.checkbox}>
                    <CheckBox
                      tintColors={{ true: Colors.main, false: Colors.main }}
                      value={userstate.nightLife}
                      onChange={handleLikes.bind(this, "nightLife")}
                    />
                    <Text>nigh tLife</Text>
                  </View>
                  <View style={styles.checkbox}>
                    <CheckBox
                      tintColors={{ true: Colors.main, false: Colors.main }}
                      value={userstate.Animals}
                      onChange={handleLikes.bind(this, "Animals")}
                    />
                    <Text>Animals</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: 20,
                    marginTop: 10,
                  }}
                >
                  <View style={styles.checkbox}>
                    <CheckBox
                      tintColors={{ true: Colors.main, false: Colors.main }}
                      value={userstate.Drinking}
                      onChange={handleLikes.bind(this, "Drinking")}
                    />
                    <Text>Drinking</Text>
                  </View>
                  <View style={styles.checkbox}>
                    <CheckBox
                      tintColors={{ true: Colors.main, false: Colors.main }}
                      value={userstate.Drinking}
                      onChange={handleLikes.bind(this, "Religion")}
                    />
                    <Text>Religion</Text>
                  </View>
                </View>
                <SweetButtons
                  handlePress={handleUpdate}
                  color={Colors.main}
                  value="UPDATE"
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteImage: (id, url) => dispatch(DeleteMyImage(id, url)),
    upDateData: (data) => dispatch(upDateUserStartAxios(data)),
  };
};
const mapStateToProps = (state) => {
  return {
    CurrentUser: currentUserDetails(state),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithLoader
)(EditProfile);

const styles = StyleSheet.create({
  EditImage: {
    height: 100,
    width: 100,
    margin: 5,
    borderRadius: 3,
  },
  checkbox: { alignItems: "center", width: 100 },
  NiceText: {
    borderColor: Colors.background,
  },
  disabled: {
    borderRadius: 3,
    marginTop: 4,
    width: "90%",
    height: 300,
    marginBottom: 1,
    paddingHorizontal: 1,
  },
  label: {
    alignSelf: "flex-start",
    color: Colors.text,
  },
  inputwrap: {
    width: "100%",
    alignItems: "center",
  },
  inputwrap2: {
    width: "100%",
    flexDirection: "row",
  },
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
    paddingHorizontal: 1,
    paddingVertical: 1,

    width: "100%",
    height: "100%",
  },
  slider: {
    width: "100%",
  },
  tinythumb: {
    width: 60,
    height: 60,

    // marginRight: 14,
    // marginLeft: 8,
    borderRadius: 13,
  },
  wrapper: {
    margin: 3,
    width: 60,
    height: 60,
  },
  containerDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  Container: {
    // paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: Colors.background,
    paddingHorizontal: 0.2,
    flex: 1,
  },
});
