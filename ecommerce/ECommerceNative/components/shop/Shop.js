import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../configs/Constant";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../../configs/MyContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/API";
import { NumericFormat } from "react-number-format";
import Empty from "../lottie/Empty";
import { Entypo, MaterialIcons } from "@expo/vector-icons";
import LoadingView from "../lottie/LoadingView";

const Shop = ({ navigation }) => {
  const [shop, setShop] = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        let token = await AsyncStorage.getItem("access-token");
        let get_products = await authApi(token).get(
          endpoints["shop-products"](shop.id)
        );
        setProducts(get_products.data);
      } catch (ex) {
        console.log(ex);
      }
    };
    getProducts();
    setLoading(false);
  }, [products]);
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == "android" ? 26 : 0,
        flex: 1,
        backgroundColor: COLORS.shopThemme,
      }}
    >
      <View style={Styles.header}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* <TouchableOpacity
            style={{ width: 40 }}
            activeOpacity={0.7}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <MaterialIcons name="arrow-back-ios" size={24} color="black" />
          </TouchableOpacity> */}
          <Image
            source={{ uri: shop.logo }}
            style={{ height: 45, width: 45, borderRadius: 25 }}
          />
        </View>
        <TouchableOpacity
          style={{
            height: 50,
            width: 130,
            borderRadius: 5,
            elevation: 10,
            backgroundColor: COLORS.shopActive,
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            paddingHorizontal: 10,
          }}
          activeOpacity={0.7}
          onPress={() => {
            navigation.navigate("CreateProduct");
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: "500", color: "white" }}>
            Thêm sản phẩm
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 10,
          height: 55,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: "600",
            color: COLORS.shopActive,
          }}
        >
          Các sản phẩm của shop đang được bán
        </Text>
      </View>
      <ScrollView
        style={{
          paddingHorizontal: 15,
          flex: 1,
        }}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={Styles.productView}>
          {products.length > 0 ? (
            <>
              {products.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={Styles.productItem}
                  activeOpacity={0.9}
                >
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: "100%",
                      height: "60%",
                      borderRadius: 10,
                    }}
                    resizeMode="stretch"
                  />
                  <View
                    style={{
                      height: "40%",
                      justifyContent: "space-between",
                      paddingVertical: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "600",
                        paddingHorizontal: 10,
                      }}
                    >
                      {item.name}
                    </Text>
                    <View style={Styles.rateView}>
                      <Entypo name="star" size={16} color="orange" />
                      <Entypo name="star" size={16} color="orange" />
                      <Entypo name="star" size={16} color="orange" />
                      <Entypo name="star" size={16} color="orange" />
                      <Entypo name="star" size={16} color="#ccc" />
                    </View>
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        color: "#fff",
                        fontStyle: "italic",
                        fontWeight: "600",
                      }}
                    >
                      {item.shop.name}
                    </Text>
                    <NumericFormat
                      value={item.price}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"đ"}
                      renderText={(formattedValue) => (
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: "700",
                            paddingHorizontal: 10,
                          }}
                        >
                          {formattedValue}
                        </Text>
                      )}
                    />
                  </View>
                  <View style={Styles.productHeader}>
                    <Text style={{ fontSize: 12, fontWeight: "600" }}>New</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </>
          ) : (
            <>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LoadingView />
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Shop;

const Styles = StyleSheet.create({
  container: {},
  header: {
    height: 70,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  productView: {
    height: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    columnGap: 15,
    rowGap: 15,
  },
  productItem: {
    width: "45%",
    height: 320,
    backgroundColor: COLORS.itemColor,
    borderRadius: 10,
    justifyContent: "space-between",
    elevation: 15,
  },
  rateView: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  productHeader: {
    position: "absolute",
    height: 30,
    width: 40,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 5,
    elevation: 10,
  },
});
