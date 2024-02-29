import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { COLORS } from "../../configs/Constant";
import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import MyContext, { ShopContext, UserContext } from "../../configs/MyContext";

const Profile = ({ navigation }) => {
  const [user, dispatch] = useContext(UserContext)
  const [shop, setShop] = useContext(ShopContext)
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == "android" ? 26 : 0,
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <View style={profileStyle.headerStyle}>
        <Text style={profileStyle.textHeader}>Profile</Text>
      </View>
      <View style={profileStyle.profileView}>
        <View style={profileStyle.avatarFrame}>
          <Image
            source={{
              uri: user.avatar,
            }}
            style={{ height: 90, width: 90, borderRadius: 5 }}
          />
        </View>
        <Text style={{ fontSize: 22, fontWeight: "600", paddingVertical: 6 }}>
          {`${user.first_name} ${user.last_name}`}
        </Text>
        <Text style={{ fontSize: 16, color: "gray" }}>
          {user.email}
        </Text>
      </View>
      <ScrollView
        style={profileStyle.optionView}
        showsVerticalScrollIndicator={false}
      >
        <Pressable
          style={profileStyle.optionItem}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <MaterialCommunityIcons
            name="account-details"
            size={32}
            color={COLORS.itemColor}
            style={{ width: 40, marginLeft: 10 }}
          />
          <Text
            style={{
              textAlign: "left",
              flex: 1,
              fontSize: 18,
              fontWeight: "600",
              marginLeft: 8,
            }}
          >
            Thông tin chi tiết
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color="gray"
            style={{ padding: 10 }}
          />
        </Pressable>
        <Pressable
          style={profileStyle.optionItem}
          onPress={() => {
            if (shop.confirm_status == true) {
              navigation.navigate("ShopStack");
            } else if (shop.name == "") {
              navigation.navigate("ShopIntro");
            } else if (shop.confirm_status == false) {
              navigation.navigate("WaitingConfirm");
            }
          }}
        >
          <FontAwesome6
            name="shop"
            size={26}
            color={COLORS.itemColor}
            style={{ width: 40, marginLeft: 10 }}
          />
          <Text
            style={{
              textAlign: "left",
              flex: 1,
              fontSize: 18,
              fontWeight: "600",
              marginLeft: 8,
            }}
          >
            Shop của tôi
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color="gray"
            style={{ padding: 10 }}
          />
        </Pressable>
        <Pressable style={profileStyle.optionItem}>
          <FontAwesome6
            name="wallet"
            size={26}
            color={COLORS.itemColor}
            style={{ width: 40, marginLeft: 10 }}
          />
          <Text
            style={{
              textAlign: "left",
              flex: 1,
              fontSize: 18,
              fontWeight: "600",
              marginLeft: 8,
            }}
          >
            Wallet
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color="gray"
            style={{ padding: 10 }}
          />
        </Pressable>
        <Pressable
          style={profileStyle.optionItem}
          onPress={() => {
            navigation.navigate("History");
          }}
        >
          <FontAwesome5
            name="history"
            size={26}
            color={COLORS.itemColor}
            style={{ width: 40, marginLeft: 10 }}
          />
          <Text
            style={{
              textAlign: "left",
              flex: 1,
              fontSize: 18,
              fontWeight: "600",
              marginLeft: 8,
            }}
          >
            Lịch sử mua hàng
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color="gray"
            style={{ padding: 10 }}
          />
        </Pressable>
        <Pressable style={profileStyle.optionItem}>
          <AntDesign
            name="heart"
            size={26}
            color={COLORS.itemColor}
            style={{ width: 40, marginLeft: 10 }}
          />
          <Text
            style={{
              textAlign: "left",
              flex: 1,
              fontSize: 18,
              fontWeight: "600",
              marginLeft: 8,
            }}
          >
            Danh sách yêu thích
          </Text>
          <MaterialIcons
            name="arrow-forward-ios"
            size={16}
            color="gray"
            style={{ padding: 10 }}
          />
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Profile;

const profileStyle = StyleSheet.create({
  headerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 58,
  },
  textHeader: {
    fontSize: 24,
    fontWeight: "600",
  },
  profileView: {
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 50,
  },
  avatarFrame: {
    height: 110,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 10,
    marginVertical: 10,
  },
  optionView: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    position: "absolute",
    top: "45%",
    elevation: 30,
    height: "100%",
    paddingVertical: 20,
    paddingHorizontal: 12,
  },
  optionItem: {
    width: "100%",
    height: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
});
