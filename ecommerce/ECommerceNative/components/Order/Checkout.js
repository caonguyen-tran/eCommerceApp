import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { COLORS } from "../../configs/Constant";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import { CartContext, UserContext } from "../../configs/MyContext";
import { NumericFormat } from "react-number-format";
import API, { authApi, endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingView from "../lottie/LoadingView";

const Checkout = ({route, navigation }) => {
  const [cart, setCart] = useContext(CartContext);
  const [next, setNext] = useState(false);
  //   const [user, dispatch] = useContext(UserContext);
  const [address, setAddress] = useState("02 Ho tung mau ne");
  const [pays, setPays] = useState([]);
  const [active, setActive] = useState(1);
  const {total_amount} = route.params
  useEffect(() => {
    const getPayMethods = async () => {
      try {
        let pays = await API.get(endpoints["pays"]);
        setPays(pays.data.results);
        console.log(cart)
      } catch (ex) {
        console.log(ex);
      }
    };
    getPayMethods();
  }, []);

  const checkoutHandle = async () => {
    try {
      let data = {
        "address": address,
        "pay_id": active
      }
      let token = await AsyncStorage.getItem("access-token");
      let handle = await authApi(token).post(endpoints["checkout"], data);
      setCart([])
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == "android" ? 26 : 0,
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <View style={CheckoutStyles.headerView}>
        <TouchableOpacity
          style={{ width: 30 }}
          activeOpacity={0.7}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: "600" }}>
          Thông tin đặt hàng
        </Text>
        <View style={{ width: 40 }}></View>
      </View>
      <View style={CheckoutStyles.container}>
        <View style={CheckoutStyles.processTab}>
          <View
            style={[
              CheckoutStyles.processItem,
              { backgroundColor: !next ? COLORS.active : "#ccc" },
            ]}
          >
            <Entypo name="location-pin" size={30} color="white" />
          </View>
          <View style={{ flex: 1, height: 5, backgroundColor: "#ccc" }}></View>
          <View
            style={[
              CheckoutStyles.processItem,
              { backgroundColor: next ? COLORS.active : "#ccc" },
            ]}
          >
            <MaterialIcons name="payments" size={30} color="white" />
          </View>
        </View>
        {!next ? (
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View style={CheckoutStyles.addressView}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingVertical: 15,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "700" }}>
                  Địa chỉ nhận hàng
                </Text>
              </View>
              <View
                style={{
                  height: 130,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: COLORS.active,
                  padding: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  <TextInput
                    spellCheck={false}
                    multiline
                    style={{ flex: 1, fontSize: 18, fontWeight: "500" }}
                    onChangeText={(t) => setAddress(t)}
                  >
                    {address}
                  </TextInput>
                  <FontAwesome5 name="pen" size={18} color={COLORS.active} />
                </View>
                <View
                  style={{
                    width: "100%",
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <AntDesign
                    name="checkcircle"
                    size={20}
                    color={COLORS.active}
                  />
                </View>
              </View>
            </View>
            <View style={CheckoutStyles.summaryView}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingVertical: 15,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "700" }}>
                  Sản phẩm trong giỏ hàng
                </Text>
              </View>
              <View style={{ paddingBottom: 20 }}>
                {cart.map((item) => (
                  <View key={item.id} style={CheckoutStyles.productStyle}>
                    <Image
                      source={{ uri: item.product.image }}
                      style={{ height: 70, width: 60 }}
                    />
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "500",
                        flex: 1,
                        paddingLeft: 15,
                      }}
                    >
                      {item.product.name}
                    </Text>
                    <Text style={{ fontSize: 16, paddingHorizontal: 15 }}>
                      x{item.quantity}
                    </Text>
                    <NumericFormat
                      value={item.total_price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"đ"}
                      renderText={(formattedValue) => (
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "700",
                          }}
                        >
                          {formattedValue}
                        </Text>
                      )}
                    />
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        ) : (
          <>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-start",
                  paddingVertical: 15,
                }}
              >
                <Text style={{ fontSize: 20, fontWeight: "700" }}>
                  Chọn phương thức thanh toán
                </Text>
              </View>
              <View style={{ padding: 15 }}>
                {pays.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    activeOpacity={0.9}
                    style={{
                      height: 70,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      backgroundColor:
                        active == item.id ? COLORS.active : "#ccc",
                      marginVertical: 8,
                      elevation: 20,
                      borderRadius: 8,
                    }}
                    onPress={() => {
                      setActive(item.id);
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: 40,
                        height: 40,
                        marginHorizontal: 10,
                        borderRadius: 8,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 19,
                        fontWeight: "600",
                        color: active == item.id ? "white" : "black",
                      }}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        )}
      </View>
      <View style={CheckoutStyles.footerView}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 19, fontWeight: "600" }}>
            Tổng thanh toán:{"  "}
          </Text>
          <NumericFormat
            value={total_amount}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"đ"}
            renderText={(formattedValue) => (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: COLORS.active,
                }}
              >
                {formattedValue}
              </Text>
            )}
          />
        </View>
        {!next ? (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              width: 110,
              backgroundColor: COLORS.active,
              elevation: 20,
              borderRadius: 5,
            }}
            onPress={() => {
              setNext(!next);
            }}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
              Xong
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              height: 50,
              width: 110,
              backgroundColor: COLORS.active,
              elevation: 20,
              borderRadius: 5,
            }}
            onPress={() => {
              checkoutHandle()
              navigation.navigate("CheckoutSuccess")
            }}
            activeOpacity={0.7}
          >
            <Text style={{ fontSize: 20, fontWeight: "600", color: "white" }}>
              Pay
            </Text>
            <View
              style={{
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 8,
              }}
            >
              <AntDesign name="arrowright" size={24} color="white" />
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};
export default Checkout;

export const CheckoutStyles = StyleSheet.create({
  headerView: {
    height: 64,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  processTab: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 40,
    paddingVertical: 15,
  },
  processItem: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    width: 45,
    height: 45,
    elevation: 30,
  },
  addressView: {
    paddingVertical: 20,
  },
  summaryView: {},
  productStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    height: 80,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
  },
  footerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 65,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.lightColor,
  },
});
