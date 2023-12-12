import { components } from "./components";
import { blue, marron, paste, primary, themeColors, grey } from "./themeColors";
import { typography } from "./typography";
const THEMES = {
    GIFT: "GIFT",
    HEALTH: "HEALTH",
    DEFAULT: "DEFAULT",
    GROCERY: "GROCERY",
    FURNITURE: "FURNITURE",
};
const breakpoints = {
    values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
    },
};

const themesOption = {
    [THEMES.DEFAULT]: {
        typography,
        breakpoints,
        components: { ...components },
        palette: {
            primary: { ...primary, light: primary[100] },
            grey,
            ...themeColors,
        },
    },
    [THEMES.GROCERY]: {
        typography,
        breakpoints,
        components: { ...components },
        palette: {
            primary: { ...primary, light: primary[100] },
            ...themeColors,
        },
    },
    [THEMES.FURNITURE]: {
        typography,
        breakpoints,
        components: { ...components },
        palette: {
            primary: { ...paste, light: paste[100] },
            ...themeColors,
        },
    },
    [THEMES.HEALTH]: {
        typography,
        breakpoints,
        components: { ...components },
        palette: {
            primary: { ...blue, light: blue[100] },
            ...themeColors,
        },
    },
    [THEMES.GIFT]: {
        typography,
        breakpoints,
        components: { ...components },
        palette: {
            primary: { ...marron, light: marron[100] },
            ...themeColors,
        },
    },
};

const themeOptions = () => {
    let themeOptions = themesOption[THEMES.DEFAULT]

    return themeOptions;
};

export default themeOptions;
