import { useState, useRef, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { CameraView, BarcodeType, CameraType } from "expo-camera/next";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as ImagePicker from "expo-image-picker";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";

import { ButtonThemed } from "@/components/Themed";
import { getThemeColors } from "@/styles";

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
  const colorsTheme = getThemeColors();
  const scannerRef = useRef<any>(null);
  const [link, setLink] = useState(defaultLink);
  const [facing, setFacing] = useState<CameraType>("front");

  const onBarcodeScanned = ({ data }: any) => {
    if (link.text == "" && !!data) {
      setLinkToDecode(data);
    }
  };

  function setLinkToDecode(text: string) {
    const isURL: boolean = validURL(text);
    setLink({ isURL, text });
  }

  async function handleLink() {
    if (link.isURL) {
      Linking.openURL(link.text);
    } else {
      await Clipboard.setStringAsync(link.text);
    }
  }

  const handleUploadImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (
      !result.canceled &&
      Array.isArray(result.assets) &&
      result.assets[0] &&
      result.assets[0].uri
    ) {
      const scanned = await BarCodeScanner.scanFromURLAsync(
        result.assets[0].uri
      );
      if (scanned && Array.isArray(scanned) && scanned[0] && scanned[0].data) {
        setLinkToDecode(scanned[0].data);
        return;
      }
    }

    Toast.show({
      type: ALERT_TYPE.DANGER,
      title: "Não foi dessa vez!",
      textBody:
        "\nNão detectamos um QRCode ou Barra de código na sua imagem. \n\nPor favor tente novamente com outra imagem!",
      autoClose: 2000,
    });
  };

  function handleFacing() {
    setFacing(facing === "front" ? "back" : "front");
  }

  /** Show Dialog link/text decoded from QRCode or Code Bar */
  useEffect(() => {
    if (!!link.text) {
      Dialog.show({
        type: ALERT_TYPE.SUCCESS,
        title: "",
        textBody: `${link.text}`,
        button: link.isURL ? "Acessar link" : "Copiar texto",
        onPressButton: () => {
          handleLink();
        },
        onHide: () => {
          setLink(defaultLink);
        },
      });
    }
  }, [link]);

  return (
    <>
      <CameraView
        ref={scannerRef}
        style={styles.camera}
        barcodeScannerSettings={{ barcodeTypes }}
        onBarcodeScanned={onBarcodeScanned}
        facing={facing}
      ></CameraView>
      <View style={styles.absolute}>
        <View style={styles.bottom}>
          <ButtonThemed
            onPress={handleUploadImage}
            color="tintColorLight"
            style={styles.button}
          >
            <Entypo name="image" size={24} color={colorsTheme.tabIconDefault} />
          </ButtonThemed>
          <ButtonThemed
            color="tintColorLight"
            onPress={handleFacing}
            style={styles.button}
          >
            <Ionicons
              name="camera-reverse-outline"
              size={30}
              color={colorsTheme.tabIconDefault}
            />
          </ButtonThemed>
        </View>
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
    backgroundColor: "transparent",
  },
  bottom: {
    height: 70,
    marginVertical: 15,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    marginHorizontal: 15,
    height: 50,
    width: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
