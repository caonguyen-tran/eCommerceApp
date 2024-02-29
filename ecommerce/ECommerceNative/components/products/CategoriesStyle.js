import { StyleSheet } from "react-native";
import { COLORS } from "../../configs/Constant";

const CategoriesStyle = StyleSheet.create({
    headerStyle: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: 58
    },
    textHeader: {
        fontSize: 24,
        fontWeight: "600"
    },
    scrollView:{
        width: "100%",
        flex: 1
    },
    categoriesView: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 20,
        paddingBottom: 56,
        paddingTop: 40
    },
    categoriesItem: {
        width: "40%",
        height: 200,
        backgroundColor: COLORS.itemColor,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 14,
        elevation: 20
    }
})

export default CategoriesStyle