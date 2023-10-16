import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const EditProflieScreen = (props) => {
  const [objU, setobjU] = useState({});
  const [fullname, setfullname] = useState("");
  const [avatar, setavatar] = useState(null);
  const [username, setusername] = useState("");
  const [passwd, setpasswd] = useState("");
  const [passwdOld, setpasswdOld] = useState("");
  const [passwdNew, setpasswdNew] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePasswordNew, setHidePasswordNew] = useState(true);

  const toggleHidePassword = () => {
    setHidePassword(!hidePassword);
  };

  const toggleHidePasswordNew = () => {
    setHidePasswordNew(!hidePasswordNew);
  };

  var api_url = "https://65267705917d673fd76c5355.mockapi.io/api/users";

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("login");
      if (value !== null) {
        let obj = JSON.parse(value);
        setobjU(JSON.parse(value));
        fetch(api_url + "/" + obj.id)
          .then((res) => res.json())
          .then((data) => {
            setfullname(data.fullname),
              setavatar(data.avatar),
              setusername(data.username),
              setpasswd(data.password);
            console.log(data);
          })
          .catch((err) => console.error(err));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
        setavatar("data:image/" + file_ext + ";base64," + res);
      });
    }
  };

  let api_url_check_pass = api_url + "/" + objU.id;
  const updateProfile = () => {
    if (fullname.length == 0) {
      alert("Vui lòng nhập họ tên");
      return;
    }
    if (username.length == 0) {
      alert("Vui lòng nhập username");
      return;
    }
    if (passwdOld.length == 0) {
      alert("Vui lòng nhập mật khẩu cũ");
      return;
    }
    if (passwdNew.length == 0) {
      alert("Vui lòng nhập mật khẩu mới");
      return;
    }
    fetch(api_url_check_pass)
      .then((res) => res.json())
      .then((data) => {
        if (passwdOld == passwd) {
          fetch(api_url_check_pass, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: objU.id,
              username: username,
              password: passwdNew,
              avatar: avatar,
              fullname: fullname,
            }),
          })
            .then((res) => {
              if (res.status === 200) {
                alert("Sửa thành công");
                setpasswdOld("");
                setpasswdNew("");
                props.navigation.navigate("Profile");
              } else {
                alert("Sửa thất bại");
              }
            })
            .catch((err) => console.error(err));
        } else {
          alert("Mật khẩu cũ sai !!");
        }
      });
  };

  return (
    <View style={styles.contaniner}>
      <TouchableOpacity activeOpacity={0.5} onPress={pickImage}>
        {avatar ? (
          <Image
            source={{ uri: avatar }}
            style={{ width: 150, height: 150, borderRadius: 100 }}
          />
        ) : (
          <Image
            source={require("../../assets/images/bgr_love.jpg")}
            style={{ width: 150, height: 150, borderRadius: 100 }}
          />
        )}
      </TouchableOpacity>
      <TextInput
        value={fullname}
        style={styles.tIFullname}
        placeholder="Họ tên"
        onChangeText={(text) => setfullname(text)}
      />
      <TextInput
        value={username}
        style={styles.tIFullname}
        placeholder="Username"
        onChangeText={(text) => setusername(text)}
      />
      <View
        style={{
          width: "80%",
          flexDirection: "row",
          borderColor: "gray",
          borderWidth: 1,
          padding: 12,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <TextInput
          style={{ flex: 1, textAlign: "center" }}
          value={passwdOld}
          placeholder="Nhập mật khẩu cũ"
          onChangeText={(text) => setpasswdOld(text)}
          secureTextEntry={hidePassword}
        />
        <TouchableOpacity onPress={toggleHidePassword}>
          <Text style={{ color: "gray", fontSize: 13 }}>
            {hidePassword ? "Show" : "Hide"}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "80%",
          flexDirection: "row",
          borderColor: "gray",
          borderWidth: 1,
          padding: 12,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <TextInput
          value={passwdNew}
          secureTextEntry={hidePasswordNew}
          style={{ flex: 1, textAlign: "center" }}
          placeholder="Nhập mật khẩu mới"
          onChangeText={(text) => setpasswdNew(text)}
        />
        <TouchableOpacity onPress={toggleHidePasswordNew}>
          <Text style={{ color: "gray", fontSize: 13 }}>
            {hidePasswordNew ? "Show" : "Hide"}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.btnSave}
        activeOpacity={0.7}
        onPress={updateProfile}
      >
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
          Save
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EditProflieScreen;

const styles = StyleSheet.create({
  contaniner: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    paddingTop: 20,
  },
  tIFullname: {
    width: "80%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "Gray",
    textAlign: "center",
    padding: 12,
    marginTop: 20,
  },
  btnSave: {
    backgroundColor: "orange",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    paddingVertical: 15,
    marginTop: 30,
    borderRadius: 20,
  },
});
