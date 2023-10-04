import React, { useCallback } from "react";
import { StyleSheet, Text, View, Linking, Button } from "react-native";

export default function AboutScreen() {
  const supportedURL = "https://google.com";
  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      // Checking if the link is supported for links with custom URL scheme.
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        // Opening the link with some app, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <Text style={{ color: "blue" }} onPress={handlePress}>
        Clique aq
      </Text>
    );
  };
  return (
    <View style={styles.conteiner}>
      <View style={styles.titleconteiner}>
        <Text style={styles.title}>Sobre nós</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <View style={styles.textonteiner}>
          <Text style={styles.text}>
            Salve, esse é o app de teste que estou fazendo para testar minhas
            habilidades.
          </Text>
          <Text style={styles.text}>
            Para mais informações, busque informações em:{" "}
            <OpenURLButton url={supportedURL}></OpenURLButton>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "#59066a",
  },
  title: {
    color: "white",
    fontFamily: "font2",
    fontSize: 40,
    backgroundColor: "black",
    borderRadius: 20,
    padding: 10,
  },
  titleconteiner: {
    paddingTop: 5,
    alignItems: "center",
  },
  textonteiner: {
    alignSelf: "center",
    paddingHorizontal: 10,
    backgroundColor: "#c18edc",
    width: "90%",
    borderRadius: 5,
    borderWidth: 2,
    letterSpacing: 1.5,
  },
  text: {
    padding: 5,
    letterSpacing: 1.5,
    lineHeight: 20,
    textAlign: "justify",
    fontSize: 20,
    fontWeight: "bold",
  },
});
