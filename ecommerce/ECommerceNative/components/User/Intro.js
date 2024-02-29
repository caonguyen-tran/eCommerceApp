import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import Login from "./Login";
import { COLORS } from "../../configs/Constant";

const Intro = function ({ navigation }) {
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == "android" ? 26 : 0,
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={IntroStyle.container}>
        <Image
          style={IntroStyle.imageStyle}
          source={{
            uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1709150598/tnEC_App_bmosmy.png",
          }}
        />
        <TouchableOpacity
          style={IntroStyle.btnStyle}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={IntroStyle.textStyle}>Bắt đầu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const IntroStyle = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  btnStyle: {
    backgroundColor: COLORS.active,
    width: "92%",
    height: 56,
    borderRadius: 7,
    marginBottom: 24,
  },
  textStyle: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center",
    lineHeight: 56,
    fontWeight: "600",
  },
  imageStyle: {
    width: 400,
    height: 400,
    marginTop: 200,
  },
});

export default Intro;
