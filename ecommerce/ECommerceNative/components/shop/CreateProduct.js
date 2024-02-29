import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../../configs/Constant";
import { MaterialIcons } from "@expo/vector-icons";
import { useContext, useEffect, useState } from "react";
import API, { authApi, endpoints } from "../../configs/API";
import { SelectList } from "react-native-dropdown-select-list";
import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ShopContext } from "../../configs/MyContext";
import LottieView from "lottie-react-native";

const CreateProduct = ({ navigation }) => {
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    image: { uri: null },
    category_id: 1,
  });
  const [cates, setCates] = useState([]);
  const [listCates, setListCates] = useState([]);
  const [shop, setShop] = useContext(ShopContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        setListCates([]);
        let categories = await API.get(endpoints["categories"]);
        categories.data.results.map((item) => {
          setListCates((prev) => [...prev, { key: item.id, value: item.name }]);
        });
        setCates(categories.data.results);
      } catch (ex) {
        console.log(ex);
      }
    };
    getCategories();
  }, []);
  const changeInput = (field, value) => {
    setData((current) => {
      return { ...current, [field]: value };
    });
  };

  const pickImage = async () => {
    let results = await launchImageLibraryAsync();
    if (!results.canceled) {
      changeInput("image", results.assets[0]);
    }
    console.log(data.image.uri);
  };

  const commitCreate = async () => {
    setLoading(true);
    const form = new FormData();

    for (let key in data) {
      if (key == "image") {
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
      let res = await authApi(token).post(
        endpoints["add-product-to-shop"](shop.id),
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
      navigation.navigate("CreateSuccessful");
    } catch (ex) {
      console.log(ex);
    }
    setLoading(false);
  };
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == "android" ? 26 : 0,
        flex: 1,
        backgroundColor: COLORS.shopThemme,
      }}
    >
      <View style={Styles.headerView}>
        <TouchableOpacity
          style={{ width: 40 }}
          activeOpacity={0.7}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: "600" }}>Tạo sản phẩm</Text>
        <View style={{ width: 40 }}></View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        <View
          style={{
            height: 350,
            backgroundColor: "#fff",
            margin: 15,
            borderRadius: 10,
            elevation: 10,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Image
            source={{ uri: data.image.uri }}
            style={{ height: "80%", flex: 1, width: 200 }}
          />
          <TouchableOpacity
            style={{
              height: 50,
              width: 90,
              backgroundColor: COLORS.shopActive,
              margin: 15,
              elevation: 10,
              borderRadius: 3,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              pickImage();
            }}
          >
            <Text style={{ fontSize: 17, fontWeight: "600", color: "#fff" }}>
              Chọn
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            height: 100,
          }}
        >
          <View style={{ height: "100%", width: "35%" }}>
            <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 10 }}>
              Tên sản phẩm:{" "}
            </Text>
          </View>
          <TextInput
            onChangeText={(t) => changeInput("name", t)}
            value={data.name}
            multiline
            style={{
              flex: 1,
              backgroundColor: "#ccc",
              marginHorizontal: 10,
              borderRadius: 5,
              height: 80,
              textAlignVertical: "top",
              paddingVertical: 10,
              paddingHorizontal: 5,
              fontSize: 16,
            }}
            placeholder="Tên sản phẩm..."
            placeholderTextColor="gray"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            height: 100,
            marginTop: 15,
          }}
        >
          <View style={{ height: "100%", width: "35%" }}>
            <Text style={{ fontSize: 16, fontWeight: "500", marginTop: 10 }}>
              Mô tả sản phẩm:{" "}
            </Text>
          </View>
          <TextInput
            onChangeText={(t) => changeInput("description", t)}
            value={data.description}
            multiline
            style={{
              flex: 1,
              backgroundColor: "#ccc",
              marginHorizontal: 10,
              borderRadius: 5,
              height: 80,
              textAlignVertical: "top",
              paddingVertical: 10,
              paddingHorizontal: 5,
              fontSize: 16,
            }}
            placeholder="Mô tả sản phẩm..."
            placeholderTextColor="gray"
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            height: 60,
            marginTop: 15,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>Giá bán:</Text>
          <TextInput
            value={data.price}
            style={{
              marginHorizontal: 10,
              borderRadius: 5,
              backgroundColor: "#ccc",
              width: 130,
              height: 40,
              paddingHorizontal: 10,
              fontSize: 15,
            }}
            keyboardType="numeric"
            placeholder="Nhập giá bán..."
            onChangeText={(t) => {
              changeInput("price", t);
            }}
            placeholderTextColor="gray"
          />
          <Text style={{ fontSize: 16, fontWeight: "600" }}>đ</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
            height: 60,
            marginTop: 15,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "500" }}>
            Loại sản phẩm:{" "}
          </Text>
          <SelectList
            setSelected={(val) => changeInput("category_id", val)}
            data={listCates}
            save="key"
            onSelect={() => {
              console.log(data.category_id);
            }}
            search={false}
            placeholder="Chọn sản phẩm"
            dropdownTextStyles={{
              fontSize: 16,
            }}
            dropdownStyles={{ height: 100 }}
          />
        </View>
        <View
          style={{
            height: 150,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: COLORS.shopActive,
              borderRadius: 5,
              elevation: 10,
              height: 45,
              width: 120,
              marginHorizontal: 20,
            }}
            onPress={() => {
              commitCreate();
            }}
          >
            {loading ? (
              <LottieView
                style={{ height: 150, width: 150 }}
                source={require("../static/loading.json")}
                autoPlay
                loop
              />
            ) : (
              <Text style={{ fontSize: 16, fontWeight: "600", color: "white" }}>
                Thêm
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateProduct;

const Styles = StyleSheet.create({
  headerView: {
    height: 64,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
});
