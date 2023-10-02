import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  SafeAreaViewBase,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import styles from "../Styles/styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";

const LoginScreen = (props) => {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
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
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => {
                  props.navigation.navigate("HomeScreen");
                }}
              >
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
