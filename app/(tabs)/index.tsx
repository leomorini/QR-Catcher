import { useState, useRef, useEffect } from "react";
import { View } from "react-native";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { CameraView, CameraType } from "expo-camera/next";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as ImagePicker from "expo-image-picker";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";

import { ButtonThemed } from "@/components/Themed";
import { getThemeColors } from "@/styles";
import { validURL, barcodeTypes } from "@/services/helper";
import { LinkInterface } from "@/services/interfaces";
import { useStorageStore } from "@/services/storage";

/** Standard structure of decoded code to start/clear when necessary */
const defaultLink: LinkInterface = {
  isURL: false,
  text: "",
  created_at: Date.now(),
};

export default function CodeScanner() {
  const colorsTheme = getThemeColors();
  const scannerRef = useRef<any>(null);
  const [link, setLink] = useState(defaultLink);
  const [facing, setFacing] = useState<CameraType>("back");
  const { historyIncrement } = useStorageStore();

  /** Saves the decoded text of a QRCode or Bar Code in the state */
  function setLinkToDecode(text: string) {
    const isURL: boolean = validURL(text);
    const link: LinkInterface = { isURL, text, created_at: Date.now() };
    historyIncrement(link);
    setLink(link);
  }

  /**
   * Executes every time the camera detects a QRCode or Barcode
   * It only runs when there is no code already decoded (optimization)
   */
  const onBarcodeScanned = ({ data }: any) => {
    if (link.text == "" && !!data) {
      setLinkToDecode(data);
    }
  };

  /** 
  * Determines what action you will take when clicking the Dialog button
      - If it is a link: It will load the link by opening the browser
      - If it is text: It will copy the text with the clipboard 
  */
  async function handleLink() {
    if (link.isURL) {
      Linking.openURL(link.text);
    } else {
      await Clipboard.setStringAsync(link.text);
    }
  }

  /** Upload a local image and check if it has a QRCode / Barcode in it, if so it will decode it */
  const handleUploadImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    // if success upload image by ImagePicker
    if (
      !result.canceled &&
      Array.isArray(result.assets) &&
      result.assets[0] &&
      result.assets[0].uri
    ) {
      /**
       * if success detect and decode barcode/qrcode in image
       * @TODO this library stopped working after expo 50!
       *  */
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

  /** Switches between the front and back camera */
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
        className="flex flex-1 h-full w-full"
        barcodeScannerSettings={{ barcodeTypes }}
        onBarcodeScanned={onBarcodeScanned}
        facing={facing}
      ></CameraView>
      <View className="absolute right-0 left-0 bottom-0 bg-transparent">
        <View className="h-16 my-4 rounded-3xl flex-row items-center justify-between">
          <ButtonThemed
            onPress={handleUploadImage}
            color="tintColorLight"
            className="mx-4 h-14 w-14 rounded-xl items-center justify-center bg-slate-600"
          >
            <Entypo name="image" size={24} color={colorsTheme.tabIconDefault} />
          </ButtonThemed>
          <ButtonThemed
            color="tintColorLight"
            onPress={handleFacing}
            className="mx-4 h-14 w-14 rounded-xl items-center justify-center"
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
