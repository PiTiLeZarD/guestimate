import { ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { Layout } from "./Layout";

const theme = createTheme({});

export type AppProps = {};

export type AppComponent = React.FunctionComponent<AppProps>;

export const App: AppComponent = (): JSX.Element => {
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <Layout />
            </ThemeProvider>
        </React.StrictMode>
    );
};
