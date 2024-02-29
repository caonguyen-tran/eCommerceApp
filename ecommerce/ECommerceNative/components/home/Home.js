import {
  View,
  Text,
  SafeAreaView,
  Platform,
  Pressable,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Feather, AntDesign, Fontisto, Entypo } from "@expo/vector-icons";
import HomeStyle from "./HomeStyle";
import { useContext, useEffect, useState } from "react";
import { SliderBox } from "react-native-image-slider-box";
import { COLORS, PAGE_SIZE } from "./../../configs/Constant";
import API, { authApi, endpoints } from "../../configs/API";
import { NumericFormat } from "react-number-format";
import MyContext, {
  CartContext,
  CategoriesContext,
} from "../../configs/MyContext";
import LottieView from "lottie-react-native";
import LoadingView from "../lottie/LoadingView";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Home = ({ navigation }) => {
  const [keyword, setKeyword] = useState("");
  const [active, setActive] = useState(0);
  const [products, setProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const cates = useContext(CategoriesContext);
  const [cart, setCart] = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);
  const [pageList, setPageList] = useState([]);
  const images = [
    "https://res.cloudinary.com/dndakokcz/image/upload/v1707480391/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_2_h7prjp.png",
    "https://res.cloudinary.com/dndakokcz/image/upload/v1707480391/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_1_fhzobj.png",
    "https://res.cloudinary.com/dndakokcz/image/upload/v1707480391/Thi%E1%BA%BFt_k%E1%BA%BF_ch%C6%B0a_c%C3%B3_t%C3%AAn_gq2iwj.png",
  ];

  const handleToggle = (id) => {
    setActive(id);
  };

  useEffect(() => {
    const getQuantityProducts = () => {
      tmp = 0;
      for (i = 0; i < cart.length; i++) {
        tmp += cart[i].quantity;
      }
      setQuantity(tmp);
    };

    const getPageNumber = () => {
      list = [];
      for (i = 1; i <= count; i++) {
        list.push({ id: i });
      }
      setPageList(list);
    };
    getPageNumber();
    getQuantityProducts();
  }, [cart, count]);
  useEffect(() => {
    const getAllProducts = async () => {
      setLoading(true);
      url = endpoints["products"];
      if (text != "") {
        url = `${url}?kw=${text}`;
      }
      try {
        let loadProducts = await API.get(url);
        setProducts(loadProducts.data.results);
        setCount(Math.round(loadProducts.data.count / PAGE_SIZE));
      } catch (ex) {
        console.log(ex);
      }
      setLoading(false);
    };
    getAllProducts();
  }, [text]);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      url = endpoints["products"] + `?page=${pageNumber}`;
      if (keyword != "") {
        url = `${url}&?kw=${keyword}`;
      }
      try {
        let loadProducts = await API.get(url);
        setProducts(loadProducts.data.results);
      } catch (ex) {
        console.log(ex);
      }
      setLoading(false);
    };
    getProducts();
  }, [pageNumber]);
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS === "android" ? 26 : 0,
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <View style={HomeStyle.viewSearch}>
        <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: COLORS.lightColor,
            height: 42,
            width: "90%",
            borderRadius: 4,
            flex: 1,
            marginHorizontal: 10,
          }}
        >
          <Feather
            name="search"
            size={24}
            style={{ padding: 10, color: "#000" }}
          />
          <View
            style={{
              height: 36,
              width: 2,
              backgroundColor: COLORS.primary,
              opacity: 0.5,
            }}
          ></View>
          <TextInput
            name="kw"
            value={keyword}
            style={HomeStyle.textInputStyle}
            placeholder="Từ khóa tìm kiếm"
            onChangeText={setKeyword}
            onEndEditing={() => {
              setText(keyword);
            }}
            placeholderTextColor="gray"
          />
        </Pressable>
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
          <AntDesign name="shoppingcart" size={34} color="black" />
          <View
            style={{
              position: "absolute",
              backgroundColor: "red",
              height: 20,
              width: 20,
              top: 0,
              right: 0,
              borderRadius: 25,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontWeight: "600", color: "white" }}>
              {quantity}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={HomeStyle.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={HomeStyle.viewSliderStyle}>
          <SliderBox
            ImageComponentStyle={{ borderRadius: 15, width: "99%" }}
            images={images}
            dotColor="black"
            autoplay
            playInterval={8000}
            loop
          />
        </View>
        <View style={HomeStyle.viewCategory}>
          <View style={HomeStyle.textCategory}>
            <Text style={{ fontSize: 19, fontWeight: "800" }}>
              Top Danh mục
            </Text>
            <Pressable>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "600",
                  color: COLORS.itemColor,
                }}
              >
                Xem tất cả
              </Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              flexDirection: "row",
              justifyContent: "flex-start",
              paddingHorizontal: 10,
            }}
          >
            {cates.map((item) => (
              <TouchableOpacity
                onPress={() => handleToggle(item.id)}
                key={item.id}
                style={[
                  HomeStyle.categoryItemStyle,
                  {
                    borderWidth: active == item.id ? 3 : 0,
                    borderColor: COLORS.activeStrength,
                  },
                ]}
                activeOpacity={0.9}
              >
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 8,
                    marginTop: 10,
                  }}
                  source={{ uri: item.image }}
                />
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 17,
                    fontWeight: "600",
                    paddingTop: 10,
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View
          style={{
            width: "100%",
            paddingVertical: 20,
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <View style={HomeStyle.textProduct}>
            <Text style={{ fontSize: 19, fontWeight: "800" }}>
              Top Sản phẩm
            </Text>
            <Pressable>
              <Text
                style={{
                  fontSize: 19,
                  fontWeight: "600",
                  color: COLORS.itemColor,
                }}
              >
                Xem tất cả
              </Text>
            </Pressable>
          </View>
          <View style={HomeStyle.productView}>
            {loading ? (
              <LoadingView />
            ) : (
              <>
                {products.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={HomeStyle.productItem}
                    activeOpacity={0.9}
                    onPress={() =>
                      navigation.navigate("ProductDetail", {
                        productId: item.id,
                      })
                    }
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
                      <View style={HomeStyle.rateView}>
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
                    <View style={HomeStyle.productHeader}>
                      <Text style={{ fontSize: 12, fontWeight: "600" }}>
                        New
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </>
            )}
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: 80,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 20,
            paddingHorizontal: 15,
          }}
        >
          {pageList.map((item) => (
            <Pressable
              key={item.id}
              style={{
                height: "100%",
                width: 30,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor:
                  item.id == pageNumber ? COLORS.active : COLORS.lightColor,
                marginHorizontal: 3,
                borderRadius: 5,
                elevation: 10,
              }}
              onPress={() => {
                setPageNumber(item.id);
              }}
            >
              <Text
                style={{ color: item.id == pageNumber ? "white" : "black" }}
              >
                {item.id}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
