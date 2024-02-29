import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { COLORS } from "../../configs/Constant";
import CategoriesStyle from "./CategoriesStyle";
import { useState, useEffect, useContext } from "react";
import LoadingView from "../lottie/LoadingView";
import API, { endpoints } from "../../configs/API";
import { CategoriesContext } from "../../configs/MyContext";

const Categories = () => {
  const cates = useContext(CategoriesContext);
  const [loading, setLoading] = useState(false);
  return (
    <SafeAreaView
      style={{
        paddingTop: Platform.OS == "android" ? 26 : 0,
        flex: 1,
        backgroundColor: COLORS.primary,
      }}
    >
      <View style={CategoriesStyle.headerStyle}>
        <Text style={CategoriesStyle.textHeader}>Danh mục</Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={CategoriesStyle.scrollView}
      >
        <View style={CategoriesStyle.categoriesView}>
          {cates.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={CategoriesStyle.categoriesItem}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: item.image }}
                style={{
                  height: 140,
                  width: 140,
                  borderRadius: 10,
                  marginTop: 6,
                }}
              />
              <Text
                style={{
                  paddingVertical: 10,
                  fontSize: 20,
                  fontWeight: "600",
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Categories;
