import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../configs/Constant";
import Input from "../Input";

const InfoShop = ({
  name,
  address,
  prevHandle,
  nextHandle,
  onNameChange,
  onAddressChange,
  error
}) => {
  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={Styles.headerView}>
          <Text style={Styles.textHeader}>
            Vui lòng nhập địa chỉ và tên shop của bạn
          </Text>
        </View>
        <View style={Styles.contentView}>
          <Input
            value={name}
            label="Tên Shop"
            holderText="Tên Shop"
            onChangeHandle={onNameChange}
            error={error.name}
            isLogin
          />
          <Input
            value={address}
            label="Địa chỉ Shop"
            holderText="Địa chỉ"
            onChangeHandle={onAddressChange}
            error={error.address}
            isLogin
          />
        </View>
      </View>
      <View style={Styles.footerNavigation}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={Styles.prevButton}
          onPress={prevHandle}
        >
          <Text style={Styles.textStyle}>Trở lại</Text>
        </TouchableOpacity>
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

export default InfoShop;

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
    backgroundColor: "gray",
    elevation: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  textStyle: {
    fontSize: 19,
    fontWeight: "500",
    color: "white",
  },
});
