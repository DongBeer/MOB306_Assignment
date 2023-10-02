import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import styles from "../Styles/styles";

const PickRoleScreen = (props) => {
  return (
    <View style={styles.containerPickRole}>
      <TouchableOpacity
        style={styles.btnPickRole}
        onPress={() => props.navigation.navigate("SignUpAdmin")}
      >
        <View>
          <Text>Create Admin Account</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btnPickRole}
        onPress={() => props.navigation.navigate("SignUpUser")}
      >
        <View>
          <Text>Create User Account</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PickRoleScreen;
