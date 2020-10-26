import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
// import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import io, { Socket } from "socket.io-client";
import Myprofile from "./components/myProFile/myProfile";
import { registerForPushNotificationsAsync } from "./pushNotify.js";
import * as Notifications from "expo-notifications";
import Welcome from "./Welcome";
import { connect, useSelector, useDispatch } from "react-redux";
import { Alert, AppState } from "react-native";

import Chat from "./components/Chat/Chat";
// import openGeocoder from "node-open-geocoder";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeComponent from "./components/home.component/Home.component";
import { startGetUserLocationAsync, saveNewMessage } from "./redux/action";

function Index(props) {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [socketio, setSocketio] = useState(null);
  var errorHandler = function (errorObj) {
    Alert.alert("unable to match current location");
  };
  const Dispatch = useDispatch();
  const { token } = props.currentuser.user;
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {}
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const schedulePushNotification = async (data) => {
    const { msgFrom, msgBody } = data;
    await Notifications.scheduleNotificationAsync({
      content: {
        title: msgFrom,
        body: msgBody,
        data: { data: "goes here" },
      },
      trigger: null,
    });
  };

  useEffect(() => {
    if (props.currentuser.user.token) {
      const userid = props.currentuser.user.userdata._id;
      const socket = io("http://server-me2love.herokuapp.com", {
        query: { Authorization: userid },
      });
      setSocketio(socket);
      socket.once("online", (data) => {});
      socket.on("newMsgReceived", (data) => {
        // const { msgFrom, msgBody } = data;
        Dispatch(saveNewMessage(data));
        schedulePushNotification(data);
      });
    } else {
      console.log("logged out");

      setSocketio(null);

      // console.log("not logged in");
      // console.log(props.currentuser);
    }

    const getUserlocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            props.getUserLocation(position);
            // successHandler(position);
          },
          (error) => errorHandler(error),
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      } else {
        console.log("Not Available");
      }
    };

    getUserlocation();
  }, [token]);
  const Stack = createStackNavigator();
  return (
    <React.Fragment>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="Welcome"
        >
          {!props.currentuser.user.token ? (
            <Stack.Screen name="Welcome" component={Welcome} />
          ) : (
            <Stack.Screen
              name="HomeWelcome"
              children={() => (
                <HomeComponent
                  socket={socketio}
                  loading={props.currentuser.loading}
                />
              )}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    currentuser: state.userInfo,
    currentuserLocation: state.userInfo.userLocation,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserLocation: (position) =>
      dispatch(startGetUserLocationAsync(position)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
