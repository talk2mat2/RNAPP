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
    return { ...state, ...action.payload };
  } else if (action.type === actiontypes.NewMsgsent) {
    return { ...state, ...action.payload };
  } else {
    return state;
  }
};
