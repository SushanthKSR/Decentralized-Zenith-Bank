import React from 'react';
import { motion } from 'framer-motion';
import * as Tabs from '@radix-ui/react-tabs';
import { Settings as SettingsIcon, Ban as Bank, Shield, Bell, Wallet } from 'lucide-react';
import { BankingPreferences } from '../components/settings/BankingPreferences';
import { SecuritySettings } from '../components/settings/SecuritySettings';

export const Settings: React.FC = () => {
  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-12 w-12 rounded-lg bg-primary-900/50 flex items-center justify-center text-primary-500">
            <SettingsIcon size={24} />
          </div>
          <h1>Settings</h1>
        </div>

        <div className="card">
          <Tabs.Root defaultValue="banking" className="w-full">
            <Tabs.List className="flex space-x-2 border-b border-dark-700 mb-6">
              <Tabs.Trigger
                value="banking"
                className="group px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary-500"
              >
                <div className="flex items-center space-x-2">
                  <Bank size={18} className="group-data-[state=active]:text-primary-500" />
                  <span className="group-data-[state=active]:text-primary-500">Banking</span>
                </div>
              </Tabs.Trigger>
              
              <Tabs.Trigger
                value="security"
                className="group px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary-500"
              >
                <div className="flex items-center space-x-2">
                  <Shield size={18} className="group-data-[state=active]:text-primary-500" />
                  <span className="group-data-[state=active]:text-primary-500">Security</span>
                </div>
              </Tabs.Trigger>
              
              <Tabs.Trigger
                value="notifications"
                className="group px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary-500"
              >
                <div className="flex items-center space-x-2">
                  <Bell size={18} className="group-data-[state=active]:text-primary-500" />
                  <span className="group-data-[state=active]:text-primary-500">Notifications</span>
                </div>
              </Tabs.Trigger>
              
              <Tabs.Trigger
                value="wallets"
                className="group px-4 py-2 border-b-2 border-transparent data-[state=active]:border-primary-500"
              >
                <div className="flex items-center space-x-2">
                  <Wallet size={18} className="group-data-[state=active]:text-primary-500" />
                  <span className="group-data-[state=active]:text-primary-500">Wallets</span>
                </div>
              </Tabs.Trigger>
            </Tabs.List>

            <Tabs.Content value="banking">
              <BankingPreferences />
            </Tabs.Content>

            <Tabs.Content value="security">
              <SecuritySettings />
            </Tabs.Content>

            <Tabs.Content value="notifications">
              <div className="text-center py-12 text-dark-400">
                <Bell size={48} className="mx-auto mb-4" />
                <p>Notification settings coming soon</p>
              </div>
            </Tabs.Content>

            <Tabs.Content value="wallets">
              <div className="text-center py-12 text-dark-400">
                <Wallet size={48} className="mx-auto mb-4" />
                <p>Wallet management coming soon</p>
              </div>
            </Tabs.Content>
          </Tabs.Root>
        </div>
      </motion.div>
    </div>
  );
};