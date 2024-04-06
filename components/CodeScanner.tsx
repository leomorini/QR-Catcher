import { CameraView, BarcodeType } from "expo-camera/next";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import CodeModal from "@/components/CodeModal";

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
      <CodeModal link={link} callbackClose={handleCloseLink} />
    </>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  camera: {
    flex: 1,
  },
  center: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  vision: {
    height: 250,
    width: 250,
    borderWidth: 4,
    borderColor: "cyan",
    borderRadius: 8,
    borderStyle: "dashed",
  },
  bottom: {
    justifyContent: "flex-end",
  },
  bar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    marginBottom: 50,
  },
});
