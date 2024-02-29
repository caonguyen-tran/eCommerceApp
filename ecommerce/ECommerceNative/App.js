import { NavigationContainer } from '@react-navigation/native';
import React, { useReducer } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Intro from './components/User/Intro';
import Login from './components/User/Login';
import Register from './components/User/Register';
import MyContext, { UserContext } from './configs/MyContext';
import MyReducer from './reducers/MyReducer';
import Home from './components/home/Home';
import BottomNavagation from './navigate/BottomNavigation';
import BottomNavigation from './navigate/BottomNavigation';


const Stack = createNativeStackNavigator()

export default function App() {
  const [user, dispatch] = useReducer(MyReducer, null)
  return (
    <UserContext.Provider value={[user, dispatch]}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Intro"
            component={Intro}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BottomNavigation"
            component={BottomNavigation}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
