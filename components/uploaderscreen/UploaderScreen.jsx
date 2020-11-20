import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import * as FileSystem from "expo-file-system";
import {
  Button,
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
import { uploadImages } from "../../redux/action";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

import { Colors } from "../constants/colors";
import UserDetailView from "../userDetailView/userDetailView";
import Icon from "react-native-vector-icons/Fontisto";
import Icon2 from "react-native-vector-icons/AntDesign";

const STATUSBAR_HEIGHT = Platform === "ios" ? 20 : StatusBar.currentHeight;

const UploaderScreen = (props) => {
  const [isVisible, setIsVisible] = useState(false);
  const [state, setState] = useState();
  const [image, setImage] = useState(null);
  // const handlePress = () => {
  //   setIsVisible(!isVisible);
  // };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("permission needed to upload ");
        }
      }
    })();
  }, []);
  const handleUpload = () => {
    props.uploadImages(image);
    props.handlepress();
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1.91, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 400, height: 400 }} />
      )}

      {image && (
        <TouchableOpacity
          onPress={handleUpload}
          style={{
            position: "absolute",
            margin: 0.1,
            width: 50,
            height: 50,
            right: 1,
            top: 10,
            zIndex: 2,
            elevation: 2,
            alignItems: "center",
          }}
        >
          <Icon name="check" size={22} />
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={pickImage}
        style={{
          margin: 0.1,
          width: 50,
          height: 50,

          zIndex: 2,
          elevation: 2,
          alignItems: "center",
        }}
      >
        <Icon2 name="addfile" size={35} color={Colors.main} />
      </TouchableOpacity>
    </View>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    uploadImages: (image) => dispatch(uploadImages(image)),
  };
};
export default connect(null, mapDispatchToProps)(UploaderScreen);

const styles = StyleSheet.create({
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
    paddingHorizontal: 3,
    paddingVertical: 1,

    width: "100%",
    height: "100%",
  },
  tinythumb: {
    width: 60,
    height: 60,
    margin: 3,
    marginRight: 14,
    marginLeft: 8,
    borderRadius: 13,
  },
  containerDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  Container: {
    // paddingTop: STATUSBAR_HEIGHT,
    backgroundColor: Colors.background,
    padding: 2,
  },
});
