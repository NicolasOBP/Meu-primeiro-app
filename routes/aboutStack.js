import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AboutScreen from "../screens/about";

const Stack = createNativeStackNavigator();

export default function About() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AboutScreen" component={AboutScreen} />
    </Stack.Navigator>
  );
}
