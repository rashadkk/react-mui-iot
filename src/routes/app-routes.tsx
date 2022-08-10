import {  Routes, Route } from 'react-router-dom';

import RegistryLayout from '../pages/registries/registry-layout';
import Registries from '../pages/registries/registries';
import NewRegistry from '../pages/new-registry/new-registry';
import RegistryOverview from '../pages/registry-overview/registry-overview';

import RoutePaths from '../routes/route';
import Devices from '../pages/devices/devices';
import NewDevice from '../pages/new-device/new-device';
import DevicesLayout from '../pages/devices/devices-layout';
import HomePage from '../pages/home/home';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';


import { useKeycloak } from '@react-keycloak/web'
import { Box, CircularProgress } from '@mui/material';
import DeviceOverview from '../pages/device-overview/device-overview';


const AppRoutes = () => {
  
  const { initialized } = useKeycloak();

  console.log('initialization status', initialized);

  if(!initialized) {
    return (
      <Box sx={{ color: 'grey.500', display: 'flex', height: 'calc(100vh - 64px)' }}  >
        <CircularProgress color="primary" sx={{ margin: 'auto' }} />
      </Box>
    )
  }
  
  return (
    <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<PublicRoute><HomePage /></PublicRoute>} />
        <Route path={RoutePaths.registries} element={ <PrivateRoute><RegistryLayout /></PrivateRoute>}>
            <Route index element={<Registries /> } />
            <Route path={RoutePaths.new_registry} element={<NewRegistry />} />
            <Route path=":registryId/overview" element={<RegistryOverview />} />
            <Route path=":registryId/edit" element={<NewRegistry editMode />} />
            <Route path=":registryId/devices" element={<DevicesLayout />}>
              <Route index element={<Devices />} />
              <Route path="new" element={<NewDevice />} />
              <Route path=":deviceId/overview" element={<DeviceOverview />} />
              <Route path=":deviceId/edit" element={<NewDevice editMode />} />
            </Route>
        </Route>
    </Routes>
  )
}

export default AppRoutes;
