import {
  View,
  Text,
  Button,
  TextInput,
  Pressable,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import UserStyle from "./UserStyle";
import { useState } from "react";
import API, { endpoints } from "../../configs/API";
import { TapGestureHandler } from "react-native-gesture-handler";
import Input from "../Input";
import { COLORS } from "../../configs/Constant";
import LoadingView from "../lottie/LoadingView";

const Register = ({ navigation }) => {
  const [info, setInfo] = useState({
    username: "",
    password: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirm_password: "",
  });
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false)

  const register = () => {
    setError({})
    let valid = true
    if (!info.first_name){
      handleError('first_name', 'Please enter your firstname!')
      valid = false
    }
    if(!info.last_name){
      handleError('last_name', 'Please enter your lastname!')
      valid = false
    }
    if(!info.email){
      handleError('email', 'Please enter your email!')
      valid = false
    }
    else if(!info.email.match(/\S+@\S+\.\S+/)){
      handleError('email', 'Please enter valid email!')
      valid = false
    }
    if(!info.phone){
      handleError('phone', 'Please enter your phone number!')
      valid = false
    }
    else if(info.phone.length < 10){
      handleError('phone', 'Please enter valid phone number!')
      valid = false
    }
    if(!info.address){
      handleError('address', 'Please enter your address!')
      valid = false
    }
    if(!info.username){
      handleError('username', 'Please enter your username!')
      valid = false
    }
    else if(info.username.length < 8){
      handleError('username', 'Your username must be more than 8 character')
      valid = false
    }
    if(!info.password){
      handleError('password', 'Please enter your password!')
      valid = false
    }
    else if(info.password.length < 8){
      handleError('password', 'Your password must be more than 8 character')
      valid = false
    }
    if(!info.confirm_password){
      handleError('confirm_password', 'Please enter your confirm password')
      valid = false
    }
    else if(info.confirm_password != info.password){
      handleError('confirm_password', 'The confirmation password must match the password')
      valid = false
    }
    if(valid){
      commitRegister()
    }
  }

  const handleError = (input, value) => {
    setError(current_error => ({...current_error, [input]: value}))
  }
  const commitRegister = async () => {
    setLoading(true)
    try{
      let data = {
        "username": info.username,
        "password": info.password,
        "first_name": info.first_name,
        "last_name": info.last_name,
        "email": info.email,
        "address": info.address,
        "phone": info.phone
      }
      let res = await API.post(endpoints['register'],data,{
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      navigation.navigate("Login")
      Alert.alert("Register succesfully!")
    }
    catch(ex){
      setError("Error System!")
    }
    finally{
      setLoading(false)
    }
  }

  const change = (field, value) => {
    setInfo((current) => {
      return { ...current, [field]: value };
    });
  };
  return (
    <View style={UserStyle.container}>
      <View>
        <Text style={UserStyle.headerText}>Tạo tài khoản</Text>
        <Text style={{ fontSize: 16, color: "#818181" }}>
          Tạo tài khoản để tiếp tục mua hàng với tnEC
        </Text>
      </View>

      <ScrollView
        style={UserStyle.inputContainer}
        showsVerticalScrollIndicator={false}
      >
        <Input
          label="Họ"
          value={info.first_name}
          onChangeHandle={(t) => {
            change("first_name", t);
          }}
          error={error.first_name}
        />
        <Input
          label="Tên"
          value={info.last_name}
          onChangeHandle={(t) => {
            change("last_name", t);
          }}
          error={error.last_name}
        />
        <Input
          label="Email"
          value={info.email}
          onChangeHandle={(t) => {
            change("email", t);
          }}
          error={error.email}
        />
        <Input
          label="Số điện thoại"
          value={info.phone}
          onChangeHandle={(t) => {
            change("phone", t);
          }}
          type="numeric"
          error={error.phone}
        />
        <Input
          label="Địa chỉ"
          value={info.address}
          onChangeHandle={(t) => {
            change("address", t);
          }}
          error={error.address}
        />
        <Input
          label="Tên đăng nhập"
          value={info.username}
          onChangeHandle={(t) => {
            change("username", t);
          }}
          error={error.username}
        />
        <Input
          label="Mật khẩu"
          value={info.password}
          onChangeHandle={(t) => {
            change("password", t);
          }}
          isPassword
          error={error.password}
        />
        <Input
          label="Xác nhận mật khẩu"
          value={info.confirm_password}
          onChangeHandle={(t) => {
            change("confirm_password", t);
          }}
          isPassword
          error={error.confirm_password}
        />
        {loading ? (
          <LoadingView />
        ) : (
          <>
            <TouchableOpacity style={UserStyle.loginButton} onPress={register}>
              <Text
                style={{
                  fontSize: 24,
                  color: "#fff",
                  fontWeight: "600",
                  lineHeight: 50,
                }}
              >
                Đăng ký
              </Text>
            </TouchableOpacity>
          </>
        )}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, color: "#818181" }}>
            Bạn đã có tài khoản?
          </Text>
          <Pressable
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 700, color: COLORS.active }}>
              {" "}
              Đăng nhập
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
            paddingBottom: 60,
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
      </ScrollView>
    </View>
  );
};

export default Register;
