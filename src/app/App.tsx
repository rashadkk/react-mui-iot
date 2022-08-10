// import './App.scss';

import { BrowserRouter } from 'react-router-dom';

import { ReactKeycloakProvider } from "@react-keycloak/web";
import { keycloak } from "../services/keyclock.service"

import Header from '../components/header/header';

import AppRoutes from '../routes/app-routes';
import styles from './App.module.scss';

const BASE_URL = process.env.REACT_APP_APP_URL;

function App() {
  return (
    <ReactKeycloakProvider authClient={keycloak} initOptions={{ silentCheckSsoRedirectUri: `${BASE_URL}/silent-check-sso.html` }}>
      <BrowserRouter> 
        <div id={styles.AppContainer}>
          <Header />
          <main className=''>
            <AppRoutes />
          </main>
        </div>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
}

export default App;
