import {
  Image,
  KeyboardAvoidingView,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const EditPostScreen = (props) => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState(props.route.params.contentitem);
  const [image, setImage] = useState(props.route.params.imageitem);
  const [objU, setobjU] = useState({});
  const [fullname, setfullname] = useState("");
  const [avatar, setavatar] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("login");
      if (value !== null) {
        setobjU(JSON.parse(value));
        let obj = JSON.parse(value);
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
    getData();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };

  let id = props.route.params.iditem;

  var api_url =
    "https://65267705917d673fd76c5355.mockapi.io/api/articles/" + id;

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

  const EditPost = () => {
    if (content.length == 0) {
      alert("Bạn chưa nhập nội dung");
      return;
    }

    fetch(api_url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      //PUT và POST phải cần có body
      body: JSON.stringify({
        id: id,
        content: content,
        image: image,
      }), //Ép kiểu và chuỗi Json
    })
      .then((res) => {
        if (res.status === 200 || res.status === 204) {
          alert("Sửa thành công");
          setContent("");
          setImage("");
          props.navigation.navigate("Profile");
        } else {
          alert("Sửa thất bại");
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white", marginTop: 20 }}
    >
      <ScrollView>
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            <Image
              source={{ uri: objU.avatar }}
              style={{
                width: 45,
                height: 45,
                borderRadius: 50,
                marginRight: 10,
              }}
            />
            <Text style={{ fontWeight: "600", fontSize: 16 }}>
              {objU.username}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <TextInput
              placeholder="Hãy viết gì đó với bức ảnh"
              value={content}
              multiline={true}
              style={styles.content}
              onChangeText={(content) => setContent(content)}
            />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={pickImage}
              style={{ alignItems: "center", paddingHorizontal: 10 }}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: "100%", height: 300 }}
                />
              ) : (
                <Image
                  source={require("../../assets/images/uploadimage.png")}
                  style={{ width: 100, height: 100 }}
                />
              )}
            </TouchableOpacity>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={styles.btnSave}
                activeOpacity={0.7}
                onPress={EditPost}
              >
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                >
                  Save Post
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditPostScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomColor: "gray",
    fontSize: 18,
  },
  content: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  btnSave: {
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    paddingVertical: 20,
    marginTop: 30,
    borderRadius: 20,
  },
});
