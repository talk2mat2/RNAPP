import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

function WithLoader(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }
    // componentDidMount() {
    //   console.log(this.props.loading);
    // }

    render() {
      return (
        <React.Fragment>
          {this.props.loading ? (
            <View style={styles.loadingBack}>
              <Image
                style={styles.loadingGif}
                source={require("../Loader/loading.gif")}
              />
            </View>
          ) : null}
          <WrappedComponent {...this.props} />
        </React.Fragment>
      );
    }
  };
}
export default WithLoader;
const styles = StyleSheet.create({
  loadingGif: {
    height: 100,
    width: 100,
  },
  container: {
    flex: 1,
  },
  loadingBack: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    width: "100%",
    height: "100%",
    position: "absolute",
    flex: 1,
    zIndex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
});
