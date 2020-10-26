import KeyboardSpacer from "react-native-keyboard-spacer";
import SafeAreaView from "react-native-safe-area-view";
import Icon from "react-native-vector-icons/FontAwesome";
import { sendMessage, getUserById } from "../../redux/action";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useRef, useEffect } from "react";

import {
  Modal,
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

import { Colors } from "../constants/colors";
import RemoteChatUserDetail from "../remoteChatUserDetailsecond/remoteChatUserDetailsecond";
const STATUSBAR_HEIGHT = Platform === "ios" ? 20 : StatusBar.currentHeight;
// import { socket } from "../../socket";
const HomeChatScreen = (props) => {
  return (
    <View style={styles.HomeChat}>
      <View style={styles.HomeChatView}>
        <Text style={styles.HomeChatText}>{props.message}</Text>
      </View>
    </View>
  );
};
const RemoteChatScreen = (props) => {
  return (
    <View style={styles.RemoteChat}>
      <View style={styles.RemoteChatView}>
        <Text style={styles.RemoteChatText}>{props.message}</Text>
      </View>
    </View>
  );
};

const Chat = (props) => {
  const [chatInputmesg, setChatInputmesg] = useState("");

  const [RemoteUserVisible, setRemoteUserVisible] = useState(false);
  const handlechatInputmesg = (text) => {
    setChatInputmesg(text);
  };
  const dispatch = useDispatch();
  const chatMsg = useSelector((state) => state.chatList);
  const currentUser = useSelector((state) => state.userInfo.user.userdata);
  const { sender } = props;

  // console.log([sender]["Pictures"][0]["url"]);
  // const userImaheUrl= Object.keys(chatMsg).includes(props.sender.id)?
  // alert(props.sender);
  // console.log(currentUser._id);
  useEffect(() => {});

  const handleSendMsg = async () => {
    //save message copy to redux
    const data = {
      msgFrom: sender.firstName,
      msgBody: chatInputmesg,
      msgFromId: sender._id,
    };
    dispatch(sendMessage(data));

    //send message copy to backend for dispatch to receicer remote
    const data2 = {
      msgFromId: currentUser._id,
      msgTo: sender._id,
      msgFrom: currentUser.firstName,
      msgBody: chatInputmesg,
    };
    await props.socket.emit("newMsg", data2);
    setChatInputmesg("");
  };
  // useEffect(() => {
  //   const fetchUserProfilePics = () => {
  //     const imageurl =
  //       chatMsg[props.sender.id]["remoteUserProfile"] &&
  //       chatMsg[props.sender.id]["remoteUserProfile"]["Pictures"] &&
  //       chatMsg[props.sender.id]["remoteUserProfile"]["Pictures"][0]["url"];

  //     setProfilePics(imageurl);
  //   };
  //   dispatch(getUserById(props.sender.id));
  //   fetchUserProfilePics();
  // }, []);
  const listAllCharts = () => {
    if (Object.keys(chatMsg).includes(sender._id)) {
      const newArr = chatMsg[sender._id]["chatss"];
      return newArr.map((values, index) => {
        return (
          <View key={index}>
            {values.origin === "remote" && (
              <RemoteChatScreen message={values.msg} />
            )}
            {values.origin === "local" && (
              <HomeChatScreen message={values.msg} />
            )}
          </View>
        );
      });
    }
  };
  const scrollViewRef = useRef();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Modal animationType="slide" visible={RemoteUserVisible}>
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 5,
            left: 3,
            zIndex: 2,
            width: 50,
          }}
          onPress={() => {
            setRemoteUserVisible(false);
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
        <RemoteChatUserDetail
          setRemoteUserVisible={setRemoteUserVisible}
          details={sender}
        />
      </Modal>
      <View style={styles.Container}>
        <View style={styles.Header}>
          <TouchableOpacity
            style={{
              zIndex: 2,
              left: 40,
              position: "absolute",
            }}
            onPress={() => {
              setRemoteUserVisible(true);
            }}
          >
            <View
              style={{
                flexDirection: "row",

                fontSize: 16,
                alignItems: "center",
              }}
            >
              <Image
                style={{
                  marginRight: 10,
                  height: 40,
                  width: 40,
                  borderRadius: 20,
                }}
                source={{
                  uri:
                    sender["Pictures"].length > 0
                      ? sender["Pictures"][0]["url"]
                      : null,
                }}
              />
              <Text>{sender.firstName}</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.headText1}>Chat </Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          style={{ ...styles.ScrollViews, flex: 1 }}
        >
          {listAllCharts()}
        </ScrollView>

        <View style={styles.Chatinputsection}>
          <View style={styles.add}>
            <Text>+</Text>
          </View>
          <TextInput
            onChangeText={(text) => handlechatInputmesg(text)}
            value={chatInputmesg}
            multiline={true}
            style={styles.typing}
            placeholder="Compose Message"
          ></TextInput>

          <View style={styles.send}>
            <TouchableOpacity
              style={{
                height: "100%",
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={chatInputmesg.length > 0 ? handleSendMsg : null}
            >
              <Icon
                name="send"
                size={25}
                color={chatInputmesg.length > 0 ? Colors.googleblue : "silver"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  add: {
    height: "100%",
    width: "15%",
    padding: 3,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.silver,
    borderWidth: 2,
    borderRadius: 10,
  },
  typing: {
    height: "100%",
    width: "70%",
    padding: 10,
    borderColor: Colors.silver,
    borderRadius: 20,
    fontSize: 15,
    borderWidth: 1,
  },
  send: {
    flex: 1,
    height: "100%",
    width: "15%",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",

    borderColor: Colors.silver,
    borderWidth: 2,
  },
  sendButton: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    backgroundColor: "red",
  },
  Detaillist: {
    flexDirection: "row",
    alignItems: "center",
  },
  HomeChat: {
    flexDirection: "row",
    justifyContent: "flex-end",
    minHeight: 30,
    width: "100%",
    marginVertical: 6,
  },
  RemoteChat: {
    flexDirection: "row",

    minHeight: 30,
    width: "100%",
    marginVertical: 6,
  },
  HomeChatView: { minWidth: "10%", marginRight: 5 },
  RemoteChatView: { minWidth: "10%", marginLeft: 5 },
  HomeChatText: {
    color: Colors.white,
    backgroundColor: Colors.googleblue,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,

    padding: 9,
  },
  RemoteChatText: {
    color: "black",

    backgroundColor: Colors.silver,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,

    padding: 9,
  },
  Chatinputsection: {
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    borderColor: Colors.silver,
    paddingBottom: 3,
    borderWidth: 1,
    backgroundColor: "#f4f4f4",
  },
  headText: { fontSize: 18 },
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
    paddingHorizontal: 3,
    paddingVertical: 1,

    width: "100%",
    height: "85%",
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
    flex: 1,
    // paddingTop: STATUSBAR_HEIGHT,
    padding: 0.2,
  },
});
