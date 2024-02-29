import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CategoryItem from "./CategoryItem";
import { COLORS } from "../../configs/Constant";

const ShopCategory = ({nextHandle }) => {
  const categories_list = [
    {id: 1, name: "Quần áo", icon: "shirt", color: "" },
    {id: 2, name: "Thể thao", icon: "basketball", color: "" },
    {id: 3, name: "Thiết bị điện tử", icon: "laptop", color: "" },
    {id: 4, name: "Đồ chơi", icon: "horse", color: "" },
  ];
  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={Styles.headerView}>
          <Text style={Styles.textHeader}>Chọn loại hàng mà bạn muốn bán</Text>
        </View>
        <View style={Styles.contentView}>
          {categories_list.map((item) => (
            <CategoryItem key={item.id} name={item.name} icon={item.icon} />
          ))}
        </View>
      </View>
      <View style={Styles.footerNavigation}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={Styles.nextButton}
          onPress={nextHandle}
        >
          <Text style={Styles.textStyle}>Tiếp</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ShopCategory;

const Styles = StyleSheet.create({
  headerView: {
    justifyContent: "centwer",
    alignItems: "flex-start",
    paddingHorizontal: 15,
  },
  textHeader: {
    fontSize: 36,
    fontWeight: "700",
  },
  contentView: {
    paddingVertical: 25,
    paddingHorizontal: 15,
    flexWrap: "wrap",
    gap: 10,
    flexDirection: "row",
  },
  footerNavigation: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
  },
  nextButton: {
    height: 55,
    width: 100,
    backgroundColor: COLORS.shopActive,
    elevation: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  prevButton: {
    height: 55,
    width: 100,
    backgroundColor: "#ccc",
    elevation: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 19,
    fontWeight: "500",
    color: "white",
  },
});
