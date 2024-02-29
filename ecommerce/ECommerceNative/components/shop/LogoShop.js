import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../configs/Constant";
import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import { useEffect } from "react";
import LottieView from "lottie-react-native";

const LogoShop = ({
  navigation,
  prevHandle,
  logo,
  changeInput,
  register,
  loading,
}) => {
  const pickImage = async () => {
    let result = await launchImageLibraryAsync();
    console.log(result);
    if (!result.canceled) {
      changeInput("logo", result.assets[0]);
    }
  };
  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={Styles.headerView}>
          <Text style={Styles.textHeader}>Hãy chọn ảnh cho shop của bạn</Text>
        </View>
        <View style={Styles.contentView}>
          <View
            style={{
              height: 140,
              width: 140,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "gray",
              elevation: 10,
              borderRadius: 5,
            }}
          >
            <Image
              source={{ uri: logo.uri }}
              style={{ height: "80%", width: "80%", borderRadius: 5 }}
            />
          </View>
          <TouchableOpacity
            style={{
              height: 45,
              width: 90,
              borderRadius: 3,
              backgroundColor: COLORS.shopActive,
              marginTop: 25,
              elevation: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
            activeOpacity={0.7}
            onPress={() => pickImage()}
          >
            <Text style={Styles.textStyle}>Chọn</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={Styles.footerNavigation}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={Styles.prevButton}
          onPress={prevHandle}
        >
          <Text style={Styles.textStyle}>Trở lại</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={Styles.nextButton}
          onPress={register}
        >
          {loading ? (
            <LottieView
              style={{ height: 150, width: 150 }}
              source={require("../static/loading.json")}
              autoPlay
              loop
            />
          ) : (
            <Text style={Styles.textStyle}>Tạo shop</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
};

export default LogoShop;

const Styles = StyleSheet.create({
  headerView: {
    justifyContent: "centwer",
    alignItems: "flex-start",
    paddingHorizontal: 15,
  },
  textHeader: {
    fontSize: 36,
    fontWeight: "700",
  },
  contentView: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  footerNavigation: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  nextButton: {
    height: 55,
    width: 100,
    backgroundColor: COLORS.shopActive,
    elevation: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  prevButton: {
    height: 55,
    width: 100,
    backgroundColor: "gray",
    elevation: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  textStyle: {
    fontSize: 19,
    fontWeight: "500",
    color: "white",
  },
});
