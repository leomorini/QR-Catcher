import { useState, useRef, useEffect, useContext } from "react";
import { View } from "react-native";
import { BarcodeScanningResult, Camera, CameraView } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { validURL, barcodeTypes, handleLink } from "@/services/helper";
import { LinkInterface } from "@/services/interfaces";
import { useHistoryStore } from "@/data/history";
import { AlertContext, AlertContextType } from "@/components/AlertNotification";
import { ScannerActions } from "@/components/scanner/ScannerActions";
import { useTranslation } from "react-i18next";
import { ScannerSquare } from "@/components/scanner/ScannerSquare";

/** Standard structure of decoded code to start/clear when necessary */
const defaultLink: LinkInterface = {
  isURL: false,
  text: "",
  created_at: Date.now(),
};

export default function CodeScanner() {
  const Alert = useContext(AlertContext) as AlertContextType;
  const { t } = useTranslation();
  const scannerRef = useRef<any>(null);
  const [link, setLink] = useState(defaultLink);
  const [facing, setFacing] = useState<any>("back");
  const HistoryStore = useHistoryStore();

  /** Saves the decoded text of a QRCode or Bar Code in the state */
  function setLinkToDecode(text: string) {
    const isURL: boolean = validURL(text);
    const link: LinkInterface = { isURL, text, created_at: Date.now() };
    HistoryStore.increment(link);
    setLink(link);
  }

  /**
   * Executes every time the camera detects a QRCode or Barcode
   * It only runs when there is no code already decoded (optimization)
   */
  const onBarcodeScanned = ({ data }: BarcodeScanningResult) => {
    if (link.text == "" && !!data) {
      setLinkToDecode(data);
    }
  };

  /** Upload a local image and check if it has a QRCode / Barcode in it, if so it will decode it */
  const handleUploadImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
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
      const scanned = await Camera.scanFromURLAsync(result.assets[0].uri);
      if (scanned && Array.isArray(scanned) && scanned[0] && scanned[0].data) {
        setLinkToDecode(scanned[0].data);
        return;
      }
    }

    Alert.show({
      title: t("SCANNER_ALERT_A problem has occurred!"),
      message:
        "\n" +
        t("SCANNER_ALERT_We did not detect a QRCode or Barcode in your image.") +
        "\n\n" +
        t("SCANNER_ALERT_Please try again with another image!"),
    });
  };

  /** Switches between the front and back camera */
  function handleFacing() {
    setFacing(facing === "front" ? "back" : "front");
  }

  /** Show Dialog link/text decoded from QRCode or Code Bar */
  useEffect(() => {
    if (!!link.text) {
      Alert.show({
        title: "",
        message: `${link.text}`,
        confirmText: link.isURL ? t("LINK_Access link") : t("LINK_Copy Text"),
        onConfirmPressed: () => {
          handleLink(link);
        },
        onClose: () => {
          // setTimeout create debounce timeout for scanning
          setTimeout(() => {
            setLink(defaultLink);
          }, 400);
        },
      });
    }
  }, [link]);

  return (
    <View style={{ position: "relative", flex: 1 }}>
      <CameraView
        ref={scannerRef}
        style={{ flex: 1, overflow: "hidden" }}
        barcodeScannerSettings={{ barcodeTypes }}
        onBarcodeScanned={onBarcodeScanned}
        facing={facing}
      ></CameraView>

      <ScannerSquare>
        <ScannerActions
          handleUploadImage={handleUploadImage}
          handleFacing={handleFacing}
        />
      </ScannerSquare>
    </View>
  );
}
