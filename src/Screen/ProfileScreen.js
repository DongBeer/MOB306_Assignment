import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState({
    name: "Đông Nguyễn",
    avatar: require("../../assets/images/bgr_love.jpg"), // Đường dẫn đến ảnh đại diện
    andress: "Gia Viễn - Ninh Bình",
    phonenumber: "0878002632",
  });

  const [posts, setPosts] = useState([
    {
      id: "1",
      text: "Đây là bài viết 1.",
    },
    {
      id: "2",
      text: "Đây là bài viết 2.",
    },
    // Thêm các bài viết khác ở đây
  ]);

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Text style={styles.postText}>{item.text}</Text>
    </View>
  );

  const handleEditProfile = () => {
    // Xử lý chức năng chỉnh sửa thông tin cá nhân ở đây
    console.log("Chỉnh sửa thông tin cá nhân");
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity onPress={handleEditProfile}>
              <Image source={userInfo.avatar} style={styles.avatar} />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{userInfo.name}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <FontAwesome name="pencil" size={18} color="black" />
            <Text style={styles.editButtonText}>Chỉnh sửa trang cá nhân</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 10, backgroundColor: "#B5B5B5" }}></View>

        <Text style={{ fontSize: 20, fontWeight: "bold", padding: 10 }}>
          Chi tiết
        </Text>

        <View style={{ flexDirection: "row", padding: 5 }}>
          <FontAwesome name="home" size={24} color="black" />
          <Text style={{ fontWeight: "bold", marginTop: 5, marginLeft: 10 }}>
            Sống tại: {userInfo.andress}
          </Text>
        </View>
        <View style={{ flexDirection: "row", padding: 5 }}>
          <Feather name="phone" size={24} color="black" />
          <Text style={{ fontWeight: "bold", marginTop: 5, marginLeft: 10 }}>
            Liên lạc: {userInfo.phonenumber}
          </Text>
        </View>

        <FlatList
          data={posts}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.container}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    width: "100%",
    height: Dimensions.get("window").height / 2.3,
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#FAEBD7",
  },
  avatarContainer: {
    borderWidth: 2,
    borderColor: "#1877f2",
    borderRadius: 100,
  },
  avatar: {
    width: Dimensions.get("window").width / 2.2,
    height: Dimensions.get("window").height / 4,
    borderRadius: 100,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 12,
  },
  editButton: {
    backgroundColor: "#DCDCDC",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 8,
    flexDirection: "row",
    marginBottom: 30,
  },
  editButtonText: {
    color: "black",
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
  },
  postContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
  },
  postText: {
    fontSize: 16,
  },
});
