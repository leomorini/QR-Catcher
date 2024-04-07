import React, { useState, useEffect, useRef } from "react";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { StyleSheet, View } from "react-native";
import { ViewThemed, ButtonThemed, TextThemed } from "@/components/Themed";
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
      <ViewThemed style={styles.container}>
        <View>
          {link.isURL ? (
            <TextThemed>Encontramos este link:</TextThemed>
          ) : (
            <TextThemed>Encontramos este texto:</TextThemed>
          )}
          <TextThemed style={styles.link} numberOfLines={2} ellipsizeMode='tail'>{link.text}</TextThemed>
        </View>

        <View style={styles.row}>
          <ButtonThemed onPress={() => handleClose()}>
            <TextThemed>Fechar</TextThemed>
          </ButtonThemed>
          <ButtonThemed onPress={() => handleLink()}>
            <TextThemed>{link.isURL ? "Acessar link" : "Copiar texto"}</TextThemed>
          </ButtonThemed>
        </View>

      </ViewThemed>
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