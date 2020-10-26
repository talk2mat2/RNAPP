import React from "react";
import { View, Text } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Chatlist from "../chatlist/chatlist";
import Myprofile from "../myProFile/myProfile";
import Searchsprofile from "../searchs/searchs";
import { Colors } from "../constants/colors";
const Tab = createMaterialBottomTabNavigator();
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// const HomeComponent
import WithLoader from "../Loader/LoaderHoc";

const HomeComponent = (props) => {
  return (
    <Tab.Navigator
      initialRouteName="myprofile"
      activeColor={Colors.main}
      barStyle={{ backgroundColor: Colors.white, height: 50 }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "People",
          tabBarIcon: ({ color }) => (
            <Icon name="heart" color={color} size={22} />
          ),
        }}
        name="Searchs"
        children={() => <Searchsprofile socket={props.socket} />}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Chat list",
          tabBarIcon: ({ color }) => (
            <Icon name="comments" color={color} size={23} />
          ),
        }}
        name="Chatlist"
        children={() => <Chatlist socket={props.socket} />}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "My Profile",
          tabBarIcon: ({ color }) => (
            <Icon name="user" color={color} size={23} />
          ),
        }}
        name="My Profile"
        children={() => <Myprofile socket={props.socket} loading={false} />}
        // component={Myprofile}
      />
    </Tab.Navigator>
  );
};

export default WithLoader(HomeComponent);
