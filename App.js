import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { Store, persistor } from "./redux/store";
import Index from "./Index";
export default function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <Index />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
