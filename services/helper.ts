import { Share } from "react-native";
import * as Clipboard from "expo-clipboard";
import * as Linking from "expo-linking";

import { LinkInterface } from "./interfaces";

/**
 * Checks if a string is a valid link
 */
export function validURL(str: string) {
  const regex = /^http:\/\/.+/i;
  return !!regex.test(str);
}

/**
 * All types of codes that the reader decodes
 */
export const barcodeTypes: any[] = [
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

export const handleShare = async (link: LinkInterface) => {
  await Share.share({
    message: link.text,
    url: link.isURL ? link.text : "",
    title: link.text,
  });
};
