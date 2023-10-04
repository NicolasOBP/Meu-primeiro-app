import React, { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Infos = createContext({});

export default function InfosProvider({ children }) {
  const [user, setUser] = useState([]);
  const [editando, setEditando] = useState(false);
  const [btn, setBtn] = useState("Enviar");

  async function getGol() {
    const golBanco = await AsyncStorage.getItem("gol");
    if (golBanco) {
      const golJSON = JSON.parse(golBanco);
      setUser(golJSON);
    }
  }

  return (
    <Infos.Provider
      value={{ user, setUser, getGol, editando, setEditando, btn, setBtn }}
    >
      {children}
    </Infos.Provider>
  );
}
