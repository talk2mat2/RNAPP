import KeyboardSpacer from "react-native-keyboard-spacer";
import SafeAreaView from "react-native-safe-area-view";
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

import { Colors } from "../constants/colors";
const STATUSBAR_HEIGHT = Platform === "ios" ? 20 : StatusBar.currentHeight;

const HomeChatScreen = () => {
  return (
    <View style={styles.HomeChat}>
      <View style={styles.HomeChatView}>
        <Text style={styles.HomeChatText}>
          Lorem ipsum dxxxxxxxxxxxxxxxxxt aliquip ex ea
        </Text>
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

const Chat = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.Container}>
        <View style={styles.Header}>
          <Text style={styles.headText1}>Chat </Text>
        </View>

        <ScrollView style={styles.ScrollViews}>
          <HomeChatScreen />
          <HomeChatScreen />

          <RemoteChatScreen message={"ghghvjghjgjhjvjhjgjhgjhjgjhgj"} />
          <RemoteChatScreen
            message={"ghghvjghjgjhhjjjjhjknjvjhjgjhgjhjgjhgj"}
          />
          <HomeChatScreen />
          <HomeChatScreen />
          <RemoteChatScreen
            message={
              "ghgjgLorem ipsum dolor sit amet, consectetur adipiscing elit, sed dojhgj"
            }
          />
          <RemoteChatScreen
            message={
              "ghgjgLorem ipsum dolor sit amet, consectetur adipiscing elit, sed dojhgj"
            }
          />
          <RemoteChatScreen
            message={
              "ghgjgLorem ipsum dolor sit amet, consectetur adipiscing elit, sed dojhgj"
            }
          />
          <RemoteChatScreen
            message={
              "ghgjgLorem ipsum dolor sit amet, consectetur adipiscing elit, sed dojhgj"
            }
          />
          <RemoteChatScreen
            message={
              "ghgjgLorem ipsum dolor sit amet, consectetur adipiscing elit, sed dojhgj"
            }
          />
          <RemoteChatScreen
            message={
              "ghgjgLorem ipsum dolor sit amet, consectetur adipiscing elit, sed dojhgj"
            }
          />
          <RemoteChatScreen
            message={
              "ghgjgLorem ipsum dolor sit amet, consectetur adipiscing elit, sed dojhgj"
            }
          />
        </ScrollView>

        <View style={styles.Chatinputsection}>
          <View style={styles.add}>
            <Text>+</Text>
          </View>
          <TextInput
            multiline={true}
            style={styles.typing}
            placeholder="Compose Message"
          ></TextInput>
          <View style={styles.send}>
            <Text>send</Text>
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

    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
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
    height: "10%",
    borderColor: Colors.silver,
    paddingBottom: 3,
    borderWidth: 1,
    backgroundColor: "#f4f4f4",
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
    paddingTop: STATUSBAR_HEIGHT,
    padding: 0.2,
  },
});
