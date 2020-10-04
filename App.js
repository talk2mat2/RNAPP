import { StatusBar } from "expo-status-bar";
import React from "react";
import { Store, persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Myprofile from "./components/myProFile/myProfile";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import Welcome from "./Welcome";
import Chatlist from "./components/chatlist/chatlist";
import Chat from "./components/Chat/Chat";
import UserDetailView from "./components/userDetailView/userDetailView";

function App() {
  return (
    <React.Fragment>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaProvider>
            <UserDetailView />
          </SafeAreaProvider>
        </PersistGate>
      </Provider>
    </React.Fragment>
  );
}

export default App;
