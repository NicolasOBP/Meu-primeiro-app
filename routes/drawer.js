import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Nav from "../routes/homeStack";
import About from "../routes/aboutStack";

const Drawer = createDrawerNavigator();

export default function MyDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "black" },
        headerTintColor: "white",
      }}
      id="draw"
    >
      <Drawer.Screen name="Home" component={Nav} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
}
