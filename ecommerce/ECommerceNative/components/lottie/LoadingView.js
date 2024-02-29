import LottieView from "lottie-react-native"
import { View } from "react-native"
import { COLORS } from "../../configs/Constant"


const LoadingView = () => {
    return (
        <View style={{height: 200, width: "100%", justifyContent: "center", alignItems: "center"}}>
            <LottieView style={{height: 150, width: 150}} source={require('../static/loading.json')} autoPlay loop/>
        </View>
    )
}

export default LoadingView