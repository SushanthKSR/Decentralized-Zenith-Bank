import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  ArrowRightLeft,
  FileCode,
  Clock,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { useWallet } from "../../hooks/useWallet";

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
};

const NavItem: React.FC<NavItemProps> = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `
      flex items-center px-4 py-3 rounded-lg transition-colors
      ${
        isActive
          ? "bg-primary-900/50 text-primary-400 font-medium"
          : "text-dark-300 hover:bg-dark-800 hover:text-dark-100"
      }
    `}
  >
    <span className="mr-3">{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export const Sidebar: React.FC = () => {
  const { disconnectWallet } = useWallet();

  return (
    <aside className="hidden md:flex flex-col w-64 bg-dark-900 border-r border-dark-800">
      <div className="p-6">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-600 to-primary-800 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <rect x="2" y="6" width="20" height="12" rx="2" />
              <circle cx="12" cy="12" r="2" />
              <path d="M6 12h.01M18 12h.01" />
            </svg>
          </div>
          <span className="font-bold text-xl text-white">Zenith Bank</span>
        </div>
      </div>

      <div className="flex-1 px-3 py-4 space-y-1">
        <NavItem
          to="/"
          icon={<LayoutDashboard size={20} />}
          label="Dashboard"
        />
        <NavItem
          to="/transfer"
          icon={<ArrowRightLeft size={20} />}
          label="Transfer"
        />
        <NavItem
          to="/smart-contracts"
          icon={<FileCode size={20} />}
          label="Smart Contracts"
        />
        <NavItem
          to="/transactions"
          icon={<Clock size={20} />}
          label="Transactions"
        />

        <div className="pt-4 mt-4 border-t border-dark-800">
          <NavItem
            to="/settings"
            icon={<Settings size={20} />}
            label="Settings"
          />
          <NavItem
            to="/help"
            icon={<HelpCircle size={20} />}
            label="Help & Support"
          />

          <button
            onClick={disconnectWallet}
            className="flex items-center px-4 py-3 rounded-lg transition-colors text-dark-300 hover:bg-dark-800 hover:text-dark-100 w-full"
          >
            <span className="mr-3">
              <LogOut size={20} />
            </span>
            <span>Disconnect</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
