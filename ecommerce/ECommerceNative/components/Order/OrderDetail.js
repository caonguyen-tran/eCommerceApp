import {
  AntDesign,
  Entypo,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/API";
import { UserContext } from "../../configs/MyContext";
import { NumericFormat } from "react-number-format";

const OrderDetail = ({ route, navigation }) => {
  const { orderId, pay, order_date, total_price } = route.params;
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  //   const [user, dispatch] = useContext(UserContext)
  useEffect(() => {
    const getOrderDetail = async () => {
      try {
        setLoading(true);
        let token = await AsyncStorage.getItem("access-token");
        let details = await authApi(token).get(
          endpoints["order-detail"](orderId)
        );
        setDetail(details.data);
      } catch (ex) {
        console.log(ex);
      }
    };
    getOrderDetail();
    setLoading(false);
  }, []);
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == "android" ? 26 : 0,
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <View style={DetailStyles.headerView}>
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
          Chi tiết đơn hàng
        </Text>
        <View style={{ width: 40 }}></View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            height: 100,
            backgroundColor: "#208D6D",
            padding: 15,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ justifyContent: "center", height: 70, flex: 1 }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                color: "white",
                marginVertical: 5,
              }}
            >
              Đơn hàng đã thanh toán
            </Text>
            <Text style={{ fontSize: 16, color: "white" }}>
              Đơn hàng được đặt vào ngày: {order_date}
            </Text>
          </View>
          <View>
            <AntDesign
              name="like1"
              size={34}
              color="white"
              style={{ marginRight: 10 }}
            />
          </View>
        </View>
        <View
          style={{
            padding: 10,
            backgroundColor: COLORS.lightColor,
            marginBottom: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", height: 35 }}
            >
              <FontAwesome name="map-marker" size={24} color="black" />
              <Text
                style={{
                  marginHorizontal: 15,
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                Địa chỉ nhận hàng
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.7}>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 16,
                  color: COLORS.active,
                }}
              >
                SAO CHÉP
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingHorizontal: 10,
              justifyContent: "center",
              alignItems: "flex-start",
            }}
          >
            <Text style={{ fontSize: 15 }}>Tran Cao Nguyen</Text>
            <Text style={{ fontSize: 15 }}>(+84) 364127383</Text>
            <Text style={{ fontSize: 15 }}>Tran Cao Nguyen</Text>
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 10,
            backgroundColor: COLORS.lightColor,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              paddingVertical: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Entypo name="info-with-circle" size={20} color="black" />
              <Text style={{ fontSize: 16, fontWeight: "500", marginLeft: 10 }}>
                Thông tin sản phẩm
              </Text>
            </View>
          </View>
          {detail.map((item) => (
            <View
              key={item.id}
              style={{ flexDirection: "row", paddingVertical: 15 }}
            >
              <Image
                source={{ uri: item.product.image }}
                style={{ height: 75, width: 70 }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "500",
                    paddingHorizontal: 10,
                  }}
                >
                  {item.product.name}
                </Text>
                <View
                  style={{
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                  }}
                >
                  <Text style={{ marginVertical: 3 }}>x{item.quantity}</Text>
                  <NumericFormat
                    value={item.total_price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"đ"}
                    renderText={(formattedValue) => (
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "500",
                          color: COLORS.active,
                        }}
                      >
                        {formattedValue}
                      </Text>
                    )}
                  />
                </View>
              </View>
            </View>
          ))}
          <View
            style={{
              height: 40,
              backgroundColor: COLORS.lightColor,
              borderTopColor: "gray",
              borderTopWidth: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: "500" }}>Thành tiền</Text>
            <NumericFormat
              value={total_price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"đ"}
              renderText={(formattedValue) => (
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "500",
                    color: COLORS.active,
                  }}
                >
                  {formattedValue}
                </Text>
              )}
            />
          </View>
        </View>
        <View
          style={{
            padding: 10,
            backgroundColor: COLORS.lightColor,
            marginTop: 10,
            flexDirection: "row"
          }}
        >
          <View style={{flex: 1}}>
            <Text style={{ fontSize: 18, fontWeight: "500" }}>
              Phương thức thanh toán
            </Text>
            <Text style={{ fontSize: 16 }}>{pay.name}</Text>
          </View>
          <Image source={{uri: pay.image}} style={{height: 40, width: 40, borderRadius: 5}}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetail;

const DetailStyles = StyleSheet.create({
  container: {},
  headerView: {
    height: 64,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
});
