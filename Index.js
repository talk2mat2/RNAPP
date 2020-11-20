import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useRef } from "react";
// import Geolocation from "@react-native-community/geolocation";
import axios from "axios";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import io, { Socket } from "socket.io-client";
import Myprofile from "./components/myProFile/myProfile";
//import { registerForPushNotificationsAsync } from "./pushNotify.js";
import * as Notifications from "expo-notifications";
import Welcome from "./Welcome";
import { connect, useSelector, useDispatch } from "react-redux";
import { Alert, AppState } from "react-native";
// import * as BackgroundFetch from 'expo-background-fetch'

import Chat from "./components/Chat/Chat";
// import openGeocoder from "node-open-geocoder";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeComponent from "./components/home.component/Home.component";
import { startGetUserLocationAsync, saveNewMessage } from "./redux/action";
import { setMountedPage } from "./redux/action.types";

function Index(props) {
  const setting = useSelector((state) => state.Settings);
  const mountedPageId = useSelector((state) => state.mountedPage.mountedPageId);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [mountedPage,setMounted] = useState({mounted:mountedPageId })
  const notificationListener = useRef();
  const responseListener = useRef();
  const id_page = useRef();
  const [socketio, setSocketio] = useState(null);
  var errorHandler = function (errorObj) {
    Alert.alert("unable to match current location");
  };
  const Dispatch = useDispatch();
  const { token } = props.currentuser.user;
  useEffect(() => {
    if (props.currentuser.user.token) {
      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: setting.alert,
          shouldPlaySound: setting.sound,
          shouldSetBadge: false,
        }),
      });
      async function registerForPushNotificationsAsync() {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
          );
          let finalStatus = existingStatus;
          if (existingStatus !== "granted") {
            const { status } = await Permissions.askAsync(
              Permissions.NOTIFICATIONS
            );
            finalStatus = status;
          }
          if (finalStatus !== "granted") {
            alert("Failed to get push token for push notification!");
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
        } else {
          alert("Must use physical device for Push Notifications");
        }

        if (Platform.OS === "android") {
          Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C",
            enableVibrate: true,
          });
        }

        return token;
      }
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
    }
  }, [token, setting]);

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
useEffect(()=>{

  // setMounted({mounted:mountedPageId})
  id_page.current=(mountedPageId)
  
 
  // return ()=>{
  //   socket.disconnect()
  // }
  
  
  // console.log("mountedPageId['mountedPageId']",mountedPageId['mountedPageId'])
},[mountedPageId])

const handleNewMsg=(data) => {
  console.log("handle callws",id_page.current)
  // const { msgFrom, msgBody } = data;
  // console.log('from',data['msgFromId'])
  // console.log("mounted page",mountedPageId)
 
 if(data['msgFromId']!=id_page.current){
   //console.log("--",data['msgFromId'],mountedPage.mounted)

  data.unreadMsg=true}
  Dispatch(saveNewMessage(data));
  schedulePushNotification(data);
 
 
  
}
  useEffect(() => {
    if (props.currentuser.user.token) {
      const userid = props.currentuser.user.userdata._id;
      const socket = io("http://server-me2love.herokuapp.com", {
        query: { Authorization: userid },
      });
      setSocketio(socket);
      socket.once("online", (data) => {});
      socket.on("newMsgReceived",data=> handleNewMsg(data))
    
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
