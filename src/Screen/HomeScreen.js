import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const HomeScreen = () => {
  const [newPostText, setNewPostText] = React.useState("");

  const [data, setData] = useState([
    {
      id: "1",
      username: "John Doe",
      postText: "Hello, world! This is my first post on Facebook.",
      isLiked: false,
    },
    {
      id: "2",
      username: "Jane Smith",
      postText: "Enjoying a beautiful day at the beach. 🏖️",
      isLiked: false,
    },
    // Thêm các bài post khác ở đây
  ]);

  const handleLikePress = (postId) => {
    // Xử lý khi người dùng nhấn vào biểu tượng "heart" của item này
    const updatedData = data.map((postData) => {
      if (postData.id === postId) {
        // Nếu đúng item được nhấn, thay đổi trạng thái yêu thích của nó
        return { ...postData, isLiked: !postData.isLiked };
      }
      return postData;
    });

    // Cập nhật dữ liệu mới
    setData(updatedData);
  };

  const handlePostButtonPress = () => {
    // Xử lý việc đăng bài viết ở đây, ví dụ:
    if (newPostText) {
      const newPost = {
        id: String(data.length + 1), // Tạo ID mới
        username: "Đông", // Tên người đăng
        postText: newPostText, // Nội dung bài viết
      };
      setData([...data, newPost]);
      setNewPostText("");
    }
  };
  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.postText}>{item.postText}</Text>

      <View
        style={{ height: 1, backgroundColor: "#D3D3D3", marginTop: 30 }}
      ></View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => handleLikePress(item.id)}
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
        <TouchableOpacity style={{ flexDirection: "row" }}>
          <AntDesign name="addusergroup" size={24} color="black" />
          <Text style={{ marginLeft: 5, marginTop: 5, fontSize: 15 }}>
            Follow
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
        <TextInput
          placeholder="Bạn đang nghĩ gì?"
          value={newPostText}
          onChangeText={(text) => setNewPostText(text)}
          multiline={true}
          style={styles.postInput}
        />
        <TouchableOpacity
          onPress={handlePostButtonPress}
          style={styles.postButton}
        >
          <Text style={styles.postButtonText}>Đăng</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    height: Dimensions.get("window").height / 4.5,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  postInput: {
    flex: 1,
    fontSize: 14,
    marginBottom: 50,
  },
  postButton: {
    marginTop: 60,
    backgroundColor: "#1877f2",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 16,
    marginLeft: 16,
  },
  postButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default HomeScreen;
