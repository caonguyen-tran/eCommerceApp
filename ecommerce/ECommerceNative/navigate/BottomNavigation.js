import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../components/home/Home";
import Categories from "./../components/products/Categories";
import Cart from "./../components/Order/Cart";
import Profile from "./../components/User/Profile";
import { NavigationContainer } from "@react-navigation/native";
import {
  Feather,
  Entypo,
  FontAwesome5,
  Ionicons,
  AntDesign,
} from "@expo/vector-icons";
import { COLORS } from "../configs/Constant";
import { useContext, useEffect, useState } from "react";
import API, { endpoints } from "../configs/API";
import MyContext, { CategoriesContext, UserContext } from "../configs/MyContext";
import ProfileStackNavigation from "../components/User/ProfileStackNavigation";
import HomeStackNavigation from "../components/home/HomeStackNavigation";
import { Platform } from 'react-native';
const Tab = createBottomTabNavigator();

const BottomNavigation = ({navigation}) => {
  const [cates, setCates] = useState([]);
  useEffect(() => {
    const getCates = async () => {
      const loadCates = await API.get(endpoints["categories"]);
      setCates(loadCates.data.results);
    };
    getCates();
  }, []);
  return (
    <CategoriesContext.Provider value={cates}>
      <NavigationContainer independent={true}>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {height: Platform.OS == "android" ? 58 : 75},
          }}
        >
          <Tab.Screen
            name="HomeStack"
            component={HomeStackNavigation}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                return (
                  <AntDesign
                    name="home"
                    size={30}
                    color={focused ? COLORS.activeStrength : COLORS.active}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="Categories"
            component={Categories}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                return (
                  <Entypo
                    name="list"
                    size={30}
                    color={focused ? COLORS.activeStrength : COLORS.active}
                  />
                );
              },
            }}
          />
          <Tab.Screen
            name="ProfileStack"
            component={ProfileStackNavigation}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => {
                return (
                  <Ionicons
                    name="person-circle-outline"
                    size={30}
                    color={focused ? COLORS.activeStrength : COLORS.active}
                  />
                );
              },
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </CategoriesContext.Provider>
  );
};

export default BottomNavigation;
