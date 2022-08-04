import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu'

const Header = () => {
  return (
  //   <header className="p-3 bg-dark text-white">
  //     <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
  //       <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
  //         {/* <svg className="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"/></svg> */}
  //         IoT Core
  //       </a>
  //     </div>
  // </header>
  <AppBar position="static">
    <Toolbar>
        <IconButton color="inherit">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: '1.5rem' }}>
          KORE
        </Typography>
    </Toolbar>
  </AppBar>
  )
}

export default Header;
