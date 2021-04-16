import React from 'react';
import { Provider } from 'react-redux';
import store from './src/Global/store';
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { useSelector } from 'react-redux';
import { State } from './src/Global/Types/SliceTypes';

export const wrapRootElement = ({ element }) => {
  const islit = useSelector((state: State) => state.themes.value);

  const theme = createMuiTheme({
    palette: {
      type: islit ? "light" : "dark",
    },
  });
  return <Provider store={store}><ThemeProvider theme={theme}>{element}</ThemeProvider></Provider>;
};