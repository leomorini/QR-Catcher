export const dimensions = {
  size: {
    sm: 10,
    md: 15,
    lg: 20,
    xl: 28,
  },
  border: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
  },
  borderRadius: {
    sm: 6,
    md: 8,
    lg: 12,
    xl: 20,
  },
  padding: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
  },
  margin: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
  },
};

export type sizeDimension = keyof typeof dimensions.size;
export type borderDimension = keyof typeof dimensions.border;
export type borderRadiusDimension = keyof typeof dimensions.borderRadius;
export type paddingDimension = keyof typeof dimensions.padding;
export type marginDimension = keyof typeof dimensions.margin;