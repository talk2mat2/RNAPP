import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";
import { UpdateSettings } from "../../redux/action";
import { currentUserDetails } from "../../redux/selector";
import { connect, useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { Picker } from "@react-native-community/picker";
import InfiniteScroll from "react-native-infinite-scrolling";
import SweetButtons from "../reusables.components/buttons";
import {
  FlatList,
  ActivityIndicator,
  Dimensions,
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
  Linking
} from "react-native";
import avatar from "../../assets/avatar.png";
const avatarUri = Image.resolveAssetSource(avatar).uri;
import Icon from "react-native-vector-icons/FontAwesome";
import styled from "styled-components/native";
import { Colors } from "../constants/colors";
import UserDetailView from "../userDetailView/userDetailView";
import Chat from "../Chat/Chat";
import UserProfile from "../userProfile/UserProfile";
const STATUSBAR_HEIGHT = Platform === "ios" ? 20 : StatusBar.currentHeight;

const DetailLisiView = (props) => {
  const win= Dimensions.get('window')
  return (
    StatusBar,
    (
      <View style={{ ...styles.Detaillist, width:win.width/3.2,height:win.width /3.2}}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => {
            props.onPress();
          }}
        >
          <View style={{ position: "absolute", zIndex: 2 }}>
            {props.online ? (
              <Text
                style={{
                  fontFamily: "sans-serif",
                  color: "green",
                  fontSize: 13,
                  marginLeft: 4,
                  elevation: 4,
                  textShadowColor: "#ffffff",
                  shadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 10,
                }}
              >
                online
              </Text>
            ) : (
              <Text
                style={{
                  color: "red",
                  fontSize: 13,
                  fontFamily: "sans-serif",
                  marginLeft: 4,
                  textShadowColor: Colors.white,
                  shadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 10,
                }}
              >
                offline
              </Text>
            )}

            <Text
              style={{
                fontFamily: "sans-serif",
                marginLeft: 4,
                color: Colors.white,
                elevation: 2,
                fontSize: 13,
                textShadowColor: "black",
                shadowOffset: { width: -0.4, height: 2 },
                textShadowRadius: 15,
              }}
            >
              {props.distance ? props.distance + "km" : null}
            </Text>
          </View>

          <Image
            style={styles.tinythumb}
            source={{
              uri: props.url || avatarUri,
            }}
          ></Image>
        </TouchableOpacity>
      </View>
    )
  );
};

const searchsProfile = (props) => {
  const setting = useSelector((state) => state.Settings);
  const [isVisible, setIsVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [pageno, setPageno] = useState(0);
  const [loading, setLoading] = useState(false);
  const [settingState, setSettings] = useState({
    Gender: setting.Gender,
    sound: setting.sound,
    alert: setting.alert,
  });
  const [userDetail, setUserDetail] = useState({});
  const dispatch = useDispatch();
  const [limit] = useState(51);
  const Token = useSelector((state) => state.userInfo.user.token);
  const userState = useSelector((state) => state.userInfo.userLocation);

  const myState =
    (props.CurrentUser && props.CurrentUser.state) || userState.state;

  const handlePress = (value) => {
    const targetUser = searchResult.find((data) => data._id === value);
    // console.log(targetUser);

    targetUser ? setUserDetail(targetUser) : null;
    setIsVisible(!isVisible);
    menuVisible&&setMenuVisible(!menuVisible);
  };

  const handleMenuVisible = () => {
    setMenuVisible(!menuVisible);
  };
  const handleSave = () => {
    // console.log(settingState, setting);

    dispatch(UpdateSettings(settingState));
    setMenuVisible(false);
    setSearchResult([]);
    setPageno(0)
  };
  useEffect(() => {
    // console.log(setting);
    
    fetchMoreData();
  }, [setting]);
 

  
  const checkheight = (e) => {
    var windowHeight = Dimensions.get("window").height,
      height = e.nativeEvent.contentSize.height + 2,
      offset = e.nativeEvent.contentOffset.y;
    if (windowHeight + offset >= height) {
      fetchMoreData();
      // console.log("end of pa");
    }
  };
  const handlecheck = (value) => {
    setSettings({
      ...settingState,
      [value]: !settingState[value],
    });
  };

  var fetchMoreData = () => {
    const filters1 = {
      $and: [
        { $or: [{ Gender: "male" }, { Gender: "female" }] },
        { state: myState },
      ],
    };
    const filters2 = { $and: [{ Gender: "male" }, { state: myState }] };
    const filters3 = { $and: [{ Gender: "female" }, { state: myState }] };

    // startLoading();
    const selectedFilter =
      settingState.Gender === "both"
        ? filters1
        : settingState.Gender === "male"
        ? filters2
        : settingState.Gender === "female"
        ? filters3
        : null;
    setLoading(true);
    const filters = encodeURIComponent(JSON.stringify(selectedFilter));
    //const url = `https://jsonplaceholder.typicode.com/photos/?_page=${pageno}&_limit=${limit}`;
    const url =
      "https://server-me2love.herokuapp.com/api/v1/searchUsers?filters=" +
      filters+'&pageNo='+pageno;
    const headers = {
      "Content-Type": "application/json",
      Authorization: Token,
    };
    axios
      .get(url, { headers })
      .then((value) => {
        // console.log(value.data.userdata);
        setSearchResult([...searchResult, ...value.data.userdata]);
        setLoading(false);
        setPageno(pageno + 1);

        // endLoading();
      })
      .catch((error) =>
        // setSearchResult([{}])
        console.log(error)
      );
  };
  const mapSearchResult = () => {
    return searchResult.map((user) => (
      <DetailLisiView
        online={user.isOnline}
        distance={
          typeof user.distance !== "undefined"
            ? (user.distance / 1000).toFixed(1)
            : null
        }
        key={user._id}
        url={user.Pictures.length > 0 ? user.Pictures[0]["url"] : null}
        onPress={handlePress.bind(this, user._id)}
      />
    ));
  };

  return (
    <View style={{ ...styles.Container, flex: 1 }}>
      <StatusBar />
      <View style={{ ...styles.Header }}>
        {/* <Icon
          style={{
            position: "absolute",
            left: 3,
            zIndex: 2,
            width: 200,
            height: 30,
          }}
          color={Colors.grey}
          name="search"
          size={28}
        /> */}
        <View>
          <Text style={{ ...styles.headText1 }}>
          <Icon name="heart" size={25} color={Colors.main} />
            {"   "}
            {props.CurrentUser &&
              props.CurrentUser.county &&
              `Nearby ${props.CurrentUser.county},${props.CurrentUser.state}`}
            {"   "}
         
          </Text>
        </View>

        <MaterialCommunityIcons
          onPress={handleMenuVisible}
          style={{
            position: "absolute",
            right: 1,
            zIndex: 2,
            height: 40,
            width: 40,
          }}
          name="dots-vertical"
          size={30}
          color={Colors.grey}
        />
      </View>
      {menuVisible ? (
        <View style={{ ...styles.menu, paddingTop: 20 ,paddingBottom:5}}>
          <Text style={{ color: Colors.text }}>Show Gender: </Text>
          <Picker
            selectedValue={settingState.Gender}
            itemStyle={{ height: 50, width: 50 }}
            style={{
              borderColor: "silver",
              marginVertical: 0.3,
              height: 50,
              width: "90%",
              color: Colors.grey,
            }}
            onValueChange={(itemValue, itemIndex) =>
              setSettings({ ...settingState, Gender: itemValue })
            }
          >
            <Picker.Item label="both" value={"both"} />
            <Picker.Item label="males" value={"male"} />
            <Picker.Item label="females" value={"female"} />
          </Picker>

          <Text style={{ color: Colors.text }}>Notifications: </Text>
          <View style={{ ...styles.menuBox }}>
            <Text style={{ color: Colors.grey }}>sounds</Text>
            <CheckBox
              // onPress={setSettings({
              //   ...settingState,
              //   sound: !settingState.sound,
              // })}
              onChange={handlecheck.bind(this, "sound")}
              tintColors={{ true: Colors.main, false: Colors.main }}
              value={settingState.sound}
            />
          </View>
          <View style={{ ...styles.menuBox }}>
            <Text style={{ color: Colors.grey }}>alert </Text>
            <CheckBox
              onChange={handlecheck.bind(this, "alert")}
              tintColors={{ true: Colors.main, false: Colors.main }}
              value={settingState.alert}
            />
          </View>
          <SweetButtons
            handlePress={handleSave}
            height={30}
            width={150}
            value="save"
            color={Colors.main}
          />
         <View style={{alignItems:"center", marginTop:9}}>
         <Text style={{fontSize:10,marginVertical:4}}>version 1.0.3</Text>
         <Text onPress={()=>{
               menuVisible&&setMenuVisible(!menuVisible);
           Linking.openURL('https://server-me2love.herokuapp.com/about&privacy')}} style={{fontSize:12,textDecorationLine:"underline"}}>About & Privacy Notice</Text>
         </View>
        </View>
      ) : null}
      <Modal  onRequestClose={handlePress}
       visible={isVisible} animationType="slide">
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 5,
            left: 3,
            zIndex: 2,
            width: 200,
            height: 200,
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
            name="arrow-left"
            size={27}
          />
        </TouchableOpacity>
        <UserProfile socket={props.socket} userDetail={userDetail} />
      </Modal>

      <ScrollView onScroll={checkheight.bind(this)} style={styles.ScrollViews}>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <FlatList
          numColumns={3}
          data={searchResult}
          renderItem={(item) => (
            <DetailLisiView searchResult={item} onPress={handlePress} />
          )}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        /> */}
          {searchResult.length > 0 ? mapSearchResult() : null}
        </View>
      </ScrollView>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
    </View>
  );
};
const mapStateToProps = (state) => {
  return { CurrentUser: currentUserDetails(state) };
};

export default connect(mapStateToProps)(searchsProfile);

const styles = StyleSheet.create({
  menuBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menu: {
    borderColor: "silver",
    borderWidth: 2,
    backgroundColor: Colors.background,
    position: "absolute",
    top: 51,
    width: 200,
    height: 300,
    right: 2,
    zIndex: 2,
    paddingHorizontal: 7,
    borderRadius: 8,
  },
  Detaillist: {
    width: "31%",
    height: 120,
    margin: 2,
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
    flexDirection: "row",
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
  tinythumb: {
    width: "100%",
    height: "100%",

    borderRadius: 5,
  },

  Container: {
    // paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: Colors.background,
    padding: 1,
  },
});
