import LottieView from "lottie-react-native";
import { Image, View } from "react-native";

const Empty = () => {
  return (
    <Image
      source={{
        uri: "https://res.cloudinary.com/dndakokcz/image/upload/v1708886119/cartCheck_krp1oc.png",
      }}
      style={{ height: 400, width: 400 }}
    />
  );
};

export default Empty;
