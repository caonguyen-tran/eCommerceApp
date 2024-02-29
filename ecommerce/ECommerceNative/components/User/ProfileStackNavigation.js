import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./Profile";
import EditProfile from "./EditProfile";
import OrderHistory from "../Order/OrderHistory";
import OrderDetail from "../Order/OrderDetail";
import ShopIntro from "../shop/ShopIntro";
import RegisterShop from "../shop/RegisterShop";
import WaitingConfirm from "../shop/WaitingConfirm";
import ShopStack from "../shop/ShopStack";
import { useEffect, useState } from "react";
import { ShopContext } from "../../configs/MyContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authApi, endpoints } from "../../configs/API";

const Stack = createNativeStackNavigator();
const ProfileStackNavigation = () => {
  const [shop, setShop] = useState([]);
  useEffect(() => {
    const getShop = async () => {
      try {
        let token = await AsyncStorage.getItem("access-token");
        let shop = await authApi(token).get(endpoints["current-shop"]);
        setShop(shop.data);
        console.log(shop.data);
      } catch (ex) {
        console.log(ex);
      }
    };
    getShop();
  }, []);
  return (
    <ShopContext.Provider value={[shop, setShop]}>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={Profile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ShopIntro"
            component={ShopIntro}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterShop"
            component={RegisterShop}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WaitingConfirm"
            component={WaitingConfirm}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ShopStack"
            component={ShopStack}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="History"
            component={OrderHistory}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrderDetail"
            component={OrderDetail}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ShopContext.Provider>
  );
};

export default ProfileStackNavigation;
