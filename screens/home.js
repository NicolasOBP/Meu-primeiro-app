import "react-native-gesture-handler";
import React, { useCallback, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import GoalItem from "../components/GolItem";
import GoalImput from "../components/GoalImput";

import { Infos } from "../contexts/context";

import { useFocusEffect } from "@react-navigation/native";

export default function Home({ navigation }) {
  const { user } = useContext(Infos);
  const { getGol } = useContext(Infos);

  useFocusEffect(
    useCallback(() => {
      navigation.getParent("draw").setOptions({ headerShown: true });
      getGol();
    }, [])
  );

  async function delet(id) {
    try {
      const goalsFilter = user.filter((goal) => goal.id != id);

      await AsyncStorage.setItem("gol", JSON.stringify(goalsFilter));

      await getGol();
    } catch (e) {
      console.log(e);
    }
  }

  function dimiss() {
    Keyboard.dismiss();
  }

  return (
    <TouchableWithoutFeedback onPress={dimiss}>
      <View style={styles.conteiner}>
        <View style={styles.header}>
          <Text style={styles.title}>Tela inicial</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.titleform}>Formulário</Text>

          <GoalImput nome={""} email={""} />
        </View>
        <View style={styles.lista}>
          <FlatList
            data={user}
            renderItem={(itemData) => {
              return <GoalItem item={itemData.item} onDelet={delet} />;
            }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
          />
        </View>
        <View style={styles.imgcontainer}>
          <Image style={styles.Image} source={require("../assets/icon.png")} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "#59066a",
    paddingVertical: 10,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontFamily: "font2",
    fontSize: 30,
  },
  butao: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    right: 40,
  },
  form: {
    alignItems: "center",
  },
  titleform: {
    color: "white",
    fontFamily: "font1",
    fontSize: 30,
    padding: 10,
  },
  lista: {
    flex: 1,
    maxWidth: "80%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  Image: {
    alignSelf: "flex-end",
    width: 400,
    height: 100,
  },
  imgcontainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    top: 10,
  },
});
