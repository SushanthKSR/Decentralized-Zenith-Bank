import React from "react";
import * as Switch from "@radix-ui/react-switch";
import { Shield, Key, Smartphone } from "lucide-react";

export const SecuritySettings: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 p-4 bg-success-500/10 text-success-500 rounded-lg">
        <Shield size={24} />
        <div>
          <h3 className="font-medium">Security Status: Strong</h3>
          <p className="text-sm">Your account is well-protected</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Key size={20} className="text-primary-500" />
            <div>
              <h3 className="font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-dark-400">
                Add an extra layer of security
              </p>
            </div>
          </div>
          <Switch.Root
            className="w-11 h-6 bg-dark-700 rounded-full relative data-[state=checked]:bg-primary-600"
            defaultChecked
          >
            <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
          </Switch.Root>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Smartphone size={20} className="text-primary-500" />
            <div>
              <h3 className="font-medium">Device Management</h3>
              <p className="text-sm text-dark-400">Manage trusted devices</p>
            </div>
          </div>
          <button className="btn btn-outline btn-sm">Manage</button>
        </div>

        <div className="pt-4 border-t border-dark-700">
          <button className="btn btn-error w-full">
            Reset Security Settings
          </button>
        </div>
      </div>
    </div>
  );
};
