import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Shop from "./Shop";
import { ShopContext } from "../../configs/MyContext";
import { useContext, useEffect } from "react";
import CreateProduct from "./CreateProduct";
import CreateSuccessful from "./CreateSuccessful";

const Stack = createNativeStackNavigator();
const ShopStack = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="ShopMain"
          component={Shop}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CreateProduct"
          component={CreateProduct}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="CreateSuccessful" component={CreateSuccessful} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default ShopStack;
