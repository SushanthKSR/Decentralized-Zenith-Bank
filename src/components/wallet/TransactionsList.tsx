import React from 'react';
import { ArrowDown, ArrowUp, FileCode } from 'lucide-react';
import { useWallet } from '../../hooks/useWallet';
import { formatTimestamp, shortenAddress, formatCurrency } from '../../utils/formatters';
import { TransactionType, TransactionStatus } from '../../types/Transaction';

export const TransactionsList: React.FC = () => {
  const { transactions } = useWallet();
  
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
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Recent Transactions</h3>
        <button className="text-sm text-primary-500 hover:text-primary-400">
          View All
        </button>
      </div>
      
      <div className="divide-y divide-dark-800">
        {transactions.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-dark-400">No transactions yet</p>
          </div>
        ) : (
          transactions.slice(0, 5).map((tx) => (
            <div key={tx.id} className="transaction-item">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-dark-800 flex items-center justify-center mr-3">
                  {getTransactionIcon(tx.type)}
                </div>
                <div>
                  <h4 className="font-medium">
                    {tx.type === TransactionType.WALLET_TO_WALLET 
                      ? 'Transfer to ' + shortenAddress(tx.to) 
                      : tx.type === TransactionType.BANK_TO_BANK 
                        ? 'Received from ' + shortenAddress(tx.from)
                        : 'Smart Contract Interaction'}
                  </h4>
                  <p className="text-sm text-dark-400">{formatTimestamp(tx.timestamp)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-medium ${tx.type === TransactionType.WALLET_TO_WALLET ? 'text-error-500' : 'text-success-500'}`}>
                  {tx.type === TransactionType.WALLET_TO_WALLET ? '-' : '+'}{formatCurrency(tx.amount, tx.currency)}
                </p>
                {getStatusBadge(tx.status)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};