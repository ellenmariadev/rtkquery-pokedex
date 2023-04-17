import { extendTheme } from "@chakra-ui/react";
import { theme as chakraTheme } from "@chakra-ui/react";

const fonts = {
  ...chakraTheme.fonts,
  body: "DM Sans, sans-serif",
  heading: "DM Sans, sans-serif",
};

const overrides = {
  ...chakraTheme,
  fonts,
};

export const customTheme = extendTheme(overrides);
