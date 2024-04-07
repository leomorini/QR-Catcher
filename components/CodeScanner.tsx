import { CameraView, BarcodeType } from "expo-camera/next";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import CodeModal from "@/components/CodeModal";
import { Button, Text } from "@/components/Themed";

function validURL(str: string) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

const barcodeTypes: BarcodeType[] = [
  "qr",
  "aztec",
  "ean13",
  "ean8",
  "pdf417",
  "upc_e",
  "datamatrix",
  "code39",
  "code93",
  "itf14",
  "codabar",
  "code128",
  "upc_a",
];

const defaultLink = { isURL: false, text: "" };

export default function CodeScanner() {
  const [link, setLink] = useState(defaultLink);

  const onBarcodeScanned = ({ data }: any) => {
    if (link.text == "" && !!data) {
      console.log('scanning');
      const isURL: boolean = validURL(data);
      setLink({ isURL, text: data });
    }
  };

  function handleCloseLink() {
    setLink(defaultLink);
  }

  return (
    <>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{ barcodeTypes }}
        onBarcodeScanned={onBarcodeScanned}
      >
      </CameraView>
      <View style={styles.absolute}>
        <CodeModal link={link} callbackClose={handleCloseLink} />
        <Button style={styles.historyButton}>
          <Text style={styles.historyButtonText}>Histórico</Text>
        </Button>
      </View>

    </>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  absolute: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
  }, 
  historyButton: {
    height: 50,
    borderTopLeftRadius: 300,
    borderTopRightRadius: 300,
  },
  historyButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  }
});
