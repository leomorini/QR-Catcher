import { createContext, PropsWithChildren, useContext, useState } from "react";
import AwesomeAlert from "react-native-awesome-alerts";
import { dimensions } from "@/styles/dimensions";
import ThemeContext from "@/styles";
import { ThemeType } from "@/styles/colors";

export interface AlertContextType {
  show: Function;
  close: Function;
}

export interface AlertOptionsType {
  title: string;
  message: string;
  cancelText?: string;
  confirmText?: string;
  confirmButtonColor?: string;
  cancelButtonColor?: string;
  onClose?: Function;
  onConfirmPressed?: Function;
  closeOnTouchOutside?: boolean;
  closeOnHardwareBackPress?: boolean;
  showCancelButton?: boolean;
  showConfirmButton?: boolean;
}

export const AlertContext = createContext<AlertContextType | undefined>(
  undefined
);

export const AlertNotificationRoot = ({ children }: PropsWithChildren) => {
  const defaultOptions = {
    title: "Titulo",
    message: "Mensagem",
    cancelText: "",
    confirmText: "Fechar",
    onConfirmPressed: () => false,
  };

  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<AlertOptionsType>(defaultOptions);

  const { themeColors } = useContext(ThemeContext);
  const stylesProps = getStylesProps(themeColors);

  function show(newOptions: AlertOptionsType) {
    setNewOptions(newOptions);
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

  function onDismiss() {
    close();

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

  return (
    <AlertContext.Provider value={{ show, close }}>
      <>
        {children}

        <AwesomeAlert
          show={isOpen}
          showProgress={false}
          title={options.title}
          message={options.message}
          closeOnTouchOutside={options.closeOnTouchOutside || true}
          closeOnHardwareBackPress={options.closeOnHardwareBackPress || true}
          showCancelButton={false}
          showConfirmButton={options.showConfirmButton || true}
          cancelText={options.cancelText || ""}
          confirmText={options.confirmText || ""}
          onConfirmPressed={handleConfirm}
          onDismiss={onDismiss}
          {...stylesProps}
        />
      </>
    </AlertContext.Provider>
  );
};

// Styles
interface AlertAwesomeStylesProps {
  alertContainerStyle?: object;
  overlayStyle?: object;
  contentContainerStyle?: object;
  contentStyle?: object;
  titleStyle?: object;
  messageStyle?: object;
  actionContainerStyle?: object;
  cancelButtonColor?: string;
  cancelButtonTextStyle?: object;
  cancelButtonStyle?: object;
  confirmButtonColor?: string;
  confirmButtonTextStyle?: object;
  confirmButtonStyle?: object;
}

function getStylesProps(themeColors: ThemeType) {
  const stylesProps: AlertAwesomeStylesProps = {
    contentContainerStyle: {
      backgroundColor: themeColors.foreground2,
      borderWidth: dimensions.border.md,
      borderColor: themeColors.border,
      borderRadius: dimensions.radius.xl,
      minWidth: "80%",
    },
    actionContainerStyle: {
      marginTop: dimensions.margin.md,
    },
    titleStyle: {
      fontFamily: "FontBold",
      color: themeColors.red,
      fontSize: 22,
    },
    messageStyle: {
      fontFamily: "FontRegular",
      color: themeColors.text,
      fontSize: 18,
      width: "100%",
      textAlign: "center",
      marginTop: dimensions.margin.lg
    },
    cancelButtonStyle: {
      backgroundColor: "transparent",
      borderWidth: dimensions.border.md,
      borderColor: themeColors.highlighted,
      borderRadius: dimensions.radius.md,
      fontFamily: "FontRegular",
    },
    cancelButtonTextStyle: {
      color: themeColors.highlighted,
    },
    confirmButtonStyle: {
      alignItems: "center",
      width: "100%",
      paddingVertical: dimensions.padding.md,
      borderRadius: dimensions.radius.lg,
      borderWidth: dimensions.border.md,
      borderColor: themeColors.highlightedColored,
      backgroundColor: themeColors.foreground,
      marginTop: dimensions.margin.lg,
    },
    confirmButtonTextStyle: {
      color: themeColors.highlightedColored,
      fontFamily: "FontBold",
      fontSize: 18,
    },
  };

  return stylesProps;
}
