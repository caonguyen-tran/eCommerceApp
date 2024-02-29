import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../configs/Constant";
import { useContext, useState } from "react";
import ShopCategory from "./ShopCategory";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import InfoShop from "./InfoShop";
import LogoShop from "./LogoShop";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/API";
import { ShopContext } from "../../configs/MyContext";

const RegisterShop = ({ navigation }) => {
  const [active, setActive] = useState(1);
  const [error, setError] = useState({});
  const [logo, setLogo] = useState({ uri: null });
  const [shop, setShop] = useContext(ShopContext)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({
    "name": "",
    "address": "",
    "logo": {uri: null}
  })
  const commitRegister = async () => {
    setLoading(true)
    let form = new FormData();
    for (let key in data) {
      if (key == "logo") {
        form.append(key, {
          uri: data[key].uri,
          name: data[key].fileName,
          type: data[key].type,
        });
      } else {
        form.append(key, data[key]);
      }
    }
    try {
      let token = await AsyncStorage.getItem("access-token");
      let shop_res = await authApi(token).post(endpoints["create-shop"], form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(shop_res.data);
      setShop(shop_res.data)
      navigation.navigate("WaitingConfirm");
    } catch (ex) {
      console.log(ex);
    }
    setLoading(false)
  };
  const register = () => {
    setError({});
    valid = true;
    if (data.name== "") {
      valid = false;
      handleError("name", "Hãy đặt tên cho shop của bạn!");
      setActive(2);
    }
    if (data.address == "") {
      valid = false;
      handleError("address", "Hãy nhập địa chỉ cửa hàng!");
      setActive(2);
    }
    if (valid) {
      commitRegister();
    }
  };
  const handleError = (input, value) => {
    setError((current_error) => ({ ...current_error, [input]: value }));
  };

  const changeInput = (field, value) => {
    setData((current) => {
      return { ...current, [field]: value };
    });
  };
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == "android" ? 26 : 0,
        flex: 1,
        backgroundColor: COLORS.shopThemme,
        justifyContent: "center",
      }}
    >
      <View style={RegisterStyle.container}>
        <View style={RegisterStyle.processView}>
          <View
            style={[
              RegisterStyle.processItem,
              { backgroundColor: active == 1 ? COLORS.shopActive : "gray" },
            ]}
          >
            <MaterialIcons name="category" size={24} color="black" />
          </View>
          <View style={RegisterStyle.lineHorizontal}></View>
          <View
            style={[
              RegisterStyle.processItem,
              { backgroundColor: active == 2 ? COLORS.shopActive : "gray" },
            ]}
          >
            <FontAwesome name="pencil-square-o" size={24} color="black" />
          </View>
          <View style={RegisterStyle.lineHorizontal}></View>
          <View
            style={[
              RegisterStyle.processItem,
              { backgroundColor: active == 3 ? COLORS.shopActive : "gray" },
            ]}
          >
            <Feather name="image" size={24} color="black" />
          </View>
        </View>
        <View style={RegisterStyle.contentInput}>
          {active == 1 ? (
            <ShopCategory nextHandle={() => setActive(2)} />
          ) : active == 2 ? (
            <InfoShop
              name={data.name}
              address={data.address}
              onNameChange={(t) => {
                changeInput('name', t)
              }}
              onAddressChange={(t) => {
                changeInput('address', t)
              }}
              prevHandle={() => {
                setActive(1);
              }}
              nextHandle={() => {
                setActive(3);
              }}
              error={error}
            />
          ) : (
            <LogoShop
              prevHandle={() => {
                setActive(2);
              }}
              logo={data.logo}
              changeInput={changeInput}
              register={register}
              loading={loading}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterShop;

const RegisterStyle = StyleSheet.create({
  container: {
    height: "80%",
    justifyContent: "space-between",
  },
  processView: {
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },
  processItem: {
    height: 45,
    width: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
  lineHorizontal: {
    height: 5,
    flex: 1,
    backgroundColor: "gray",
  },
  contentInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  headerView: {
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: 15,
  },
  textHeader: {
    fontSize: 22,
    fontWeight: "600",
  },
});
