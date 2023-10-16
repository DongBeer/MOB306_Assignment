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

const HomeScreen = (props) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  // const [followusers, setfollowusers] = useState([]);
  // const [followed, setfollowed] = useState(false);
  const [objU, setobjU] = useState({});

  var api_url = "https://65267705917d673fd76c5355.mockapi.io/api/users";

  var api_url_articles =
    "https://65267705917d673fd76c5355.mockapi.io/api/articles";

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("login");
      if (value !== null) {
        setobjU(JSON.parse(value));
        let obj = JSON.parse(value);

        console.log(obj);

        fetch(api_url_articles)
          .then((response) => response.json())
          .then(async (data) => {
            setPosts(data);
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
    fetch(api_url_articles)
      .then((response) => response.json())
      .then((data) => setPosts(data))
      .catch((error) => console.error(error));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderItem = ({ item }) => (
    <View style={styles.containerItem}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <Image
          source={{ uri: item.avataruser }}
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
        // disabled={followed}
        // onPress={() => {
        //   addFollowUser(item.users.id);
        //   setfollowed(true);
        // }}
        >
          <View style={styles.containerBtnFl}>
            <Text style={styles.follow}>Follow +</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.content}>{item.content}</Text>
      <Image
        source={{ uri: item.image }}
        style={{ width: "100%", height: 300, marginBottom: 10 }}
      />
      <View
        style={{ height: 1, backgroundColor: "#D3D3D3", marginTop: 30 }}
      ></View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          // onPress={() => handleLikePress(item.id)}
          style={{ flexDirection: "row" }}
        >
          {item.isLiked ? (
            <AntDesign name="like2" size={24} color="#3399ff" />
          ) : (
            <AntDesign name="like2" size={24} color="black" />
          )}
          <Text style={{ marginLeft: 5, marginTop: 5, fontSize: 15 }}>
            Like
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() => handleCommentPress(item.id)}
          style={{ flexDirection: "row" }}
        >
          <FontAwesome5
            name="comment-alt"
            size={22}
            color="gray"
            style={{ marginTop: 3 }}
          />
          <Text style={{ marginLeft: 5, marginTop: 5, fontSize: 15 }}>
            Comment
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <FontAwesome name="share-square-o" size={24} color="#4F4F4F" />
          <Text style={{ marginLeft: 5, marginTop: 2, fontSize: 15 }}>
            Share
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.postInputContainer}>
        <View style={styles.currentUserAvatarContainer}>
          <Image
            source={{ uri: objU.avatar }}
            style={styles.currentUserAvatar}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("AddPostScreen");
          }}
        >
          <Text style={styles.postInput}>Bạn đang nghĩ gì?</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("AddPostScreen");
          }}
        >
          <FontAwesome
            name="image"
            size={35}
            color="green"
            style={{ marginLeft: 20 }}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  postText: {
    fontSize: 14,
    marginBottom: 8,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#1877f2",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 1,
    fontWeight: "bold",
  },
  postInputContainer: {
    marginTop: 20,
    height: Dimensions.get("window").height / 5.5,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  postInput: {
    width: Dimensions.get("window").width / 2,
    fontSize: 14,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: "gray",
    padding: 4,
    borderRadius: 10,
  },

  currentUserAvatarContainer: {
    alignItems: "center",
    marginLeft: 10,
  },
  currentUserAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#D3D3D3",
    padding: 8,
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    padding: 4,
    marginRight: 8,
  },
  commentButton: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#1877f2",
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
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
  title: {
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 22,
    marginBottom: 10,
    flex: 1,
  },
  containerBtnFl: {
    borderWidth: 1,
    borderColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  follow: {
    color: "blue",
  },
  content: {
    marginLeft: 5,
    marginBottom: 10,
    marginTop: 10,
    fontSize: 15,
  },
  createdAt: {
    marginLeft: 160,
    fontStyle: "italic",
    color: "gray",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#1877f2",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
