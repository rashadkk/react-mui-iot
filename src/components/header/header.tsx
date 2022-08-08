import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useKeycloak } from "@react-keycloak/web";
import { ChangeEvent, MouseEvent, useState } from "react";

const baseUrl = `${process.env.REACT_APP_APP_URL}/registries`

const Header = () => {
  const { keycloak, } = useKeycloak();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const login = () => {
    keycloak.login({
      redirectUri: baseUrl
    })
    setAnchorEl(null);
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
          !keycloak.authenticated && (
            <Button color="inherit" onClick={handleMenu}>Login</Button>
          )
        }

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={()=> login()}>Login with Kore</MenuItem>
          <MenuItem onClick={handleClose}>Login with Google</MenuItem>
        </Menu>

        {
          !!keycloak.authenticated && (
            <Button color="inherit" onClick={() => keycloak.logout()}>
              Logout ({keycloak?.tokenParsed?.preferred_username?.split('@')[0]})
            </Button>
          )
        }
    </Toolbar>
  </AppBar>
  )
}

export default Header;
