import { StyleSheet } from "react-native";
import { COLORS } from "../../configs/Constant";


const UserStyle = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingLeft: 30,
        paddingRight: 30,
        flex: 1,
        alignItems: "flex-start",
        backgroundColor: "#F6F6F6",
        width: "100%"
    },
    headerText: {
        fontSize: 30,
        fontWeight: "700"
    },
    inputContainer: {
        padding: 10,
        width: "100%",
        marginTop: 15
    },
    inputChild: {
        marginVertical: 5
    },
    inputView: {
        paddingVertical: 10,
        paddingHorizontal: 30, 
        backgroundColor: "#EBF0EC",
        fontSize: 16,
        borderRadius: 12,
        color: "#000",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderWidth: 1,
    },
    textInput: {
        fontSize: 18,
        width: "90%",
    },
    loginButton: {
        backgroundColor:COLORS.active,
        width: "100%",
        height: 50,
        borderRadius: 7,
        marginBottom: 24,
        alignItems: "center",
        marginTop: 24
    },
    imageStyle: {
        width: 60,
        height: 60,
        marginHorizontal: 16,
        borderRadius: 10
    }
})

export default UserStyle