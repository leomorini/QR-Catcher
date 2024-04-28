import { useState, useRef, useEffect } from "react";
import { View } from "react-native";
import { CameraView, CameraType } from "expo-camera/next";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as ImagePicker from "expo-image-picker";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";
import { useTranslation } from "react-i18next";

import { ButtonThemed, ViewThemed } from "@/components/Themed";
import { getThemeColors } from "@/styles";
import { validURL, barcodeTypes, handleLink } from "@/services/helper";
import { LinkInterface } from "@/services/interfaces";
import { useStorageStore } from "@/services/storage";
import ScreenContainer from "@/components/ScreenContainer";

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
  const { t } = useTranslation();

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

  /** Upload a local image and check if it has a QRCode / Barcode in it, if so it will decode it */
  const handleUploadImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    // if canceled
    if (result.canceled) {
      return false;
    }

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
      title: t("A problem has occurred!"),
      textBody:
        "\n" +
        t("We did not detect a QRCode or Barcode in your image.") +
        "\n\n" +
        t("Please try again with another image!"),
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
        button: link.isURL ? t("Access link") : t("Copy Text"),
        onPressButton: () => {
          handleLink(link);
        },
        onHide: () => {
          setLink(defaultLink);
        },
      });
    }
  }, [link]);

  return (
    <ScreenContainer className="relative" tabsPadding={true}>
      <ViewThemed brutalism={true} borderColor="highlightedColored" className="relative mx-4 mb-8 flex flex-1">
        <CameraView
          ref={scannerRef}
          style={{ flex: 1, overflow: "hidden" }}
          barcodeScannerSettings={{ barcodeTypes }}
          onBarcodeScanned={onBarcodeScanned}
          facing={facing}
        ></CameraView>
      </ViewThemed>

      <View className="">
        <ViewThemed className="mx-2 rounded-3xl flex-row items-center justify-between">
          <ButtonThemed
            onPress={handleUploadImage}
            className="flex h-14 w-28 rounded-full items-center justify-center"
          >
            <Entypo name="image" size={26} color={colorsTheme.text} />
          </ButtonThemed>
          <ButtonThemed
            onPress={handleFacing}
            className="flex h-14 w-28 rounded-full items-center justify-center"
          >
            <Ionicons
              name="camera-reverse-outline"
              size={30}
              color={colorsTheme.text}
            />
          </ButtonThemed>
        </ViewThemed>
      </View>
    </ScreenContainer>
  );
}
