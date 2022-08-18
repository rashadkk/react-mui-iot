import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

import { useNavigate } from "react-router-dom";

import { auth, signOutHandler } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {

  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const login = () => {
    navigate('/login')
  }

  return (
  <AppBar position="static">
    <Toolbar>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: '1.5rem' }}>
          KORE
        </Typography>

        {
          (!user) && (
            <Button color="inherit" onClick={login}>Login</Button>
          )
        }
        {
          (!!user) && (
            <Button color="inherit" onClick={signOutHandler}>
              Logout ({user?.email?.split('@')[0]})
            </Button>
          )
        }
    </Toolbar>
  </AppBar>
  )
}

export default Header;
