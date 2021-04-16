import { createMuiTheme } from "@material-ui/core";
import { useSelector } from "react-redux";
import { State } from "./Types/SliceTypes";

export const Theme = () => {

const islit = useSelector((state: State) => state.themes.value);

const theme = createMuiTheme({
    palette: {
      type: islit ? "light" : "dark",
    },
  });

  return theme;
}