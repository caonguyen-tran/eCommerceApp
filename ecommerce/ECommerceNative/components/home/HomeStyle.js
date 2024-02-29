import { StyleSheet } from "react-native"
import { COLORS } from "../../configs/Constant"


const HomeStyle = StyleSheet.create({
    container: {

    },
    viewSearch: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: 58,
        backgroundColor: COLORS.primary
    },
    textInputStyle: {
        height: "90%",
        flex: 1,
        paddingHorizontal: 12,
        fontSize: 18
    },
    content: {
        flex: 1,
        width: "100%"
    },
    viewSliderStyle: {
        width: "100%",
        height: 220,
        justifyContent: "center"
    },
    viewCategory: {
        width: "100%",
        height: 160,
        alignItems: "center"
    },
    textCategory: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "25%",
        paddingHorizontal: 22
    },
    categoryItemStyle: {
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100%",
        width: 100,
        borderRadius: 10,
        marginHorizontal: 5,
        backgroundColor: COLORS.itemColor,
        elevation: 10,
    },
    textProduct: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: 60,
        paddingHorizontal: 22
    },
    productView: {
        flexDirection: "row",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "center",
        columnGap: 15,
        rowGap: 15
    },
    productItem: {
        width: "45%",
        height: 320,
        backgroundColor: COLORS.itemColor,
        borderRadius: 10,
        justifyContent: "space-between",
        elevation: 15
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
        elevation: 10
    },
    rateView: {
        width: "100%",
        paddingHorizontal: 10,
        flexDirection: "row"
    }
})

export default HomeStyle