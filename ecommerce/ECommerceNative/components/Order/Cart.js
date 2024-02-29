import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Image,
  Button,
  Touchable,
  Alert,
} from "react-native";
import { COLORS } from "../../configs/Constant";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import Empty from "../lottie/Empty";
import MyContext, { CartContext } from "../../configs/MyContext";
import { NumericFormat } from "react-number-format";
import { authApi, endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Cart = ({ navigation }) => {
  const [cart, setCart] = useContext(CartContext);
  const [totalAmount, setTotalAmount] = useState();
  const [totalQuantity, setTotalQuantity] = useState();
  const removeProduct = async (product_id) => {
    let token = await AsyncStorage.getItem("access-token");
    let remove_product = await authApi(token).delete(
      endpoints["remove-product"](product_id)
    );
    setCart(remove_product.data);
  };

  useEffect(() => {
    const getTotalAmount = () => {
      let total_amount = 0;
      for (i = 0; i < cart.length; i++) {
        total_amount += cart[i].total_price;
      }
      setTotalAmount(total_amount);
    };

    const getTotalQuantity = () => {
      let total_quantity = 0;
      for (i = 0; i < cart.length; i++) {
        total_quantity += cart[i].quantity;
      }
      setTotalQuantity(total_quantity);
    };
    getTotalAmount();
    getTotalQuantity();
  }, [cart]);
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == "android" ? 26 : 0,
        flex: 1,
        backgroundColor: COLORS.primary,
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
          style={{width: 30}}
          activeOpacity={0.7}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: "600" }}>Giỏ hàng</Text>
        <Ionicons name="chatbubble-ellipses" size={24} color="black" />
      </View>
      <View
        style={{
          width: "100%",
          height: 26,
          backgroundColor: COLORS.lightColor,
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 8,
        }}
      >
        <MaterialIcons
          name="discount"
          size={18}
          color="black"
          style={{ paddingHorizontal: 5 }}
        />
        <Text style={{ fontSize: 15 }}>Đừng bỏ lỡ mã giảm giá !</Text>
      </View>
      {cart.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%", flex: 1 }}
        >
          {cart.map((item) => (
            <View
              key={item.id}
              style={{
                width: "100%",
                paddingHorizontal: 15,
                paddingVertical: 10,
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  height: 150,
                  alignItems: "center",
                }}
              >
                <Image
                  source={{
                    uri: item.product.image,
                  }}
                  style={{ height: 100, width: 90 }}
                />
                <View
                  style={{
                    marginHorizontal: 15,
                    height: "100%",
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  <View style={{ flex: 1, marginTop: 25 }}>
                    <Text style={{ fontSize: 20, fontWeight: "600" }}>
                      {item.product.name}
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
                  <View
                    style={{
                      width: 90,
                      height: 30,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderColor: COLORS.active,
                      borderWidth: 1,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        height: "100%",
                        backgroundColor: COLORS.active,
                        width: 28,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "600",
                          color: "#fff",
                        }}
                      >
                        -
                      </Text>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {item.quantity}
                    </Text>
                    <TouchableOpacity
                      style={{
                        height: "100%",
                        backgroundColor: COLORS.active,
                        width: 28,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      activeOpacity={0.8}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "600",
                          color: "#fff",
                        }}
                      >
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    removeProduct(item.id);
                  }}
                >
                  <FontAwesome
                    name="trash"
                    size={28}
                    color="red"
                    style={{ paddingHorizontal: 10 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Empty />
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
        </View>
      )}
      <View
        style={{
          width: "100%",
          height: 60,
          backgroundColor: COLORS.lightColor,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginLeft: 10, fontSize: 16 }}>
            Tổng thanh toán:{" "}
          </Text>
          <NumericFormat
            value={totalAmount}
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
        <TouchableOpacity
          style={{
            height: 60,
            width: 130,
            backgroundColor: COLORS.active,
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={0.9}
          onPress={() => {
            cart.length > 0
              ? navigation.navigate("Checkout", {
                total_amount: totalAmount
              })
              : Alert.alert("Ban chua co san pham nao!");
          }}
        >
          <Text style={{ color: "#fff", fontSize: 17, fontWeight: "600" }}>
            Mua hàng ({totalQuantity})
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const cartStyle = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
});
