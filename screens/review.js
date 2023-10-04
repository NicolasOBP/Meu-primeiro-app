import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Review({ route, navigation }) {
  const item = route.params;

  navigation.getParent("draw").setOptions({ headerShown: false });

  return (
    <View style={styles.conteiner}>
      <Text style={styles.title}>Tela de Revisões</Text>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.box}>
          <Text style={styles.text}>Nome: {item.nome}</Text>
          <Text style={styles.text}>Email: {item.email}</Text>
          <Text style={styles.text}>Id: {item.id}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "#d64c4c",
    padding: 30,
    alignItems: "center",
  },
  title: {
    color: "white",
    fontFamily: "font2",
    fontSize: 45,
  },
  box: {
    backgroundColor: "rgba(157, 27, 238, 0.5)",
    padding: 10,
    borderRadius: 10,
    borderWidth: 4,
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    paddingVertical: 5,
  },
});
