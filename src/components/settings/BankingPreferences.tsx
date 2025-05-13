import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import * as Select from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';

export const BankingPreferences: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Default Banking Network</h3>
          <p className="text-sm text-dark-400">Choose your preferred network for transactions</p>
        </div>
        <Select.Root defaultValue="ethereum">
          <Select.Trigger className="inline-flex items-center justify-between rounded-md px-4 py-2 text-sm bg-dark-800 border border-dark-700 hover:bg-dark-700 w-48">
            <Select.Value />
            <Select.Icon>
              <ChevronDown size={16} />
            </Select.Icon>
          </Select.Trigger>

          <Select.Portal>
            <Select.Content className="overflow-hidden bg-dark-800 rounded-md border border-dark-700">
              <Select.Viewport className="p-1">
                <Select.Item value="ethereum" className="flex items-center px-4 py-2 text-sm hover:bg-dark-700 cursor-pointer">
                  <Select.ItemText>Ethereum Mainnet</Select.ItemText>
                  <Select.ItemIndicator className="ml-2">
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
                <Select.Item value="polygon" className="flex items-center px-4 py-2 text-sm hover:bg-dark-700 cursor-pointer">
                  <Select.ItemText>Polygon</Select.ItemText>
                  <Select.ItemIndicator className="ml-2">
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
                <Select.Item value="optimism" className="flex items-center px-4 py-2 text-sm hover:bg-dark-700 cursor-pointer">
                  <Select.ItemText>Optimism</Select.ItemText>
                  <Select.ItemIndicator className="ml-2">
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Auto-convert Currency</h3>
          <p className="text-sm text-dark-400">Automatically convert between cryptocurrencies</p>
        </div>
        <Switch.Root className="w-11 h-6 bg-dark-700 rounded-full relative data-[state=checked]:bg-primary-600">
          <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
        </Switch.Root>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Transaction Notifications</h3>
          <p className="text-sm text-dark-400">Receive alerts for all transactions</p>
        </div>
        <Switch.Root className="w-11 h-6 bg-dark-700 rounded-full relative data-[state=checked]:bg-primary-600" defaultChecked>
          <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
        </Switch.Root>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Gas Price Alerts</h3>
          <p className="text-sm text-dark-400">Get notified when gas prices are low</p>
        </div>
        <Switch.Root className="w-11 h-6 bg-dark-700 rounded-full relative data-[state=checked]:bg-primary-600">
          <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
        </Switch.Root>
      </div>
    </div>
  );
};