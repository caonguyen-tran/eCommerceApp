import { Image, Platform, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../configs/Constant";

const WaitingConfirm = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == "android" ? 26 : 0,
        flex: 1,
        backgroundColor: COLORS.shopThemme,
        justifyContent: "flex-start",
        alignItems: "center"
      }}
    >
      <Image
        source={{
          uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1709046594/LogoShop_dauz16.png",
        }}
        style={{ height: 450, width: 400, marginTop: 50 }}
      />
      <TouchableOpacity
        style={{
          height: 38,
          width: 110,
          borderColor: COLORS.active,
          borderWidth: 2,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          borderRadius: 5,
        }}
        activeOpacity={0.7}
        onPress={() => {
          navigation.navigate("Main");
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: COLORS.active,
            fontWeight: "600",
          }}
        >
          Trang Chủ
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WaitingConfirm;
