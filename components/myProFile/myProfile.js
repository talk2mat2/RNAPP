import React, { useState } from "react";
import Swiper from "react-native-swiper";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  Dimensions,
  Modal,
  View,
  StatusBar,
  Text,
  Image,
  StyleSheet,
  Button,
  ScrollView,
  Platform,
} from "react-native";
import WithLoader from "../Loader/LoaderHoc";

import { connect } from "react-redux";
import { compose } from "redux";
import { logOutstart } from "../../redux/action";
import { Colors } from "../constants/colors";
const STATUSBAR_HEIGHT = Platform === "ios" ? 20 : StatusBar.currentHeight;
import { currentUserDetails, loading } from "../../redux/selector";
import { TouchableOpacity } from "react-native-gesture-handler";
import EditProfile from "../edit.profile/editProfile";

const Myprofile = (props) => {
  const [isvisible, setIsvisible] = useState(false);
  const {
    Animals,
    Drinking,
    Smoking,
    USA,
    Bassketball,
    Camping,
    Football,
    nightLife,
    Music,
    Party,
    Education,
    country,
    firstName,
    lastName,
    isVerified,
    lastSeen,
    offLineMessage,
    interestedInMen,
    interestedInWomen,
    Pictures,
    Email,
    Gender,
    Meta,
    Religion,
    state,
    aboutMe,
    county,
    _id,
    Age,
    RegisterdDate,
  } = props.CurrentUser ? props.CurrentUser : 1;

  const handleVisibleModal = () => {
    setIsvisible(!isvisible);
  };
  const handleLogout = () => {
    // props.navigation.navigate("Welcome");
    props.logout();
    props.socket.disconnect();
  };
  const ListUserImage = () => {
    const win= Dimensions.get('window')
    return Pictures ? (
      Pictures.map((item, index) => (
        <View key={index} style={styles.slider}>
          <Image resizeMode="contain"
             style={{ ...styles.tinyLogo,width:win.width,height:win.width }}
            source={{
              uri: item.url,
            }}
          />
        </View>
      ))
    ) : (
      <View></View>
    );
  };

  return (
    <View style={styles.Container}>
      <Modal onRequestClose={handleVisibleModal} style={{ flex: 1 }} visible={isvisible} animationType="slide">
        <View style={{ flex: 1 }}>
          <EditProfile
            loading={props.loading}
            handleVisibleModal={handleVisibleModal}
          />
        </View>
      </Modal>
      <ScrollView style={styles.ScrollViews}>
        <View style={styles.Myprofile}>
          <Swiper
            loop={true}
            autoplay={true}
            style={styles.wrapper}
            showsButtons={true}
            dotColor="grey"
          >
            {/* <View style={styles.slider}>
              <Image
                style={{ ...styles.tinyLogo }}
                source={require("../../assets/image2.jpg")}
              />
            </View>
            <View style={styles.slider}>
              <Image
                style={{ ...styles.tinyLogo }}
                source={{ url: `${Pictures[0].url}` }}
              />
            </View>
            <View style={styles.slider}>
              <Image
                style={{ ...styles.tinyLogo }}
                source={require("../../assets/image3.jpg")}
              />
            </View>
            <View style={styles.slider}>
              <Image
                style={{ ...styles.tinyLogo }}
                source={require("../../assets/logo192.png")}
              />
            </View> */}
            {ListUserImage()}
          </Swiper>

          <View style={styles.UserDetail}>
            <View style={{ marginVertical: 10, width: "100%" }}>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                {firstName} {lastName}
              </Text>

              <Text style={styles.smallText}>
                <Icon name="user" size={12} /> {Age ? `${Age} years` : null}
              </Text>
              <Text style={{ ...styles.smallText }}>
                <Icon name="map-pin" size={12} /> {county}, {state}
              </Text>
              <Text
                onPress={handleVisibleModal.bind(this)}
                style={{ right: 0, position: "absolute" }}
              >
                edit profile <Icon name="edit" size={40} />
              </Text>
            </View>

            <View
              style={{
                marginTop: 20,
                marginBottom: 20,
                minHeight: 100,
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={styles.smallText2}>About Me </Text>
              <Text
                style={{ ...styles.smallText, width: "100%", fontSize: 20 }}
              >
                {aboutMe}
              </Text>
            </View>
            <View style={{ marginBottom: 20, minHeight: 100, width: "100%" }}>
              <Text style={{ ...styles.smallText2, alignSelf: "center" }}>
                Likes
              </Text>
              {Music && (
                <Text>
                  <Icon name="music" size={20} /> Music
                </Text>
              )}
              {Party && (
                <Text>
                  <Icon name="gg-circle" color={Colors.text} size={20} /> Party
                </Text>
              )}
              {Football && (
                <Text>
                  <Icon name="soccer-ball-o" color={Colors.text} size={20} />{" "}
                  Football
                </Text>
              )}
              {USA && (
                <Text>
                  <Icon name="plane" color={Colors.text} size={20} /> USA
                </Text>
              )}
              {Camping && (
                <Text>
                  <Icon name="gg-circle" color={Colors.text} size={20} />{" "}
                  Camping
                </Text>
              )}
              {Smoking && (
                <Text>
                  <Icon name="gg-circle" color={Colors.text} size={20} />{" "}
                  Smoking
                </Text>
              )}
              {Bassketball && (
                <Text>
                  <Icon name="gg-circle" color={Colors.text} size={20} />{" "}
                  Basketball
                </Text>
              )}

              {nightLife && (
                <Text>
                  <Icon name="cc-diners-club" color={Colors.text} size={20} />{" "}
                  Night Life
                </Text>
              )}
              {Drinking && (
                <Text>
                  <Icon name="glass" color={Colors.text} size={20} /> Drinking
                </Text>
              )}
              {Religion && <Text>Religion</Text>}
              {Animals && (
                <Text>
                  <Icon name="bullseye" color={Colors.text} size={20} /> Animals
                </Text>
              )}
            </View>
            <View
              style={{
                marginBottom: 20,
                minHeight: 100,
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={{ ...styles.smallText2 }}>Education</Text>
              <Text style={{ width: "100%" }}>
                <Icon name="user" color={Colors.text} size={20} /> {Education}
              </Text>
            </View>
            <View
              style={{
                marginBottom: 20,
                minHeight: 100,
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text style={{ ...styles.smallText2 }}>Interested in</Text>
              <View style={{ width: "100%" }}>
                {interestedInMen && (
                  <Text>
                    <Icon name="male" color={Colors.text} size={20} /> Men
                  </Text>
                )}
                {interestedInWomen && (
                  <Text>
                    <Icon name="female" color={Colors.text} size={20} />
                    Women
                  </Text>
                )}
              </View>
            </View>

            <Button
              title="logout"
              onPress={() => {
                handleLogout();
              }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: '100%',
    height: 400,
    margin: 9,
    borderRadius: 2,
  },
  smallText: {
    color: Colors.text,
    margin: 1,
    fontSize: 15,
    fontFamily: "sans-serif",
  },
  smallText2: {
    color: Colors.text,
    fontWeight: "bold",
    margin: 1,
    fontSize: 18,
    fontFamily: "sans-serif",
  },
  Container: {
    // paddingTop: STATUSBAR_HEIGHT,
    padding: 0.3,
    flex: 1,
    backgroundColor: Colors.background,
  },
  ScrollViews: {
    paddingHorizontal: 3,
    paddingVertical: 1,
    flex: 1,
  },
  Myprofile: {
    flex: 1,
    alignItems: "center",
    height: "100%",
  },
  UserDetail: {
    marginTop: 5,
    alignItems: "center",
    width: "90%",
  },
  wrapper: {
    height: 450,
  },
  slider: {
    height: 400,
    flex: 2,
  },
});

const mapDispatchToProps = (dispatch) => {
  return { logout: () => dispatch(logOutstart()) };
};
const mapStateToProps = (state) => {
  return { loading: loading(state), CurrentUser: currentUserDetails(state) };
};
export default connect(mapStateToProps, mapDispatchToProps)(Myprofile);
