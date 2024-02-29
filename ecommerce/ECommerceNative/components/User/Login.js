import {
  View,
  Text,
  Button,
  TextInput,
  Pressable,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import UserStyle from "./UserStyle";

import { useContext, useReducer, useState } from "react";
import API, { endpoints, authApi } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyReducer from "../../reducers/MyReducer";
import MyContext, { UserContext } from "../../configs/MyContext";
import Input from "../Input";
import { COLORS } from "../../configs/Constant";
import LoadingView from "../lottie/LoadingView";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [user, dispatch] = useContext(UserContext)
  const [loading, setLoading] = useState(false)


  const login = async () => {
    setLoading(true)
    try {
      let data = {
        "username": username,
        "password": password,
        "client_id": "r9rUCD8V0gLikZrefFNt5koPpBCBY6Xpy7vUgZmD",
        "client_secret":
          "5rMn69WgSsQTeD6LOVISL3APQUjy4ak3Om8ZCHaoRFXqREKqEJEhMyg6HhGcvHAdBSTIA5d9sdMeVp8siLyUG1LBVjl2dMR3WBEYUHhMPXpCAYvNCpIbjjgcADpWCUZK",
        "grant_type": "password"
      }
      const res = await API.post(endpoints["login"], data);
      await AsyncStorage.setItem("access-token", res.data.access_token);
      let user_res = await authApi(res.data.access_token).get(
        endpoints["current-user"]
      );
      dispatch({
        type: "login",
        payload: user_res.data,
      });
      navigation.navigate("BottomNavigation");
    } catch (ex) {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
    finally
    {
      setLoading(false)
    }
  };
  return (
    <View style={UserStyle.container}>
      <View>
        <Text style={UserStyle.headerText}>Đăng nhập</Text>
        <Text style={{ fontSize: 16, color: "#818181" }}>
          Nhập tên đăng nhập và mật khẩu để đăng nhập
        </Text>
      </View>

      <View style={UserStyle.inputContainer}>
        <Input holderText="Tên đăng nhập..." error={error} label="Tên Đăng Nhập" value={username} onChangeHandle={setUsername} isLogin/>
        <Input holderText="Mật khẩu..." error={error} label="Mật Khẩu" value={password} onChangeHandle={setPassword} isLogin isPassword />
        <Pressable
          style={{
            paddingVertical: 8,
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
          onPress={() => {}}
        >
          <Text style={{ color: COLORS.active, fontWeight: "800" }}>
            Quên mật khẩu ?
          </Text>
        </Pressable>
        {loading==true ? <LoadingView/> : <>
          <TouchableOpacity
            style={UserStyle.loginButton}
            onPress={login}
          >
            <Text
              style={{
                fontSize: 24,
                color: "#fff",
                fontWeight: "600",
                lineHeight: 50,
              }}
            >
              Đăng Nhập
            </Text>
          </TouchableOpacity>
        </>}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "#818181" }}>
            Bạn chưa có tài khoản?
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 700, color: COLORS.active }}>
              {" "}
              Đăng ký
            </Text>
          </Pressable>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 40,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
          <View>
            <Text style={{ width: 50, textAlign: "center" }}>OR</Text>
          </View>
          <View style={{ flex: 1, height: 1, backgroundColor: "black" }} />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Pressable onPress={() => {}}>
            <Image
              source={{
                uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1706947907/google_qk8s0c.jpg",
              }}
              style={UserStyle.imageStyle}
            />
          </Pressable>
          <Pressable onPress={() => {}}>
            <Image
              source={{
                uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1706947906/facebook_axwuyw.png",
              }}
              style={UserStyle.imageStyle}
            />
          </Pressable>
          <Pressable onPress={() => {}}>
            <Image
              source={{
                uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1706947965/discord_v6dvbt.png",
              }}
              style={UserStyle.imageStyle}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;
