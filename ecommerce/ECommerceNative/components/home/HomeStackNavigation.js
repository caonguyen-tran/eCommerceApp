import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Home";
import ProductDetail from "../products/ProductDetail";
import Cart from "../Order/Cart";
import { useEffect, useState } from "react";
import { authApi, endpoints } from "../../configs/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartContext } from "../../configs/MyContext";
import Checkout from "../Order/Checkout";
import SuccessfulCheckout from "../Order/SuccessfulCheckout";

const Stack = createNativeStackNavigator();
const HomeStackNavigation = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getProductInCart = async () => {
      let token = await AsyncStorage.getItem("access-token");
      let loadProducts = await authApi(token).get(endpoints["cart"]);
      setCart(loadProducts.data);
      console.log(loadProducts.data)
    };
    getProductInCart();
  }, []);
  return (
    <CartContext.Provider value={[cart, setCart]}>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Checkout"
            component={Checkout}
            options={{headerShown: false}}
          />
          <Stack.Screen 
            name="CheckoutSuccess"
            component={SuccessfulCheckout}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartContext.Provider>
  );
};

export default HomeStackNavigation;
