import React, { useState } from 'react';
import { ArrowUpRight, ChevronUp, ChevronDown, Wallet } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';
import { formatBalance } from '../../utils/formatters';
import { motion } from 'framer-motion';

export const WalletBalance: React.FC = () => {
  const { balance } = useWallet();
  const [showDetails, setShowDetails] = useState(false);
  
  // Mock data for other cryptocurrencies
  const tokens = [
    { name: 'Bitcoin', symbol: 'BTC', balance: '0.025', value: '1,250.00', change: '+2.5%', icon: '₿' },
    { name: 'Ethereum', symbol: 'ETH', balance, value: `${(parseFloat(balance) * 3500).toFixed(2)}`, change: '-0.8%', icon: 'Ξ' },
    { name: 'Solana', symbol: 'SOL', balance: '12.5', value: '1,875.00', change: '+5.2%', icon: 'Ⓢ' },
  ];
  
  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Wallet Balance</h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="btn btn-ghost p-1"
        >
          {showDetails ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="h-12 w-12 rounded-full bg-gradient-to-r from-primary-500 to-primary-700 flex items-center justify-center mr-4">
          <Wallet size={24} className="text-white" />
        </div>
        <div>
          <p className="text-sm text-dark-400">Total Balance</p>
          <h2 className="text-2xl font-bold">${(parseFloat(balance) * 3500 + 1250 + 1875).toFixed(2)}</h2>
        </div>
      </div>
      
      {showDetails && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-4 mt-6 pt-6 border-t border-dark-800">
            {tokens.map((token) => (
              <div key={token.symbol} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-dark-800 flex items-center justify-center mr-3">
                    <span className="text-lg">{token.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-medium">{token.name}</h4>
                    <p className="text-sm text-dark-400">{token.balance} {token.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">${token.value}</p>
                  <p className={`text-sm ${token.change.startsWith('+') ? 'text-success-500' : 'text-error-500'}`}>
                    {token.change} <ArrowUpRight size={12} className="inline" />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <button className="btn btn-primary">
          Deposit
        </button>
        <button className="btn btn-outline">
          Withdraw
        </button>
      </div>
    </div>
  );
};