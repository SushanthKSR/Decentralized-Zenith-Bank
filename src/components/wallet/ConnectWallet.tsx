import React from 'react';
import { motion } from 'framer-motion';
import { useWallet } from '../../hooks/useWallet';

export const ConnectWallet: React.FC = () => {
  const { connectWallet, isLoading } = useWallet();
  
  return (
    <div className="text-center py-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-r from-primary-600 to-secondary-600 flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
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
        <h3 className="text-xl font-semibold mb-2">Connect Your Wallet</h3>
        <p className="text-dark-400 mb-6">
          Connect your wallet to access the decentralized banking platform
        </p>
        <button
          onClick={connectWallet}
          disabled={isLoading}
          className="btn btn-primary px-8 py-3"
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </div>
          ) : (
            <span>Connect MetaMask</span>
          )}
        </button>
      </motion.div>
      
      <div className="border-t border-dark-800 pt-6">
        <p className="text-dark-400 text-sm mb-2">
          New to Ethereum?
        </p>
        <a
          href="https://metamask.io/download/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary-500 hover:text-primary-400 font-medium"
        >
          Learn how to set up MetaMask
        </a>
      </div>
    </div>
  );
};