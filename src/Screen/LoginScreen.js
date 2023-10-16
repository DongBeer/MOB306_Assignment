import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  SafeAreaViewBase,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../Styles/styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = (props) => {
  const [data, setData] = React.useState({
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

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

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
    setpassword(val);
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const doLogin = () => {
    if (username.length == 0) {
      alert("Vui lòng nhập username");
      return;
    }
    if (password.length == 0) {
      alert("Vui lòng nhập mật khẩu");
      return;
    }

    let url_check_login = `https://65267705917d673fd76c5355.mockapi.io/api/users?username=${username}`;
    fetch(url_check_login)
      .then((res) => {
        return res.json();
      })
      .then(async (res_login) => {
        if (res_login.length != 1) {
          alert("Tài khoản không tồn tại");
          return;
        } else {
          let objU = res_login[0];
          if (objU.password == password) {
            try {
              await AsyncStorage.setItem("login", JSON.stringify(objU));
              if (objU.role == "admin") {
                props.navigation.navigate("HomeScreenAdmin");
              } else {
                props.navigation.navigate("HomeScreenUser");
              }
              setusername("");
              setpassword("");
            } catch (e) {
              console.log(e);
            }
          } else {
            alert("Sai mật khẩu");
          }
        }
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome!</Text>
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
            <View style={{ marginHorizontal: 50 }}>
              <TouchableOpacity style={styles.signIn} onPress={doLogin}>
                <Text
                  style={{ fontSize: 17, color: "white", fontWeight: "bold" }}
                >
                  Sign In
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
              <Text>You don't have an account? </Text>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate("PickRoleScreen");
                }}
              >
                <Text style={{ color: "#23B4D2", fontSize: 14 }}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
