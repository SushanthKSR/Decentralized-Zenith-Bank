import React from 'react';
import { motion } from 'framer-motion';
import { WalletBalance } from '../components/wallet/WalletBalance';
import { TransactionsList } from '../components/wallet/TransactionsList';
import { ArrowRight, ArrowUpRight, Wallet, FileCode2, Landmark } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { formatBalance, shortenAddress } from '../utils/formatters';

export const Dashboard: React.FC = () => {
  const { address, balance } = useWallet();
  
  const quickActions = [
    { 
      title: 'Send',
      icon: <ArrowUpRight size={20} className="text-error-500" />,
      link: '/transfer',
      color: 'from-error-500/20 to-error-700/20'
    },
    { 
      title: 'Receive',
      icon: <ArrowRight size={20} className="text-success-500" />,
      link: '/transfer?tab=receive',
      color: 'from-success-500/20 to-success-700/20'
    },
    { 
      title: 'Smart Contract',
      icon: <FileCode2 size={20} className="text-primary-500" />,
      link: '/smart-contracts',
      color: 'from-primary-500/20 to-primary-700/20'
    },
    { 
      title: 'Bank Transfer',
      icon: <Landmark size={20} className="text-secondary-500" />,
      link: '/transfer?tab=bank',
      color: 'from-secondary-500/20 to-secondary-700/20'
    },
  ];
  
  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-6">Dashboard</h1>
        
        <div className="card mb-6">
          <div className="flex flex-wrap md:flex-nowrap items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center mr-4">
                <Wallet size={32} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-dark-400">Current Wallet</p>
                <h2 className="text-xl font-semibold">{shortenAddress(address || '')}</h2>
              </div>
            </div>
            
            <div className="w-full md:w-auto grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-dark-800 rounded-lg p-3">
                <p className="text-sm text-dark-400 mb-1">ETH Balance</p>
                <p className="text-lg font-semibold">{formatBalance(balance)} ETH</p>
              </div>
              <div className="bg-dark-800 rounded-lg p-3">
                <p className="text-sm text-dark-400 mb-1">USD Value</p>
                <p className="text-lg font-semibold">${(parseFloat(balance) * 3500).toFixed(2)}</p>
              </div>
              <div className="bg-dark-800 rounded-lg p-3 hidden md:block">
                <p className="text-sm text-dark-400 mb-1">Network</p>
                <p className="text-lg font-semibold">Ethereum</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action, index) => (
            <motion.a
              key={action.title}
              href={action.link}
              className="card card-hover h-32 flex flex-col items-center justify-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <div className={`h-12 w-12 rounded-full bg-gradient-to-r ${action.color} flex items-center justify-center mb-3`}>
                {action.icon}
              </div>
              <span className="font-medium">{action.title}</span>
            </motion.a>
          ))}
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <WalletBalance />
          <TransactionsList />
        </div>
      </motion.div>
    </div>
  );
};