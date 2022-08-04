import {  Routes, Route } from 'react-router-dom';

import RegistryLayout from '../pages/registries/registry-layout';
import Registries from '../pages/registries/registries';
import NewRegistry from '../pages/new-registry/new-registry';
import RegistryOverview from '../pages/registry-overview/registry-overview';

import RoutePaths from '../routes/route';
import Devices from '../pages/devices/devices';
import NewDevice from '../pages/new-device/new-device';
import DevicesLayout from '../pages/devices/devices-layout';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path={RoutePaths.registries} element={<RegistryLayout />}>
            <Route index element={<Registries />} />
            <Route path={RoutePaths.new_registry} element={<NewRegistry />} />
            <Route path=":registryId/overview" element={<RegistryOverview />} />
            <Route path=":registryId/devices" element={<DevicesLayout />}>
              <Route index element={<Devices />} />
              <Route path="new" element={<NewDevice />} />
            </Route>
        </Route>
    </Routes>
  )
}

export default AppRoutes;
