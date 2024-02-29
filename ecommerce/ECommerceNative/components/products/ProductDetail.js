import { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import API, { authApi, endpoints } from "../../configs/API";
import { COLORS } from "../../configs/Constant";
import Header from "../Header";
import {
  AntDesign,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { NumericFormat } from "react-number-format";
import Rating from "../Rating";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartContext } from "../../configs/MyContext";
import { BlurView } from "expo-blur";

const ProductDetail = ({ route, navigation }) => {
  const { productId } = route.params;
  const [detail, setDetail] = useState({});
  const [shop, setShop] = useState({});
  const [date, setDate] = useState(null);
  const [cart, setCart] = useContext(CartContext);
  const [quantity, setQuantity] = useState(0)
  const formatDate = (date) => {
    let dt = new Date(date);
    let day = dt.getUTCDate();
    let month = dt.getUTCMonth() + 1;
    let year = dt.getUTCFullYear();
    let dateFormat = `${day}-${month}-${year}`;
    setDate(dateFormat);
  };
  useEffect(() => {
    const getDetailProduct = async () => {
      try {
        let productDetail = await API.get(
          endpoints["product-details"](productId)
        );
        setDetail(productDetail.data);
        setShop(productDetail.data.shop);
        formatDate(productDetail.data.shop.date_created);
      } catch (ex) {
        console.log(ex);
      }
    };
    getDetailProduct();
  }, [detail]);

  useEffect(() => {
    const getQuantityProducts = () => {
      tmp = 0;
      for (i = 0; i < cart.length; i++) {
        tmp += cart[i].quantity;
      }
      setQuantity(tmp);
    };
    getQuantityProducts()
  }, [cart])

  const addCart = async () => {
    let token = await AsyncStorage.getItem("access-token");
    let add = await authApi(token).post(endpoints["add-cart"](detail.id));
    setCart(add.data);
  };
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 26 : 0,
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <BlurView
        blurType="light"
        blurAmount={50}
        style={ProductStyle.navigateView}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            backgroundColor: COLORS.active,
            width: 42,
            height: 42,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
          activeOpacity={0.7}
        >
          <FontAwesome5 name="arrow-left" size={18} color="white" />
        </TouchableOpacity>
        <View style={{flexDirection: "row", alignItems: "center"}}>
        <TouchableOpacity
          style={{
            width: 50,
            height: 42,
            justifyContent: "center",
            alignItems: "center",
            marginRight: 10,
          }}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("Cart");
          }}
        >
          <AntDesign name="shoppingcart" size={28} color="black" />
          <View
            style={{
              position: "absolute",
              backgroundColor: "red",
              height: 18,
              width: 18,
              top: 0,
              right: 0,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "600", color: "white" }}>{quantity}</Text>
          </View>
        </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              width: 46,
              height: 48,
              justifyContent: "center",
              alignItems: "center",
            }}
            activeOpacity={0.7}
          >
            <SimpleLineIcons
              name="options-vertical"
              size={24}
              color={COLORS.active}
            />
          </TouchableOpacity>
        </View>
      </BlurView>
      <ScrollView style={ProductStyle.container}>
        <View style={ProductStyle.imageView}>
          <Image
            source={{
              uri: detail.image,
            }}
            style={{ height: "100%", width: "100%" }}
            resizeMode="stretch"
          />
        </View>
        <View style={ProductStyle.contentView}>
          <View
            style={{
              paddingHorizontal: 15,
              paddingVertical: 20,
              backgroundColor: COLORS.lightColor,
              width: "100%",
            }}
          >
            <View
              style={{
                width: "100%",
                alignItems: "flex-start",
                justifyContent: "space-between",
                height: 90,
              }}
            >
              <NumericFormat
                value={detail.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"đ"}
                renderText={(formattedValue) => (
                  <Text
                    style={{
                      fontSize: 28,
                      fontWeight: "700",
                      color: COLORS.active,
                    }}
                  >
                    {formattedValue}
                  </Text>
                )}
              />
              <Text style={{ color: COLORS.active }}>
                Giá khi mua với{" "}
                <MaterialIcons
                  name="discount"
                  size={16}
                  color={COLORS.active}
                />{" "}
                Voucher
              </Text>
              <Text style={{ fontSize: 18, paddingVertical: 20 }}>
                {detail.name}
              </Text>
            </View>
            <TouchableOpacity
              style={{
                height: 50,
                width: 100,
                backgroundColor: COLORS.itemColor,
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                top: 0,
                right: 0,
                marginRight: 15,
                marginTop: 20,
                flexDirection: "row",
              }}
              activeOpacity={0.8}
              onPress={() => {
                addCart();
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  color: COLORS.lightColor,
                }}
              >
                Thêm
              </Text>
              <FontAwesome5
                name="cart-plus"
                size={24}
                color={COLORS.lightColor}
                style={{ paddingHorizontal: 6 }}
              />
            </TouchableOpacity>
            <View
              style={{
                height: 50,
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                paddingTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "92%",
                  height: 40,
                }}
              >
                <FontAwesome name="star" size={18} color="orange" />
                <Text style={{ marginHorizontal: 5, fontSize: 18 }}>4.8/5</Text>
                <View
                  style={{ width: 1, height: 20, backgroundColor: "black" }}
                ></View>
                <Text style={{ marginHorizontal: 5, fontSize: 18 }}>
                  Đã bán 88
                </Text>
              </View>
              <Feather name="heart" size={24} color="black" />
            </View>
          </View>
          <Pressable
            style={{
              height: 110,
              width: "100%",
              backgroundColor: COLORS.lightColor,
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}
          >
            <View style={{ height: "100%", width: 90 }}>
              <Image
                source={{ uri: shop.logo }}
                style={{ height: "100%", borderRadius: 50 }}
              />
            </View>
            <View
              style={{
                alignItems: "flex-start",
                paddingHorizontal: 10,
                flex: 1,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                {shop.name}
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Fontisto name="date" size={16} color="black" />
                <Text style={{ padding: 5, fontSize: 16 }}>{date}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={ProductStyle.selectShop}
              activeOpacity={0.5}
            >
              <Text style={{ fontSize: 16, color: COLORS.active }}>
                Xem Shop
              </Text>
            </TouchableOpacity>
          </Pressable>
          <View
            style={{
              width: "100%",
              backgroundColor: COLORS.lightColor,
              marginTop: 10,
            }}
          >
            <View
              style={{
                width: "100%",
                height: 56,
                borderBottomColor: "#ccc",
                borderBottomWidth: 1,
                paddingHorizontal: 15,
                justifyContent: "center",
              }}
            >
              <Text style={ProductStyle.textHeader}>Chi tiết sản phẩm</Text>
            </View>
            <View style={ProductStyle.viewStyle}>
              <Text style={[ProductStyle.textHeader, { marginBottom: 10 }]}>
                Mô tả sản phẩm
              </Text>
              <Text style={{ fontSize: 15, lineHeight: 23 }}>
                {detail.description}
              </Text>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              backgroundColor: COLORS.lightColor,
              marginTop: 10,
            }}
          >
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: "#ccc",
                width: "100%",
                height: 56,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 15,
              }}
            >
              <View style={{ justifyContent: "center", flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: "600" }}>
                  Đánh Giá Sản Phẩm
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Rating number={5} />
                  <Text style={{ marginHorizontal: 5 }}>(3 đánh giá)</Text>
                </View>
              </View>
              <Pressable
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexDirection: "row",
                  width: 100,
                }}
              >
                <Text style={{ fontSize: 16, color: COLORS.active }}>
                  Xem tất cả
                </Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={18}
                  color={COLORS.active}
                />
              </Pressable>
            </View>
            <View
              style={{
                width: "100%",
                paddingHorizontal: 15,
                paddingVertical: 20,
              }}
            ></View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetail;

const ProductStyle = StyleSheet.create({
  container: {
    backgroundColor: COLORS.itemColor,
  },
  imageView: {
    height: 400,
    width: "100%",
  },
  navigateView: {
    width: "100%",
    height: 56,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    position: "absolute",
    zIndex: 1,
    top: 26,
  },
  contentView: {
    alignItems: "flex-start",
    paddingBottom: 50,
  },
  selectShop: {
    width: 102,
    height: 40,
    borderRadius: 2,
    borderWidth: 1.5,
    borderColor: COLORS.active,
    justifyContent: "center",
    alignItems: "center",
  },
  textHeader: {
    fontSize: 17,
    fontWeight: "600",
  },
  viewStyle: {
    width: "100%",
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: COLORS.lightColor,
  },
});
