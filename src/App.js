import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Portfolio from './pages/Portfolio';
import Devices from './pages/Devices';
import Compare from './pages/Compare';
import Compliance from './pages/Compliance';
import Kiosks from './pages/Kiosks';
import Alerts from './pages/Alerts';
import Thresholds from './pages/Thresholds';
import DeviceConfigurations from './pages/DeviceConfigurations';
import WeeklyDigest from './pages/WeeklyDigest';
import Subscriptions from './pages/Subscriptions';
import BuildingSettings from './pages/BuildingSettings';
import UserManagement from './pages/UserManagement';
import Organization from './pages/Organization';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Portfolio />} />
        <Route path="devices" element={<Devices />} />
        <Route path="compare" element={<Compare />} />
        <Route path="compliance" element={<Compliance />} />
        <Route path="kiosks" element={<Kiosks />} />
        <Route path="alerts" element={<Alerts />} />
        <Route path="thresholds" element={<Thresholds />} />
        <Route path="device-configurations" element={<DeviceConfigurations />} />
        <Route path="weekly-digest" element={<WeeklyDigest />} />
        <Route path="subscriptions" element={<Subscriptions />} />
        <Route path="building-settings" element={<BuildingSettings />} />
        <Route path="user-management" element={<UserManagement />} />
        <Route path="organization" element={<Organization />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

