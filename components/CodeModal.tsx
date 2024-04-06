import React, { useState, useEffect, useRef } from "react";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { StyleSheet } from "react-native";
import { View, Button, Text } from "@/components/Themed";
import RBSheet from "react-native-raw-bottom-sheet";

export default function CodeModal({ link, callbackClose }: any) {
  const componentRef = useRef<any>(null);

  const setShowModal = () => {
    componentRef.current?.open();
  };

  const setHiddenModal = () => {
    componentRef.current?.close();
  };

  useEffect(() => {
    if (!!link.text) {
      setShowModal();
    }
  }, [link]);

  async function handleLink() {
    if (link.isURL) {
      Linking.openURL(link.text);
    } else {
      await Clipboard.setStringAsync(link.text);
    }
  }

  function handleClose() {
    setHiddenModal();
  }

  return (
    <RBSheet
      ref={componentRef}
      onClose={() => callbackClose()}
      useNativeDriver={false}
    >
      <View style={styles.container}>
        <View>
          {link.isURL ? (
            <Text>Encontramos este link:</Text>
          ) : (
            <Text>Encontramos este texto:</Text>
          )}
          <Text style={styles.link} numberOfLines={2} ellipsizeMode='tail'>{link.text}</Text>
        </View>

        <View style={styles.row}>
          <Button onPress={() => handleClose()}>
            <Text>Fechar</Text>
          </Button>
          <Button onPress={() => handleLink()}>
            <Text>{link.isURL ? "Acessar link" : "Copiar texto"}</Text>
          </Button>
        </View>

      </View>
    </RBSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    textDecorationLine: 'underline',
  }
});