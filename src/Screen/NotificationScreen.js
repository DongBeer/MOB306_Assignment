import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      sender: "Đông Beer",
      message: "Bạn có một thông báo mới",
    },
    {
      id: "2",
      sender: "Đông Beer",
      message: "Bạn được theo dõi bởi người mới",
    },
    // Thêm các thông báo khác ở đây
  ]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.notificationContainer}>
      <Text style={styles.sender}>{item.sender}</Text>
      <Text style={styles.message}>{item.message}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginTop: 30,
            padding: 10,
          }}
        >
          Thông báo
        </Text>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.container}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 5,
  },
  notificationContainer: {
    backgroundColor: "#B9D3EE",
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    elevation: 3, // Hiệu ứng đổ bóng
  },
  sender: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
  },
});
