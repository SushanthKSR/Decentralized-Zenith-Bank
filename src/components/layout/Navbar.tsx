import React from "react";
import { Bell, ChevronDown, Wallet } from "lucide-react";
import { useWallet } from "../../hooks/useWallet";
import { shortenAddress, formatBalance } from "../../utils/formatters";
import { getNetworkName } from "../../utils/web3";

export const Navbar: React.FC = () => {
  const { address, balance, chainId, disconnectWallet } = useWallet();

  return (
    <nav className="sticky top-0 z-10 bg-dark-900/80 backdrop-blur-lg border-b border-dark-800 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="md:hidden">
          <span className="font-bold text-xl text-primary-500">
            Zenith Bank
          </span>
        </div>

        <div className="flex items-center space-x-4 ml-auto">
          <button className="btn btn-ghost relative p-2">
            <Bell size={20} />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary-500" />
          </button>

          <div className="bg-dark-800 rounded-lg px-3 py-1.5 text-sm flex items-center">
            <div className="h-2 w-2 rounded-full bg-success-500 mr-2" />
            <span>{getNetworkName(chainId)}</span>
          </div>

          <div className="bg-dark-800 rounded-lg px-3 py-1.5 text-sm flex items-center">
            <Wallet size={16} className="mr-2 text-primary-500" />
            <span>{formatBalance(balance)} ETH</span>
          </div>

          <div className="relative group">
            <button className="btn btn-ghost flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mr-2">
                <span className="text-sm font-bold text-white">
                  {address ? address.substring(2, 4).toUpperCase() : ""}
                </span>
              </div>
              <span className="hidden md:inline">
                {shortenAddress(address || "")}
              </span>
              <ChevronDown size={16} className="ml-1" />
            </button>

            <div className="absolute right-0 mt-2 w-48 bg-dark-800 rounded-lg shadow-lg border border-dark-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="py-1">
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-dark-700 transition-colors"
                  onClick={disconnectWallet}
                >
                  Disconnect Wallet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
