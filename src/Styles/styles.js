import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23B4D2",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#000",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: 0,
    paddingLeft: 10,
    color: "#05375a",
  },
  signIn: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#23B4D2",
    marginTop: 30,
    padding: 15,
  },
  btnPickRole: {
    marginTop: "80%",
    marginLeft: "5%",
    width: Dimensions.get("window").width / 2.5,
    height: "10%",
    backgroundColor: "#FAF0E6",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  containerPickRole: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#23B4D2",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
export default styles;
