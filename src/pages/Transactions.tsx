import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUp, FileCode, Clock, Calendar, Search, Filter } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { formatTimestamp, shortenAddress, formatCurrency } from '../utils/formatters';
import { TransactionType, TransactionStatus } from '../types/Transaction';

export const Transactions: React.FC = () => {
  const { transactions } = useWallet();
  const [filterType, setFilterType] = useState<string>('all');
  const [searchText, setSearchText] = useState<string>('');
  
  const filteredTransactions = transactions.filter((tx) => {
    if (filterType !== 'all' && tx.type !== filterType) {
      return false;
    }
    
    if (searchText) {
      return (
        tx.from.toLowerCase().includes(searchText.toLowerCase()) ||
        tx.to.toLowerCase().includes(searchText.toLowerCase()) ||
        (tx.description && tx.description.toLowerCase().includes(searchText.toLowerCase()))
      );
    }
    
    return true;
  });
  
  const getTransactionIcon = (type: TransactionType) => {
    switch (type) {
      case TransactionType.WALLET_TO_WALLET:
        return <ArrowUp size={16} className="text-error-500" />;
      case TransactionType.BANK_TO_BANK:
        return <ArrowDown size={16} className="text-success-500" />;
      case TransactionType.SMART_CONTRACT:
        return <FileCode size={16} className="text-primary-500" />;
    }
  };
  
  const getStatusBadge = (status: TransactionStatus) => {
    let className = 'badge ';
    
    switch (status) {
      case TransactionStatus.PENDING:
        className += 'bg-warning-500/20 text-warning-500';
        break;
      case TransactionStatus.CONFIRMED:
        className += 'bg-success-500/20 text-success-500';
        break;
      case TransactionStatus.FAILED:
        className += 'bg-error-500/20 text-error-500';
        break;
    }
    
    return <span className={className}>{status}</span>;
  };
  
  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-wrap justify-between items-center mb-6">
          <h1>Transaction History</h1>
          <div className="flex items-center mt-4 sm:mt-0">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search transactions..."
                className="input pr-10"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Search size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400" />
            </div>
            <div className="relative">
              <select
                className="input appearance-none pr-10"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value={TransactionType.WALLET_TO_WALLET}>Wallet to Wallet</option>
                <option value={TransactionType.BANK_TO_BANK}>Bank to Bank</option>
                <option value={TransactionType.SMART_CONTRACT}>Smart Contract</option>
              </select>
              <Filter size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-400 pointer-events-none" />
            </div>
          </div>
        </div>
        
        <div className="card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-800">
                  <th className="text-left py-4 px-4 font-medium text-dark-300">Type</th>
                  <th className="text-left py-4 px-4 font-medium text-dark-300">From</th>
                  <th className="text-left py-4 px-4 font-medium text-dark-300">To</th>
                  <th className="text-left py-4 px-4 font-medium text-dark-300">Amount</th>
                  <th className="text-left py-4 px-4 font-medium text-dark-300">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-2" />
                      Time
                    </div>
                  </th>
                  <th className="text-left py-4 px-4 font-medium text-dark-300">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dark-800">
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-dark-400">
                      {transactions.length === 0 ? (
                        <div>
                          <Calendar size={32} className="mx-auto mb-2" />
                          <p>No transactions yet</p>
                        </div>
                      ) : (
                        <div>
                          <Search size={32} className="mx-auto mb-2" />
                          <p>No transactions match your filters</p>
                        </div>
                      )}
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-dark-800/50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-dark-800 flex items-center justify-center mr-3">
                            {getTransactionIcon(tx.type)}
                          </div>
                          <span>
                            {tx.type === TransactionType.WALLET_TO_WALLET 
                              ? 'Wallet Transfer' 
                              : tx.type === TransactionType.BANK_TO_BANK 
                                ? 'Bank Transfer'
                                : 'Smart Contract'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-mono text-sm">{shortenAddress(tx.from)}</td>
                      <td className="py-4 px-4 font-mono text-sm">{shortenAddress(tx.to)}</td>
                      <td className="py-4 px-4 font-medium">
                        <span className={tx.type === TransactionType.WALLET_TO_WALLET ? 'text-error-500' : 'text-success-500'}>
                          {tx.type === TransactionType.WALLET_TO_WALLET ? '-' : '+'}{formatCurrency(tx.amount, tx.currency)}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-dark-400 text-sm">{formatTimestamp(tx.timestamp)}</td>
                      <td className="py-4 px-4">{getStatusBadge(tx.status)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};