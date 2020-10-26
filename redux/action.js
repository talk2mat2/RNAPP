import * as actiontypes from "./action.types";
import axios from "axios";
import { currentUserToken, currentUserDetails } from "./selector";
import { Store } from "./store";
const State = Store.getState();

const loginUsersstart = () => ({
  type: "loginUser_Start",
  loading: true,
});
const upDateUsersstart = () => ({
  type: actiontypes.upDateUser_Start,
  loading: true,
});

export const loginUserSUcess = (user) => {
  return {
    type: actiontypes.loginUser_Success,
    loading: false,
    payload: user,
  };
};
export const upDateUserSUcess = (user) => {
  return {
    type: actiontypes.upDateUser_Success,
    loading: false,
    payload: user,
  };
};

const upDateUserFailure = (err) => {
  return {
    type: actiontypes.upDateUser_failure,
    loading: false,
    payload: err,
  };
};
const loginUserFailure = (err) => {
  return {
    type: actiontypes.loginUser_failure,
    loading: false,
    payload: err,
  };
};
export const ClearErrorMessage = () => {
  return {
    type: actiontypes.ClearErrorMessage,
  };
};

export const logOutstart = () => {
  return {
    type: actiontypes.logOut_Start,
    loading: false,
    payload: {},
  };
};

const getUserLocation_success = (userLocation) => {
  return {
    type: actiontypes.getUserLocation_success,
    payload: userLocation,
  };
};
const DeleteMyImagestart = (id) => {
  // console.log(id);
  // const updated = [
  //   ...getState().userInfo.user.userdata.Pictures.filter(
  //     (items) => items._id != id
  //   ),
  // ];
  return {
    type: actiontypes.DeleteMyImage,
    payload: id,
  };
};
// export const mm = async (id) => {
//   console.log("del tart", id);
//   return async (dispatch, getState) => {
//     const updated = [
//       ...getState().userInfo.user.userdata.Pictures.filter(
//         (items) => items._id != id
//       ),
//     ];
//     await dispatch({
//       type: actiontypes.DeleteMyImage,
//       payload: updated,
//     });
//   };
// };

export const DeleteMyImage = (id, url) => {
  const spliturl = url.split("/");

  return async (dispatch, getState) => {
    await dispatch(DeleteMyImagestart(id));
    const DeletedPicture = Store.getState().userInfo.user.userdata["Pictures"];
    dispatch(upDateUserStartAxios({ Pictures: DeletedPicture }));
    const url = `http://server-me2love.herokuapp.com/api/v1/image/delete/${
      spliturl[spliturl.length - 1]
    }`;
    const Token = getState().userInfo.user.token;

    const headers = {
      "Content-Type": "application/json",
      Authorization: Token,
    };

    axios
      .delete(url, { headers })
      .then((success) => console.log(success.data))
      .catch((err) => console.log(err));
  };
};

export var upDateUserStartAxios = (data) => {
  return async (dispatch, getState) => {
    // console.log("dispatch data", data);
    await dispatch(upDateUsersstart());
    const Token = getState().userInfo.user.token;

    const headers = {
      "Content-Type": "application/json",
      Authorization: Token,
    };

    const jsondata = JSON.stringify(data);

    axios
      .post("https://server-me2love.herokuapp.com/api/v1/Update", jsondata, {
        headers: headers,
      })
      .then((res) => {
        dispatch(upDateUserSUcess(res.data));
        // console.log("respnse is", res.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
          console.log(error.response.headers);
        }
        dispatch(upDateUserFailure(error));
      });
  };
};

export const startGetUserLocationAsync = (position) => {
  return (dispatch, getState) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lon=${position.coords.longitude}&lat=${position.coords.latitude}&format=json&addressdetails=1`;

    const options = {
      method: "GET",
      headers: { "User-Agent": "node-open-geocoder" },
      url,
    };
    axios(options)
      .then((res) => {
        const data = {
          county: res.data.address.county,
          country: res.data.address.country,
          state: res.data.address.state,
        };
        getState().userInfo.user.token && dispatch(upDateUserStartAxios(data));
        dispatch(getUserLocation_success(res.data.address));
      })
      .then(() => {})
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
        }
      });
  };
};

export const loginUserStartAxios = (userdata) => {
  return (dispatch) => {
    dispatch(loginUsersstart());
    const headers = {
      "Content-Type": "application/json",
      // 'Authorization': 'JWT '
    };

    const data = {
      Email: userdata.email,
      Password: userdata.password,
    };

    axios
      .post("https://server-me2love.herokuapp.com/api/v1/Login", data)
      .then((res) => {
        dispatch(loginUserSUcess(res.data));
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.status);
          console.log(error.response.data);
          dispatch(loginUserFailure(error.response.data));
        }
      });
  };
};

export const uploadImages = (image) => {
  // console.log(image);
  return async (dispatch, getState) => {
    await dispatch(upDateUsersstart());
    var formData = new FormData();

    // var newFile = url;
    // const cleanURL = newFile.replace("file:/", "file:///");
    formData.append("file", {
      uri: image,
      type: "image/jpeg",
      name: "image.jpg",
    });
    const Token = getState().userInfo.user.token;

    axios({
      url: "https://server-me2love.herokuapp.com/api/v1/Update/UploadImg",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: Token,
      },
    })
      .then((res) => {
        console.log(res.data);
        dispatch(upDateUserSUcess(res.data));
      })
      .catch((error) => {
        if (error.response) {
          dispatch(upDateUserFailure(error.data));
          console.log(error.response.data);
        } else {
          upDateUserFailure({ message: "error" });
          console.log(error);
        }
      });
  };
};

export const getUserById = (id) => {
  return (dispatch, getState) => {
    const url = `https://server-me2love.herokuapp.com/api/v1/searchUserById/${id}`;

    const Token = getState().userInfo.user.token;

    const headers = {
      "Content-Type": "application/json",
      Authorization: Token,
    };
    // const chatList = getState().chatList;
    axios
      .get(url, { headers })
      .then((res) => {
        const chatList = getState().chatList;
        if (Object.keys(chatList).includes(id)) {
          dispatch({
            type: actiontypes.NewMsgReceived,
            payload: {
              ...chatList,
              [id]: { ...chatList[id], remoteUserProfile: res.data.userdata },
            },
          });
        }
      })
      .catch((err) => console.log(err));
  };
};

export const saveNewMessage = (data) => {
  return (dispatch, getState) => {
    // msgFromId is remote senders id
    const { msgFrom, msgBody, msgFromId } = data;
    // console.log(data);
    // console.log(msgFrom);
    // const newArray=[]
    const chatList = getState().chatList;
    if (Object.keys(chatList).includes(msgFromId)) {
      const msgData = { origin: "remote", msg: msgBody };
      chatList[msgFromId].chatss.push(msgData);
      chatList[msgFromId].remoteUserProfile._id && getUserById(msgFromId);
      dispatch({ type: actiontypes.NewMsgReceived, payload: chatList });
    } else {
      const msgData = { origin: "remote", msg: msgBody };
      dispatch({
        type: actiontypes.NewMsgReceived,

        payload: {
          [msgFromId]: {
            name: msgFrom,
            chatss: [msgData],
            remoteUserProfile: {},
          },
        },
      });

      dispatch(getUserById(msgFromId));
      //make a newtwork request here to fetch the details of the user by id from back
      //end and dispatch the users data here
      //make axios request
    }
  };
};
export const sendMessage = (data) => {
  return (dispatch, getState) => {
    const { msgFrom, msgBody, msgFromId } = data;

    // console.log(msgFrom);
    // const newArray=[]
    const chatList = getState().chatList;
    if (Object.keys(chatList).includes(msgFromId)) {
      const msgData = { origin: "local", msg: msgBody };
      chatList[msgFromId].chatss.push(msgData);
      // chatList[msgFromId].remoteUserProfile._id && getUserById(msgFromId);
      dispatch({ type: actiontypes.NewMsgsent, payload: chatList });
    } else {
      const msgData = { origin: "local", msg: msgBody };
      dispatch({
        type: actiontypes.NewMsgsent,
        // `${msgBody}`
        // payload: { [msgFromId]:{ [msgData]} },
        //this section is for msg from local phne owner/user
        //to enable chatlist to display message details
        payload: {
          [msgFromId]: {
            name: msgFrom,
            chatss: [msgData],
            remoteUserProfile: {},
          },
        },
      });
      dispatch(getUserById(msgFromId));
    }
  };
};
