import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { COLORS } from './../../configs/Constant';
import { FontAwesome6 } from "@expo/vector-icons";

const CategoryItem = ({ name, icon }) => {
  const [active, setActive] = useState(false);
  const pressHandle = () => {
    setActive(!active);
  };
  return (
    <>
      <TouchableOpacity
        onPress={pressHandle}
        activeOpacity={0.7}
        style={{
          height: 60,
          width: 130,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 6,
          borderWidth: active ? 1 : 0,
          borderColor: COLORS.shopActive,
          backgroundColor: active ? COLORS.shopActive : "gray",
          paddingHorizontal: 10,
          elevation: 10
        }}
      >
        <FontAwesome6 name={icon} size={24} color="white" />
        <Text style={{fontSize: 16, fontWeight: "500", color: "white", flex: 1, marginHorizontal: 10}}>{name}</Text>
      </TouchableOpacity>
    </>
  );
};

export default CategoryItem
