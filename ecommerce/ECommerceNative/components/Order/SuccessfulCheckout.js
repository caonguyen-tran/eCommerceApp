import { Image, Platform, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../configs/Constant";

const SuccessfulCheckout = ({navigation}) => {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == "android" ? 26 : 0,
        flex: 1,
        backgroundColor: COLORS.primary,
        justifyContent: "flex-start",
        alignItems: "center"
      }}
    >
      <Image
        source={{
          uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1708885626/doneCheckout_zrkghj.png",
        }}
        style={{height: 450, width: 300, marginTop: 100}}
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
              navigation.navigate("Home");
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

export default SuccessfulCheckout;
