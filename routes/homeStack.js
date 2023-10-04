import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Home from "../screens/home";
import Review from "../screens/review";

const Stack = createNativeStackNavigator();

export default function Nav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeScreen"
        component={Home}
      />
      <Stack.Screen name="Revisões" component={Review} />
    </Stack.Navigator>
  );
}
