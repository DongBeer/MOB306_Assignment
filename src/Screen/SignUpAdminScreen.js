import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  textInputChange,
} from "react-native";
import React from "react";
import { useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

const SignUpAdmin = (props) => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    confirm_password: "",
    fullname: "",
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [fullname, setfullname] = useState("");
  const [role, setrole] = useState("admin");

  const textInputChange = (val) => {
    if (val.length != 0) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
      });
    }
    setusername(val);
  };

  const textInputChange1 = (val) => {
    if (val.length != 0) {
      setData({
        ...data,
        fullname: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        fullname: val,
        check_textInputChange: false,
      });
    }
    setfullname(val);
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
    setpassword(val);
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
    setconfirmPassword(val);
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  var api_url = "https://65267705917d673fd76c5355.mockapi.io/api/users";

  const handleSignUp = async () => {
    if (username.length == 0) {
      alert("Vui lòng nhập username");
      return;
    }
    if (password.length == 0) {
      alert("Vui lòng nhập password");
      return;
    }
    if (fullname.length == 0) {
      alert("Vui lòng nhập họ tên");
      return;
    }
    if (password != confirmPassword) {
      alert("Mật khẩu không trùng khớp");
      return;
    }

    fetch(
      `https://65267705917d673fd76c5355.mockapi.io/api/users?username=${username}`
    )
      .then((res) => res.json())
      .then(async (data) => {
        if (data.length > 0) {
          alert("Username đã tồn tại");
          return;
        } else {
          const response = await fetch(api_url, {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: username,
              password: confirmPassword,
              fullname: fullname,
              role: role,
              // avatar: avatar,
            }),
          });
          if (response.ok) {
            alert("Đăng ký thành công");
            // setavatar(null);
            setusername("");
            setpassword("");
            setconfirmPassword("");
            setfullname("");
          }
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.text_header}>Create Admin Account!</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <ScrollView>
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Username"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={textInputChange}
                value={username}
              />
            </View>
            <Text style={[styles.text_footer, { marginTop: 35 }]}>
              Password
            </Text>
            <View style={styles.action}>
              <FontAwesome name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Password"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => handlePasswordChange(val)}
                value={password}
                secureTextEntry={data.secureTextEntry ? true : false}
              />
              <TouchableOpacity onPress={updateSecureTextEntry}>
                {data.secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>
            <Text style={[styles.text_footer, { marginTop: 35 }]}>
              Confirm Password
            </Text>
            <View style={styles.action}>
              <FontAwesome name="lock" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Password"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={(val) => handleConfirmPasswordChange(val)}
                value={confirmPassword}
                secureTextEntry={data.confirm_secureTextEntry ? true : false}
              />
              <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
                {data.confirm_secureTextEntry ? (
                  <Feather name="eye-off" color="grey" size={20} />
                ) : (
                  <Feather name="eye" color="grey" size={20} />
                )}
              </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, { marginTop: 35 }]}>
              Fullname
            </Text>
            <View style={styles.action}>
              <FontAwesome name="user-o" color="#05375a" size={20} />
              <TextInput
                placeholder="Your Fullname"
                style={styles.textInput}
                autoCapitalize="none"
                onChangeText={textInputChange1}
                value={fullname}
              />
            </View>
            <View style={{ marginHorizontal: 50 }}>
              <TouchableOpacity style={styles.signIn} onPress={handleSignUp}>
                <Text
                  style={{ fontSize: 17, color: "white", fontWeight: "bold" }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
              <Text>You had an account? </Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("LoginScreen");
                }}
              >
                <Text style={{ color: "#23B4D2", fontSize: 14 }}>Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default SignUpAdmin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23B4D2",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  footer: {
    flex: 4,
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
    flex: 1,
    height: "100%",
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
});
