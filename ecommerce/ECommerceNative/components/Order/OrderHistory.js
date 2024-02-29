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
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/API";
import { NumericFormat } from "react-number-format";
import LoadingView from "../lottie/LoadingView";

const OrderHistory = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const getOrder = async () => {
      try {
        let token = await AsyncStorage.getItem("access-token");
        let orders = await authApi(token).get(endpoints["orders"]);
        setOrders(orders.data);
      } catch (ex) {
        console.log(ex);
      }
    };
    getOrder();
    setLoading(false);
  }, []);
  const formatDate = (date) => {
    let dt = new Date(date);
    let day = dt.getUTCDate();
    let month = dt.getUTCMonth() + 1;
    let year = dt.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == "android" ? 26 : 0,
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <View style={HistoryStyles.headerView}>
        <TouchableOpacity
          style={{ width: 40 }}
          activeOpacity={0.7}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: "600" }}>
          Lịch sử đơn hàng
        </Text>
        <View style={{ width: 40 }}></View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingVertical: 10, flex: 1 }}>
          {orders.length > 0 ? (
            orders.map((item) => (
              <View key={item.id} style={HistoryStyles.orderView}>
                <View style={HistoryStyles.nameShopView}>
                  <Text style={{ fontSize: 17, color: COLORS.active }}>
                    Đặt hàng thành công
                  </Text>
                  <FontAwesome
                    name="check-circle"
                    size={20}
                    color={COLORS.active}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#ccc",
                  }}
                >
                  <View
                    style={{
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      height: 100,
                      paddingVertical: 8,
                      flex: 1,
                    }}
                  >
                    <Text style={{ fontSize: 17, fontWeight: "600" }}>
                      Mã đơn hàng: {item.id}
                    </Text>
                    <Text style={{ fontSize: 17 }}>
                      Ngày đặt hàng: {formatDate(item.order_date)}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ fontSize: 17 }}>Tổng thanh toán: </Text>
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
                              color: COLORS.active,
                            }}
                          >
                            {formattedValue}
                          </Text>
                        )}
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => {
                      navigation.navigate("OrderDetail", {
                        orderId: item.id,
                        address: item.address,
                        pay: {
                            name: item.pay.name,
                            image: item.pay.image
                        },
                        order_date: formatDate(item.order_date),
                        total_price: item.total_price
                      });
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        color: COLORS.active,
                        fontWeight: "600",
                      }}
                    >
                      Xem chi tiết
                    </Text>
                    <MaterialIcons
                      name="arrow-forward-ios"
                      size={20}
                      color={COLORS.active}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    height: 50,
                  }}
                >
                  <View>
                    <Text style={{ fontSize: 18, fontWeight: "600" }}>
                      Phương thức thanh toán:{" "}
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "600" }}>
                      {item.pay.name}
                    </Text>
                  </View>
                  <Image
                    source={{ uri: item.pay.image }}
                    style={{ height: 40, width: 40, borderRadius: 8 }}
                  />
                </View>
              </View>
            ))
          ) : !loading ? (
            <LoadingView />
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Image
                source={{
                  uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1708867445/ordernone_eb26l3.png",
                }}
                style={{ width: "100%", height: 400 }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default OrderHistory;

const HistoryStyles = StyleSheet.create({
  container: { paddingVertical: 10 },
  headerView: {
    height: 64,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  orderView: {
    padding: 10,
    backgroundColor: COLORS.lightColor,
    margin: 10,
    borderRadius: 8,
    elevation: 10,
  },
  nameShopView: {
    flexDirection: "row",
    height: 40,
    justifyContent: "space-between",
  },
  orderItem: {},
  productView: {},
});
