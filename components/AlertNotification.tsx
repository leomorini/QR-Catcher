import { createContext, PropsWithChildren, useContext, useState } from "react";
import { dimensions } from "@/styles/dimensions";
import ThemeContext from "@/styles";
import { StyleSheet, View } from "react-native";
import { ButtonThemed, TextThemed, ViewThemed } from "./Themed";
import { Ionicons } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { useTranslation } from "react-i18next";

export interface AlertContextType {
  show: Function;
  close: Function;
}

export interface AlertOptionsType {
  title?: string;
  message: string;
  confirmText?: string;
  confirmIcon?: string | null;
  onClose?: Function;
  onSharePressed?: Function;
  showShareButton?: boolean;
  onConfirmPressed?: Function;
  showConfirmButton?: boolean;
}

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export const AlertNotificationRoot = ({ children }: PropsWithChildren) => {
  const defaultOptions = {
    title: "",
    message: "",
    confirmText: "",
    confirmIcon: null,
    onClose: () => false,
    onSharePressed: () => false,
    showShareButton: false,
    onConfirmPressed: () => false,
    showConfirmButton: true,
  };

  const [isOpen, setOpen] = useState(false);
  const [options, setOptions] = useState<AlertOptionsType>(defaultOptions);
  const { t } = useTranslation();

  const { themeColors } = useContext(ThemeContext);

  function show(newOptions: AlertOptionsType) {
    setNewOptions(newOptions);
    setOpen(true);
  }

  function close() {
    setOpen(false);
    onDismiss();
  }

  function onDismiss() {
    if (typeof options.onClose === "function") {
      options.onClose();
    }

    setNewOptions(defaultOptions);
  }

  function setNewOptions(newOptions: AlertOptionsType) {
    const merged = {
      ...options,
      ...newOptions,
    };

    if (merged.message.length > 200) {
      merged.message = merged.message.substring(0, 200) + "...";
    }

    setOptions(merged);
  }

  function handleConfirm() {
    if (typeof options.onConfirmPressed === "function") {
      options.onConfirmPressed();
    }

    close();
  }

  const generateIconConfirmButton = (confirmIcon: string) => {
    if (confirmIcon === "copy") {
      return (
        <Ionicons
          style={styles.actionIcon}
          name="copy-outline"
          size={24}
          color={themeColors.text}
        />
      );
    } else {
      return (
        <Ionicons
          style={styles.actionIcon}
          name="open-outline"
          size={26}
          color={themeColors.text}
        />
      );
    }
  };

  return (
    <AlertContext.Provider value={{ show, close }}>
      <>
        {children}

        <Modal
          isVisible={isOpen}
          onModalHide={onDismiss}
          onBackButtonPress={close}
          onBackdropPress={close}
          onSwipeComplete={close}
          swipeDirection={["down"]}
          style={styles.modal}
        >
          <ViewThemed style={styles.container}>
            <View style={styles.info}>
              {options.title && (
                <TextThemed bold style={styles.title}>
                  {options.title}
                </TextThemed>
              )}
              {options.message && (
                <TextThemed numberOfLines={5} style={styles.message}>
                  {options.message}
                </TextThemed>
              )}
            </View>

            <View style={styles.actions}>
              {options.showShareButton && options.onSharePressed && (
                <ButtonThemed
                  onPress={() =>
                    typeof options.onSharePressed === "function"
                      ? options.onSharePressed()
                      : false
                  }
                  color="foreground"
                  style={[
                    styles.action,
                    { borderColor: themeColors.highlightedColored },
                  ]}
                >
                  <Ionicons
                    style={styles.actionIcon}
                    name="share-social"
                    size={24}
                    color={themeColors.text}
                  />
                  <TextThemed style={styles.actionText}>
                    {t("GLOBAL_Share")}
                  </TextThemed>
                </ButtonThemed>
              )}

              {options.showConfirmButton && options.confirmText && (
                <ButtonThemed
                  onPress={handleConfirm}
                  color="highlightedColored"
                  style={[
                    styles.action,
                    { borderColor: themeColors.foreground },
                  ]}
                >
                  {options.confirmIcon &&
                    generateIconConfirmButton(options.confirmIcon)}
                  <TextThemed style={styles.actionText}>
                    {options.confirmText}
                  </TextThemed>
                </ButtonThemed>
              )}
            </View>
          </ViewThemed>
        </Modal>
      </>
    </AlertContext.Provider>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: dimensions.padding.lg,
    maxHeight: "50%",
    borderTopLeftRadius: dimensions.border.xl + 20,
    borderTopRightRadius: dimensions.border.xl + 20,
  },
  content: {
    flex: 1,
  },
  info: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    marginBottom: dimensions.margin.lg,
  },
  message: {
    fontSize: 20,
  },
  actions: {
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: dimensions.margin.lg,
    marginBottom: dimensions.margin.lg,
    gap: dimensions.size.md,
  },
  action: {
    position: "relative",
    width: "100%",
    paddingHorizontal: dimensions.padding.lg,
    paddingVertical: dimensions.padding.md,
    borderRadius: dimensions.radius.lg,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  actionIcon: {
    position: "absolute",
    left: dimensions.padding.md,
  },
  actionText: {
    fontSize: 16,
  },
});
