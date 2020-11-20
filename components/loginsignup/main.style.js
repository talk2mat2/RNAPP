import { StyleSheet } from "react-native";
import { Colors } from "../../components/constants/colors";

export const styles = StyleSheet.create({
  Image: {
    height: 50,
    width: 50,
  },
  errorMessage: { borderColor: "red" },
  headerblock: {
    width: "100%",
    height: 30,
    backgroundColor: Colors.orange,
    borderColor: "silver",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
  },
  tinyLogo: {
    width: "65%",
    height: 40,
    margin: 5,
  },
  containers: {
    flexDirection: "column",
    alignItems: "center",
  },
  Text: {
    color: Colors.white,
  },
  Text2: {
    fontSize: 17,
    color: Colors.DimGrey,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
