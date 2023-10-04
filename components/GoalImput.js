import { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Keyboard,
  Modal,
  Text,
} from "react-native";

import { Infos } from "../contexts/context";

function GoalImput(props) {
  const [enterNome, setNome] = useState(props.nome);
  const [enterEmail, setEmail] = useState(props.email);

  const { setUser } = useContext(Infos);
  const { user } = useContext(Infos);

  const { editando } = useContext(Infos);
  const { setEditando } = useContext(Infos);

  const { btn } = useContext(Infos);
  const { setBtn } = useContext(Infos);

  const { getGol } = useContext(Infos);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    setEmail(editando.email);
    setNome(editando.nome);
  }, [editando]);

  function prencheNome(val) {
    setNome(val);
  }
  function prencheEmail(val) {
    setEmail(val);
  }

  function add() {
    if (enterNome.trim() == "" || enterEmail.trim() == "") {
      setModal(true);
    } else {
      if (editando == false) {
        setUser(async () => {
          const novoUser = [
            {
              nome: enterNome,
              email: enterEmail,
              id: Math.random().toString(),
            },
            ...user,
          ];

          await AsyncStorage.setItem("gol", JSON.stringify(novoUser));

          getGol();
        });
      } else {
        setUser(async () => {
          const index = user.findIndex((v) => v.id == editando?.id);

          user[index] = { nome: enterNome, email: enterEmail, id: editando.id };

          //salva ele no banco se quiser
          await AsyncStorage.setItem("gol", JSON.stringify(user));

          setEditando(false);
          setBtn("Enviar");

          return [...user];
        });
        getGol();
      }

      setNome("");
      setEmail("");

      Keyboard.dismiss();
    }
  }

  function cancel() {
    Keyboard.dismiss();
    setBtn("Enviar");
    setEditando(false, {
      nome: "",
      email: "",
      id: null,
    });
  }

  return (
    <View style={styles.container}>
      <Modal transparent={true} visible={modal} animationType="fade">
        <View style={styles.modal}>
          <View style={styles.modalcont}>
            <Text style={{ color: "white" }}>Prencha todos os espaços</Text>
            <Button
              title="Close"
              onPress={() => {
                setModal(false);
              }}
            />
          </View>
        </View>
      </Modal>

      <TextInput
        keyboardType="web-search"
        style={styles.form}
        placeholder="Nome"
        onChangeText={prencheNome}
        value={enterNome}
      />

      <TextInput
        keyboardType="email-address"
        style={styles.form}
        placeholder="Email"
        onChangeText={prencheEmail}
        value={enterEmail}
      />

      {editando ? (
        <View style={styles.botao}>
          <Button title={btn} onPress={add} />
          <Button title="Cancelar" onPress={cancel} />
        </View>
      ) : (
        <View style={styles.botao}>
          <Button title={btn} onPress={add} />
        </View>
      )}
    </View>
  );
}
export default GoalImput;

const styles = StyleSheet.create({
  form: {
    backgroundColor: "lightblue",
    maxWidth: "80%",
    alignSelf: "center",
    color: "purple",
    borderRadius: 30,
    marginBottom: 10,
    color: "black",
    fontSize: 20,
    paddingHorizontal: 20,
  },
  container: {
    alignItems: "center",
  },
  botao: {
    flexDirection: "row",
    width: 200,
    paddingBottom: 10,
    justifyContent: "space-evenly",
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
});
