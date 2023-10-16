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
  Image,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { FontAwesome5 } from "@expo/vector-icons";

const HomeEdit = (props) => {
  const [newPostText, setNewPostText] = React.useState("");
  const [image, setImage] = useState(null);
  const [data, setData] = useState([
    {
      id: "1",
      username: "Thành Long",
      postText: "Hello, world! This is my first post on Facebook.",
      isLiked: false,
      comments: [], // Thêm mảng để lưu bình luận
      showCommentInput: false, // Trạng thái để hiển thị hộp nhập bình luận
      commentText: "", // Trạng thái để theo dõi nội dung bình luận
    },
    {
      id: "2",
      username: "Văn Đạt",
      postText: "Enjoying a beautiful day at the beach. 🏖️",
      isLiked: false,
      comments: [],
      showCommentInput: false,
      commentText: "",
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

  const handleCommentPress = (postId) => {
    const updatedData = data.map((postData) => {
      if (postData.id === postId) {
        // Thay đổi trạng thái hiển thị hộp nhập bình luận
        return { ...postData, showCommentInput: !postData.showCommentInput };
      } else if (postData.showCommentInput) {
        // Nếu hộp nhập bình luận đang mở cho một mục khác, đóng nó
        return { ...postData, showCommentInput: false };
      }
      return postData;
    });

    // Cập nhật dữ liệu mới
    setData(updatedData);
  };

  const handleAddComment = (postId) => {
    const updatedData = data.map((postData) => {
      if (postData.id === postId) {
        // Thêm bình luận mới vào mảng bình luận
        postData.comments.push(postData.commentText);
        // Đặt trạng thái bình luận về rỗng và ẩn hộp nhập bình luận
        return { ...postData, commentText: "" };
      }
      return postData;
    });

    // Cập nhật dữ liệu mới
    setData(updatedData);
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
        <TouchableOpacity
          onPress={() => handleCommentPress(item.id)}
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
      {item.showCommentInput && ( // Hiển thị hộp nhập bình luận nếu showCommentInput là true
        <View>
          <FlatList
            data={item.comments}
            keyExtractor={(comment, index) => index.toString()}
            renderItem={({ item }) => (
              <Text style={styles.comment}>{item}</Text>
            )}
          />
          <View style={styles.commentInputContainer}>
            <TextInput
              placeholder="Add a comment..."
              style={styles.commentInput}
              onChangeText={(text) =>
                setData((prevData) =>
                  prevData.map((postData) =>
                    postData.id === item.id
                      ? { ...postData, commentText: text }
                      : postData
                  )
                )
              }
              value={item.commentText}
            />
            <TouchableOpacity
              onPress={() => handleAddComment(item.id)}
              style={styles.commentButton}
            >
              <Text style={{ color: "#1877f2", fontWeight: "bold" }}>»</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      let _uri = result.assets[0].uri;
      let file_ext = _uri.substring(_uri.lastIndexOf(".") + 1);

      FileSystem.readAsStringAsync(result.assets[0].uri, {
        encoding: "base64",
      }).then((res) => {
        setImage("data:image/" + file_ext + ";base64," + res);
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.postInputContainer}>
        <View style={styles.currentUserAvatarContainer}>
          <Image
            source={require("../../assets/images/bgr_love.jpg")}
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
        <TouchableOpacity onPress={pickImage}>
          <FontAwesome
            name="image"
            size={35}
            color="green"
            style={{ marginLeft: 20 }}
          />
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
});

export default HomeEdit;
