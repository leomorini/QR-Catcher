import { CameraView, BarcodeType, CameraType } from "expo-camera/next";
import * as ImagePicker from 'expo-image-picker';
import { BarCodeScanner } from "expo-barcode-scanner";
import { useEffect, useState, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Entypo, Ionicons  } from '@expo/vector-icons';
import { ViewThemed, ButtonThemed, TextThemed } from "@/components/Themed";
import CodeModal from "@/components/CodeModal";
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
  const [facing, setFacing] = useState<CameraType>('front');

  const onBarcodeScanned = ({ data }: any) => {
    if (link.text == "" && !!data) {
      const isURL: boolean = validURL(data);
      setLink({ isURL, text: data });
    }
  };

  function handleCloseLink() {
    setLink(defaultLink);
  }

  function handleFacing() {
    setFacing(facing === 'front' ? 'back' : 'front');
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      const scannedResults = await BarCodeScanner.scanFromURLAsync(uri);
      console.log('scannedResults', scannedResults);
      const dataNeeded = scannedResults[0].data;
      console.log('data ->', dataNeeded, uri);
    }
  };

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
        <CodeModal link={link} callbackClose={handleCloseLink} />
        <View style={styles.bottom}>
          <ButtonThemed onPress={pickImage} color="tintColorLight" style={styles.button}>
            <Entypo name="image" size={24} color={colorsTheme.tabIconDefault} />
          </ButtonThemed>
          <ButtonThemed color="tintColorLight" onPress={handleFacing} style={styles.button}>
            <Ionicons name="camera-reverse-outline" size={30} color={colorsTheme.tabIconDefault} />
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
    justifyContent: "space-between"
  },
  button: {
    marginHorizontal: 15,
    height: 50,
    width: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  }
});
