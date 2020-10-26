import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CheckBox from "@react-native-community/checkbox";
import { currentUserDetails } from "../../redux/selector";
import { connect, useSelector, useDispatch } from "react-redux";
import axios from "axios";
import InfiniteScroll from "react-native-infinite-scrolling";
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
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styled from "styled-components/native";
import { Colors } from "../constants/colors";
import UserDetailView from "../userDetailView/userDetailView";
import Chat from "../Chat/Chat";
import UserProfile from "../userProfile/UserProfile";
const STATUSBAR_HEIGHT = Platform === "ios" ? 20 : StatusBar.currentHeight;

const DetailLisiView = (props) => {
  return (
    StatusBar,
    (
      <View style={{ ...styles.Detaillist }}>
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
                  color: "green",
                  fontSize: 13,
                  elevation: 4,
                  textShadowColor: Colors.white,
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

                  textShadowColor: Colors.white,
                  shadowOffset: { width: -1, height: 1 },
                  textShadowRadius: 10,
                }}
              >
                offline
              </Text>
            )}
          </View>

          <Image
            style={styles.tinythumb}
            source={{
              uri: props.url,
            }}
          ></Image>
        </TouchableOpacity>
      </View>
    )
  );
};

const searchsProfile = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [pageno, setPageno] = useState(1);
  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState({});
  const [limit] = useState(51);
  const handlePress = (value) => {
    const targetUser = searchResult.find((data) => data._id === value);
    // console.log(targetUser);

    targetUser ? setUserDetail(targetUser) : null;
    setIsVisible(!isVisible);
  };
  const Token = useSelector((state) => state.userInfo.user.token);
  const handleMenuVisible = () => {
    setMenuVisible(!menuVisible);
  };
  useEffect(() => {
    fetchMoreData();
  }, []);

  const checkheight = (e) => {
    var windowHeight = Dimensions.get("window").height,
      height = e.nativeEvent.contentSize.height + 5,
      offset = e.nativeEvent.contentOffset.y;
    if (windowHeight + offset >= height) {
      fetchMoreData();
      console.log("end of pa");
    }
  };
  const fetchMoreData = () => {
    // startLoading();

    setLoading(true);
    //const url = `https://jsonplaceholder.typicode.com/photos/?_page=${pageno}&_limit=${limit}`;
    const url = "https://server-me2love.herokuapp.com/api/v1/searchUsers";
    const headers = {
      "Content-Type": "application/json",
      Authorization: Token,
    };
    axios
      .get(url, { headers })
      .then((value) => {
        console.log(value.data.userdata);
        setSearchResult([...searchResult, ...value.data.userdata]);
        setLoading(false);
        setPageno(pageno + 1);

        // endLoading();
      })
      .catch((error) => setSearchResult([{ url: "error" }]));
  };
  const mapSearchResult = () => {
    return searchResult.map((user) => (
      <DetailLisiView
        online={user.isOnline}
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
        <Icon
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
        />
        <View>
          <Text style={{ ...styles.headText1 }}>
            <Icon name="heart" size={25} color={Colors.main} />
            {"   "}
            {props.CurrentUser &&
              props.CurrentUser.county &&
              `Nearby ${props.CurrentUser.county},${props.CurrentUser.state}`}
            {"   "}
            <Icon name="heart" size={25} color={Colors.main} />
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
        <View style={{ ...styles.menu }}>
          <View style={{ ...styles.menuBox }}>
            <Text>male</Text>
            <CheckBox
              tintColors={{ true: Colors.main, false: Colors.main }}
              // value={userstate.interestedInMen}
            />
          </View>
          <View style={{ ...styles.menuBox }}>
            <Text>females </Text>
            <CheckBox
              tintColors={{ true: Colors.main, false: Colors.main }}
              // value={userstate.interestedInMen}
            />
          </View>
        </View>
      ) : null}
      <Modal visible={isVisible} animationType="slide">
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
          {mapSearchResult()}
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
    backgroundColor: Colors.background,
    position: "absolute",
    top: 51,
    width: 100,
    height: 80,
    right: 2,
    zIndex: 2,
    padding: 7,
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
