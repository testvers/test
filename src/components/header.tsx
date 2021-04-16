import * as React from "react"
import { Link } from "gatsby"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../Global/Slice/ThemeSlice';
import { State } from '../Global/Types/SliceTypes';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      width: '100vw',
    },
    title: {
      flexGrow: 1,
      textAlign: 'center',
      fontSize: 'xx-large'
    },
    body: {
      backgroundColor: 'hsl(226, 23%, 11%)',
      color: 'white',
    },
  }),
);

interface HeaderProps {
  siteTitle: string
}

const Header = ({ siteTitle }: HeaderProps) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const islit = useSelector((state: State) => state.themes.value);

  const themeHandle = () => {
    dispatch(setTheme())
    var element = document.body;
    element.classList.toggle(classes.body);
  };

  return (
    <header
      style={{
        background: islit ? `rebeccapurple` : `hsl(227deg 22% 20%)`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        className={classes.root}
        style={{
          display: 'flex',
          flexDirection: 'row',
          paddingTop: '1rem'
        }}
      >
        <GitHubIcon style={{ color: 'white', fontSize: 'xxx-large', marginLeft: '15px', marginTop: '-3px' }} />
        <h1 className={classes.title}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
          </Link>
        </h1>
        <IconButton onClick={themeHandle} color="inherit" style={{ color: 'white', marginRight: '15px', marginTop: '-12px' }}>
          {islit ? <Brightness7Icon style={{fontSize: 'xx-large'}}/> : <Brightness4Icon style={{fontSize: 'xx-large'}}/>}
        </IconButton>
      </div>
    </header>
  );
}

export default Header
