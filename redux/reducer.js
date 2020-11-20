import * as actiontypes from "./action.types";
const initial_state = { loading: false, user: {}, error: {}, userLocation: {} };

export const userReducer = (state = initial_state, action) => {
  if (action.type === actiontypes.loginUser_Start) {
    return { ...state, loading: action.loading, error: {} };
  } else if (action.type === actiontypes.loginUser_Success) {
    return { ...state, loading: false, error: {}, user: action.payload };
  } else if (action.type === actiontypes.loginUser_failure) {
    return { ...state, loading: false, error: action.payload };
  } else if (action.type === actiontypes.upDateUser_Start) {
    return { ...state, loading: action.loading, error: {} };
  } else if (action.type === actiontypes.upDateUser_Success) {
    return {
      ...state,
      loading: false,
      error: {},
      user: { ...state.user, userdata: action.payload.userdata },
    };
  } else if (action.type === actiontypes.upDateUser_failure) {
    return { ...state, loading: false, error: action.payload };
  }  else if (action.type === "resetLoading") {
    return { ...state, loading: false,error:{}};
  } else if (action.type === actiontypes.logOut_Start) {
    return { ...state, loading: false, error: {}, user: action.payload };
  } else if (action.type === actiontypes.getUserLocation_success) {
    return { ...state, userLocation: action.payload, error: {} };
  } else if (action.type === actiontypes.DeleteMyImage) {
    return {
      ...state,
      error: {},
      user: {
        ...state.user,
        userdata: {
          ...state.user.userdata,
          Pictures: [
            ...state.user.userdata.Pictures.filter(
              (items) => items._id != action.payload
            ),
          ],
        },
      },
    };
  } else if (action.type === actiontypes.ClearErrorMessage) {
    return { ...state, error: {} };
  } else {
    return state;
  }
};

const message_initstate = {};
export const chatListReducer = (state = message_initstate, action) => {
  if (action.type === actiontypes.NewMsgReceived) {
    return { ...action.payload };
  } else if (action.type === actiontypes.NewMsgsent) {
    return { ...action.payload };
  } else {
    return state;
  }
};

const setting_initstate = {
  Gender: "both",
  sound: true,
  alert: true,
};
export const Settings = (state = setting_initstate, action) => {
  switch (action.type) {
    case actiontypes.upDateSettings:
      return {
        ...state,
        alert: action.payload.alert,
        Gender: action.payload.Gender,
        sound: action.payload.sound,
      };
    default:
      return state;
  }
};

const mounted_initstate={
  mountedPageId:null
}
export const mountedReducer=(state=mounted_initstate,action)=>{
switch(action.type){
  case actiontypes.setMountedPage:
    return {...state,mountedPageId:action.payload}
    default:
  return state

}

}