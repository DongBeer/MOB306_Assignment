import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LoginScreen from "./src/Screen/LoginScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PickRoleScreen from "./src/Screen/PickRoleScreen";
import styles from "./src/Styles/styles";
import SignUpAdmin from "./src/Screen/SignUpAdminScreen";
import BottomNav from "./src/Navigation/BottomNav";
import SignUpUserScreen from "./src/Screen/SignUpUserScreen";
import BottomNavUser from "./src/Navigation/BottomNavUser";
import AddPostScreen from "./src/Screen/AddPostScreen";
import EditPostScreen from "./src/Screen/EditPostScreen";
import EditProflieScreen from "./src/Screen/EditProflieScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            title: "Login",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PickRoleScreen"
          component={PickRoleScreen}
          options={{
            title: "Pick Role",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUpAdmin"
          component={SignUpAdmin}
          options={{
            title: "Sign Up",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SignUpUser"
          component={SignUpUserScreen}
          options={{
            title: "Sign Up",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeScreenAdmin"
          component={BottomNav}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeScreenUser"
          component={BottomNavUser}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AddPostScreen"
          component={AddPostScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditPost"
          component={EditPostScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProflieScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
