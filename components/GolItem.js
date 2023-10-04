import { useState, useContext } from "react";
import { StyleSheet, Text, Pressable, View, Modal, Button } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import GoalImput from "./GoalImput";

import { Infos } from "../contexts/context";
import { set } from "react-native-reanimated";

export default function GoalItem(props) {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);

  const { setEditando } = useContext(Infos);

  const { setBtn } = useContext(Infos);

  function edit() {
    try {
      setBtn("Alterar");
      setEditando({
        nome: props.item.nome,
        email: props.item.email,
        id: props.item.id,
      });
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.gol}>
      <Modal animationType="fade" transparent={true} visible={modal}>
        <View style={styles.modal}>
          <View style={styles.modalcont}>
            <Text style={{ color: "white" }}>
              Tem certeza que deseja deletar
            </Text>
            <View style={styles.button}>
              <Button
                title="Não"
                onPress={() => {
                  setModal(false);
                }}
              />
              <Button
                title="Sim"
                onPress={props.onDelet.bind(this, props.item.id)}
              />
            </View>
          </View>
        </View>
      </Modal>

      <MaterialIcons
        onPress={() => setModal(true)}
        name="delete"
        size={44}
        color="black"
      />
      <MaterialIcons onPress={edit} name="edit" size={44} color="black" />

      <Pressable
        android_ripple={{ color: "#4c0101" }}
        style={styles.item}
        onPress={() => navigation.navigate("Revisões", props.item)}
      >
        <Text>Nome: {props.item.nome}</Text>
        <Text>Email: {props.item.email}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  gol: {
    flexDirection: "row",
    marginBottom: 5,
    borderRadius: 10,
    backgroundColor: "#d34a4a",
    borderStyle: "dotted",
    borderWidth: 3,
  },
  item: {
    maxWidth: 215,
    paddingRight: 5,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  modalcont: {
    bottom: 150,
    backgroundColor: "#590303",
    padding: 10,
    borderRadius: 20,
  },
  button: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: 200,
    alignSelf: "center",
  },
});
