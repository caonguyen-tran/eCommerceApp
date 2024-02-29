import { useState } from "react";
import UserStyle from "./User/UserStyle";
import { View, Text, TextInput, Pressable } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Input = ({
    label, 
    value,
    error,
    onChangeHandle,
    isLogin,
    isPassword,
    type,
    holderText
}) => {
    const [visible, setVisible] = useState(false)
    return (
        <View style={UserStyle.inputChild}>
          <View style={{flexDirection: "row", }}>
            <Text style={{ fontSize: 16, color: "#000", fontWeight: "600", marginVertical:2 }}>
              {label}
            </Text>
            {isLogin ? <Text></Text> : <Text style={{color: "red", fontSize: 18}}> *</Text>}
          </View>
          {isPassword ? 
            <View style={[UserStyle.inputView, {borderColor: error ? "red" : "#ccc"}]}>
                <TextInput
                value={value}
                secureTextEntry={!visible}
                style={UserStyle.textInput}
                onChangeText={onChangeHandle}
                placeholder={holderText}
                placeholderTextColor="gray"
                />
                <Pressable
                    onPress={() => {
                        setVisible(!visible);
                    }}
                    >
                    <MaterialCommunityIcons
                        name={!visible ? "eye-off" : "eye"}
                        size={22}
                        color="#232323"
                        style={{ marginLeft: 20 }}
                    />
                </Pressable>
            </View>:
            <View style={[UserStyle.inputView, {borderColor: error ? "red" : "#ccc"}]}>
                <TextInput
                value={value}
                style={UserStyle.textInput}
                onChangeText={onChangeHandle}
                keyboardType={type}
                placeholder={holderText}
                placeholderTextColor="gray"
                />
            </View>
          }
          <Text style={{color: "red", fontSize: 14}}>{error}</Text>
        </View>
    )
}

export default Input