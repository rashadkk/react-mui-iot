import { AppBar, Button, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useKeycloak } from "@react-keycloak/web";


const Header = () => {
  const { keycloak, } = useKeycloak();
  
  const baseUrl = 'http://localhost:3000/registries'

  console.log('token', keycloak.token)

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
            <Button color="inherit" onClick={() => keycloak.login({
              redirectUri: baseUrl
            })}>Login</Button>
          )
        }
        {
          !!keycloak.authenticated && (
            <Button color="inherit" onClick={() => keycloak.logout()}>
              Logout ({keycloak?.tokenParsed?.preferred_username})
            </Button>
          )
        }
    </Toolbar>
  </AppBar>
  )
}

export default Header;
