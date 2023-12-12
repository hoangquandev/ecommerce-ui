import { CssBaseline, ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material'
import React from 'react'
import themeDefault from './themeOptions'
import { merge } from "merge"

const MuiTheme = ({ children }) => {
    const themeOptions = themeDefault()
    let theme = createTheme({ ...themeOptions })
    theme = responsiveFontSizes(theme)
    theme.shadows[1] = "0px 1px 3px rgba(3, 0, 71, 0.09)";
    theme.shadows[2] = "0px 4px 16px rgba(43, 52, 69, 0.1)";
    theme.shadows[3] = "0px 8px 45px rgba(3, 0, 71, 0.09)";
    theme.shadows[4] = "0px 0px 28px rgba(3, 0, 71, 0.01)";
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}

export default MuiTheme