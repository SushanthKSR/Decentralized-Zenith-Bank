import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Transfer } from './pages/Transfer';
import { SmartContracts } from './pages/SmartContracts';
import { Transactions } from './pages/Transactions';
import { Settings } from './pages/Settings';
import { LandingPage } from './pages/LandingPage';
import { useWallet } from './hooks/useWallet';

function App() {
  const { isConnected } = useWallet();
  
  return (
    <Routes>
      {!isConnected ? (
        <Route path="*" element={<LandingPage />} />
      ) : (
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transfer" element={<Transfer />} />
          <Route path="/smart-contracts" element={<SmartContracts />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;