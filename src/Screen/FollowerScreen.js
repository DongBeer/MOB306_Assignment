import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const FollowerScreen = () => {
  const [following, setFollowing] = useState([
    {
      id: "1",
      username: "user1",
      avatar: require("../../assets/images/bgr_love.jpg"), // Đường dẫn đến ảnh đại diện
      isFollowing: true, // Mặc định bạn đang theo dõi
    },
    {
      id: "2",
      username: "user2",
      avatar: require("../../assets/images/bgr_love.jpg"), // Đường dẫn đến ảnh đại diện
      isFollowing: true, // Mặc định bạn đang theo dõi
    },
    {
      id: "3",
      username: "user3",
      avatar: require("../../assets/images/bgr_love.jpg"), // Đường dẫn đến ảnh đại diện
      isFollowing: true, // Mặc định bạn đang theo dõi
    },
    // Thêm người dùng khác ở đây
  ]);

  const handleUnfollow = (userId) => {
    // Xử lý khi người dùng nhấn vào nút "Bỏ theo dõi"
    const updatedFollowing = following.map((user) => {
      if (user.id === userId) {
        return { ...user, isFollowing: false }; // Đánh dấu là không theo dõi
      }
      return user;
    });

    setFollowing(updatedFollowing);
  };
  const renderItem = ({ item }) => (
    <View style={styles.userContainer}>
      <Image source={item.avatar} style={styles.avatar} />
      <Text style={styles.username}>{item.username}</Text>
      {item.isFollowing ? (
        <TouchableOpacity
          onPress={() => handleUnfollow(item.id)}
          style={styles.unfollowButton}
        >
          <Text style={styles.unfollowButtonText}>Bỏ theo dõi</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={following}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.container}
      />
    </SafeAreaView>
  );
};

export default FollowerScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 1,
    backgroundColor: "#FFFFFF",
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  username: {
    fontSize: 18,
    flex: 1,
  },
  unfollowButton: {
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 5,
  },
  unfollowButtonText: {
    color: "#fff",
  },
});
