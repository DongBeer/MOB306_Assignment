import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Dimensions,
  RefreshControl,
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FollowerScreen = () => {
  const [user, setUser] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [objU, setobjU] = useState({});

  const [followedUsers, setFollowedUsers] = useState([]);

  const handleFollowUser = (userId, isFollowed) => {
    if (isFollowed) {
      // Nếu đã theo dõi, thực hiện hủy theo dõi
      const updatedFollowedUsers = followedUsers.filter((id) => id !== userId);
      setFollowedUsers(updatedFollowedUsers);
    } else {
      // Nếu chưa theo dõi, thực hiện theo dõi
      setFollowedUsers([...followedUsers, userId]);
    }
  };

  var api_url = "https://65267705917d673fd76c5355.mockapi.io/api/users";

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("login");
      if (value !== null) {
        setobjU(JSON.parse(value));
        let obj = JSON.parse(value);

        console.log(obj);

        fetch(api_url)
          .then((response) => response.json())
          .then(async (data) => {
            setUser(data);
          })
          .catch((error) => console.error(error));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetch(api_url)
      .then((response) => response.json())
      .then((data) => setUser(data))
      .catch((error) => console.error(error));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderItem = ({ item }) => {
    const isFollowed = followedUsers.includes(item.id);
    return (
      <View style={styles.containerItem}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Image
            source={{ uri: item.avatar }}
            style={{ width: 45, height: 45, borderRadius: 50 }}
          />
          <Text
            style={{
              fontWeight: "600",
              fontSize: 18,
              marginLeft: 10,
              flex: 1,
            }}
          >
            {item.username}
          </Text>
          <TouchableOpacity
            onPress={() => handleFollowUser(item.id, isFollowed)}
          >
            <View
              style={[
                styles.containerBtnFl,
                { backgroundColor: isFollowed ? "orange" : "#FE2C55" },
              ]}
            >
              <Text style={styles.follow}>
                {isFollowed ? "Unfollow" : "Follow +"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
      <FlatList
        data={user}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={renderItem}
        style={styles.container}
      />
    </SafeAreaView>
  );
};

export default FollowerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  containerBtnFl: {
    borderWidth: 1,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    backgroundColor: "#FE2C55",
  },
  follow: {
    color: "white",
    fontWeight: "bold",
  },
});
