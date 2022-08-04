// import './App.scss';

import { BrowserRouter } from 'react-router-dom';

import Header from '../components/header/header';

import AppRoutes from '../routes/app-routes';
import styles from './App.module.scss';


function App() {
  return (
    <BrowserRouter> 
      <div id={styles.AppContainer}>
        <Header />
        <main className=''>
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
