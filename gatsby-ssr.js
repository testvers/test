import React from 'react';
import { Provider } from 'react-redux';
import store from './src/Global/store';
import { ThemeProvider } from "@material-ui/core/styles";
import { Theme } from "./src/Global/theme";

export const wrapRootElement = ({ element }) => {

  return <Provider store={store}><ThemeProvider theme={Theme}>{element}</ThemeProvider></Provider>;
};