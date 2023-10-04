//npx eas build -p android --profile apk
import "react-native-gesture-handler";
import React from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";

import MyDrawer from "./routes/drawer";

import InfosProvider from "./contexts/context";

export default function App() {
  const [loaded] = useFonts({
    font1: require("./assets/fonts/CoffeCake.ttf"),
    font2: require("./assets/fonts/SlowlySatireFont-Regular.ttf"),
  });
  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <InfosProvider>
        <MyDrawer />
      </InfosProvider>
    </NavigationContainer>
  );
}
