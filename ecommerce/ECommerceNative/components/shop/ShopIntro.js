import {
  Image,
  Platform,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../configs/Constant";
import { MaterialIcons } from "@expo/vector-icons";

const ShopIntro = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == "android" ? 26 : 0,
        flex: 1,
        backgroundColor: COLORS.shopThemme,
      }}
    >
      <View
        style={{
          height: 64,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 20,
        }}
      >
        <TouchableOpacity
          style={{ width: 40 }}
          activeOpacity={0.7}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: "600" }}>Tạo cửa hàng</Text>
        <View style={{ width: 40 }}></View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: COLORS.shopThemme,
        }}
      >
        <Image
          style={{ width: 300, height: 300, marginTop: 200 }}
          source={{
            uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1709140072/shop_ygkkbt.png",
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.shopActive,
            width: "92%",
            height: 56,
            borderRadius: 7,
            marginBottom: 24,
            elevation: 10
          }}
          onPress={() => navigation.navigate("RegisterShop")}
        >
          <Text
            style={{
              fontSize: 20,
              color: "#fff",
              textAlign: "center",
              lineHeight: 56,
              fontWeight: "600",
            }}
          >
            Tạo shop của bạn
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ShopIntro;
