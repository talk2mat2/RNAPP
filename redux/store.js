import { userReducer, chatListReducer } from "./reducer";
import { createStore, combineReducers, applyMiddleware, create } from "redux";
// const rootReducer= combineReducers({userInfo:userReducer})
import ReduxThunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

// import storage from 'redux-persist/lib/storage'
const authPersistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["userInfo", "chatList"],
};

const rootReducer = combineReducers({
  chatList: chatListReducer,
  userInfo: userReducer,

  // other: otherReducer,
});

const persistedReducer = persistReducer(authPersistConfig, rootReducer);
// const middlewares = [ReduxThunk]
export const Store = createStore(persistedReducer, applyMiddleware(ReduxThunk));
export const persistor = persistStore(Store);
