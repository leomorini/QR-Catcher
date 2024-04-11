import { BarcodeType } from "expo-camera/next";

/**
 * Checks if a string is a valid link
 */
export function validURL(str: string) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!pattern.test(str);
}

/**
 * All types of codes that the reader decodes
 */
export const barcodeTypes: BarcodeType[] = [
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
