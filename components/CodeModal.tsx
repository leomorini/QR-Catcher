import React, { useState, useEffect } from "react";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { View, Button, Text } from "@/components/Themed";
import Modal from "react-native-modal";

export default function CodeModal({ link, callbackClose }: any) {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!!link.text) {
      setShowModal(true);
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
    setShowModal(false);
    callbackClose();
  }

  return (
    <Modal isVisible={showModal}>
      <View>
        {link.isURL ? (
          <Text>Encontramos este link:</Text>
        ) : (
          <Text>Encontramos este texto:</Text>
        )}
        <Text>{link.text}</Text>
        <Button onPress={() => handleClose()}>
          <Text>Fechar</Text>
        </Button>
        <Button onPress={() => handleLink()}>
          <Text>{link.isURL ? "Acessar link" : "Copiar texto"}</Text>
        </Button>
      </View>
    </Modal>
  );
}
