import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
  RefreshControl,
  Modal,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileScreen = (props) => {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [objU, setobjU] = useState({});

  const [showOptions, setShowOptions] = useState(false);

  const [editImage, seteditImage] = useState(null);
  const [editContent, seteditContent] = useState(null);
  const [avatar, setavatar] = useState(null);
  const [username, setusername] = useState("");

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  var api_url_articles =
    "https://65267705917d673fd76c5355.mockapi.io/api/articles";

  var api_url_user = "https://65267705917d673fd76c5355.mockapi.io/api/users";

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("login");
      if (value !== null) {
        setobjU(JSON.parse(value));
        let obj = JSON.parse(value);

        const response = await fetch(api_url_user + "/" + obj.id);
        if (response.ok) {
          const data = await response.json();
          setavatar(data.avatar);
          setusername(data.username);
          console.log(avatar + " - " + username);
        } else {
          console.error("Lỗi khi tải dữ liệu từ API");
        }

        const iduser = objU.id;

        fetch(api_url_articles)
          .then((response) => response.json())
          .then(async (data) => {
            const filteredPosts = data.filter((post) => post.iduser === iduser);
            setPosts(filteredPosts);
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
    const iduser = objU.id;
    fetch(api_url_articles)
      .then((response) => response.json())
      .then(async (data) => {
        const filteredPosts = data.filter((post) => post.iduser === iduser);
        setPosts(filteredPosts);
      })
      .catch((error) => console.error(error));
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  const renderItem = ({ item }) => {
    const handleEdit = () => {
      props.navigation.navigate("EditPost", {
        iditem: item.id,
        contentitem: item.content,
        imageitem: item.image,
      });

      console.log(item.id); // Bây giờ, điều này sẽ đúng và ghi lại mục tương ứng
      setShowOptions(false);
    };

    const handleDelete = () => {
      let url_api_del =
        "https://65267705917d673fd76c5355.mockapi.io/api/articles/" + item.id;
      fetch(url_api_del, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status == 200) {
            //200 cũng là xóa
            alert("Đã xóa sản phẩm");
            onRefresh();
          }
        })
        .catch((exception) => {
          console.log("Lỗi xảy ra khi xóa sản phẩm: " + exception);
        });
      console.log("Xóa bài viết");
      setShowOptions(false); // Đóng hộp thoại sau khi thực hiện tác vụ
    };
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
            source={{ uri: avatar }}
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
            {username}
          </Text>
          <TouchableOpacity onPress={toggleOptions}>
            <View>
              <Text
                style={{ fontSize: 25, fontWeight: "bold", marginBottom: 10 }}
              >
                {" "}
                ...{" "}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <Modal
          transparent={true}
          visible={showOptions}
          animationType="slide"
          onRequestClose={() => setShowOptions(false)}
        >
          <View style={styles.optionsContainer}>
            <TouchableOpacity
              onPress={handleEdit}
              style={{ flexDirection: "row" }}
            >
              <FontAwesome
                name="pencil"
                size={18}
                color="black"
                style={styles.optionIcons}
              />
              <Text style={styles.optionText}>Chỉnh sửa bài viết</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleDelete}
              style={{ flexDirection: "row" }}
            >
              <AntDesign
                name="delete"
                size={18}
                color="black"
                style={styles.optionIcons}
              />
              <Text style={styles.optionText}>Xóa bài viết</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowOptions(false)}
              style={{ flexDirection: "row" }}
            >
              <MaterialIcons
                name="cancel"
                size={18}
                color="black"
                style={styles.optionIcons}
              />
              <Text style={styles.optionText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <Text style={styles.content}>{item.content}</Text>
        <Image
          source={{ uri: item.image }}
          style={{ width: "100%", height: 230, marginBottom: 10 }}
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
  };
  const handleEditProfile = () => {
    props.navigation.navigate("EditProfile");
    console.log("Chỉnh sửa thông tin cá nhân");
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 20 }}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <TouchableOpacity onPress={handleEditProfile}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{username}</Text>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <FontAwesome name="pencil" size={18} color="black" />
          <Text style={styles.editButtonText}>Chỉnh sửa thông tin cá nhân</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 10, backgroundColor: "#B5B5B5" }}></View>

      <FlatList
        data={posts}
        keyExtractor={(item) => {
          return item.id;
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={renderItem}
      />
      <View
        style={{
          padding: 15,
          borderTopWidth: 1,
          borderTopColor: "#ccc",
          alignItems: "center",
          backgroundColor: "#99D1D3",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate("LoginScreen");
          }}
        >
          <Text style={{ color: "blue", fontWeight: "bold" }}>Log Out</Text>
        </TouchableOpacity>
      </View>
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
    height: Dimensions.get("window").height / 3.5,
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
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 5,
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
  containerItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  content: {
    marginLeft: 5,
    marginBottom: 10,
    fontSize: 15,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  optionsIcon: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 5,
  },
  optionsContainer: {
    backgroundColor: "white",
    position: "absolute",

    bottom: "30%",
    right: "10%",
    left: "10%",
  },
  optionText: {
    padding: 15,
    borderBottomColor: "#ccc",
    fontWeight: "bold",
  },
  optionIcons: {
    padding: 10,
    marginTop: 5,
    marginLeft: 10,
  },
});
