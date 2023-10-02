import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../Screen/HomeScreen";
import ProfileScreen from "../Screen/ProfileScreen";
import NotificationScreen from "../Screen/NotificationScreen";
import FollowerScreen from "../Screen/FollowerScreen";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name == "Home") {
              iconName = focused ? "home" : "home-outline";
            }
            if (route.name == "Notifi") {
              iconName = focused ? "notifications" : "notifications-outline";
            }
            if (route.name == "Follow") {
              iconName = focused ? "person-add" : "person-add-outline";
            }
            if (route.name == "Profile") {
              iconName = focused ? "person" : "person-outline";
            }
            return (
              <Ionicons name={iconName} size={size} color={color}></Ionicons>
            );
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Follow" component={FollowerScreen} />
        <Tab.Screen name="Notifi" component={NotificationScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default BottomNav;
