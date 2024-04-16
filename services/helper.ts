import { BarcodeType } from "expo-camera/next";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";
import { LinkInterface } from "./interfaces";

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

/** 
* Determines what action you will take when clicking the Dialog button
    - If it is a link: It will load the link by opening the browser
    - If it is text: It will copy the text with the clipboard 
*/
export const handleLink = async (link: LinkInterface) => {
  if (link.isURL) {
    Linking.openURL(link.text);
  } else {
    await Clipboard.setStringAsync(link.text);
  }
};
