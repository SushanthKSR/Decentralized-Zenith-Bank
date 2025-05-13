import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight, Copy, QrCode, Ban as Bank, Wallet } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';
import { sendTransaction } from '../utils/web3';
import { TransactionType, TransactionStatus } from '../types/Transaction';

export const Transfer: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'send';
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  
  const { address, addTransaction } = useWallet();
  
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  
  const handleSend = async () => {
    if (!recipient || !amount) {
      setStatus('Please fill in all required fields');
      return;
    }
    
    setIsProcessing(true);
    setStatus('Processing transaction...');
    
    try {
      const tx = await sendTransaction(recipient, amount, description);
      
      if (tx) {
        addTransaction(tx);
        setStatus('Transaction sent successfully!');
        setRecipient('');
        setAmount('');
        setDescription('');
      } else {
        setStatus('Transaction failed. Please try again.');
      }
    } catch (error) {
      console.error('Error sending transaction:', error);
      setStatus('Transaction failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setStatus('Address copied to clipboard!');
      setTimeout(() => setStatus(''), 3000);
    }
  };
  
  const handleBankTransfer = () => {
    if (!recipient || !amount) {
      setStatus('Please fill in all required fields');
      return;
    }
    
    setIsProcessing(true);
    setStatus('Processing bank transfer...');
    
    // Simulate bank transfer
    setTimeout(() => {
      const transaction = {
        id: `tx-${Date.now()}`,
        type: TransactionType.BANK_TO_BANK,
        from: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7', // Bank address
        to: recipient,
        amount,
        currency: 'ETH',
        timestamp: Date.now(),
        status: TransactionStatus.CONFIRMED,
        description,
      };
      
      addTransaction(transaction);
      setStatus('Bank transfer completed successfully!');
      setRecipient('');
      setAmount('');
      setDescription('');
      setIsProcessing(false);
    }, 2000);
  };
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'send':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="recipient" className="block text-sm font-medium text-dark-300 mb-2">
                Recipient Address
              </label>
              <input
                id="recipient"
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                className="input"
                disabled={isProcessing}
              />
            </div>
            
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-dark-300 mb-2">
                Amount (ETH)
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                step="0.001"
                min="0"
                className="input"
                disabled={isProcessing}
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-dark-300 mb-2">
                Description (Optional)
              </label>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's this payment for?"
                className="input"
                disabled={isProcessing}
              />
            </div>
            
            {status && (
              <div className={`p-3 rounded-lg ${status.includes('successfully') ? 'bg-success-500/20 text-success-500' : status.includes('Processing') ? 'bg-primary-500/20 text-primary-500' : 'bg-error-500/20 text-error-500'}`}>
                {status}
              </div>
            )}
            
            <button
              onClick={handleSend}
              disabled={isProcessing}
              className="btn btn-primary w-full py-3"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <ArrowRight size={20} className="mr-2" />
                  Send Transaction
                </div>
              )}
            </button>
          </motion.div>
        );
        
      case 'receive':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-6"
          >
            <div className="bg-dark-800 rounded-xl p-6 inline-block mx-auto">
              <QrCode size={200} className="text-dark-300" />
            </div>
            
            <div>
              <p className="text-sm text-dark-400 mb-2">Your Wallet Address</p>
              <div className="bg-dark-800 rounded-lg p-3 flex items-center justify-between">
                <p className="text-sm font-mono truncate">{address}</p>
                <button
                  onClick={handleCopyAddress}
                  className="btn btn-ghost p-2"
                >
                  <Copy size={16} />
                </button>
              </div>
            </div>
            
            {status && (
              <div className="bg-success-500/20 text-success-500 p-3 rounded-lg">
                {status}
              </div>
            )}
            
            <div className="mt-4 text-dark-400">
              <p>Share this address to receive funds from other wallets</p>
            </div>
          </motion.div>
        );
        
      case 'bank':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-warning-500/20 text-warning-500 p-4 rounded-lg mb-6">
              <p className="text-sm">
                Bank transfers are simulated for this demo. In a real application, this would connect to a banking API.
              </p>
            </div>
            
            <div>
              <label htmlFor="bank-recipient" className="block text-sm font-medium text-dark-300 mb-2">
                Recipient Wallet Address
              </label>
              <input
                id="bank-recipient"
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x..."
                className="input"
                disabled={isProcessing}
              />
            </div>
            
            <div>
              <label htmlFor="bank-amount" className="block text-sm font-medium text-dark-300 mb-2">
                Amount (ETH)
              </label>
              <input
                id="bank-amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                step="0.001"
                min="0"
                className="input"
                disabled={isProcessing}
              />
            </div>
            
            <div>
              <label htmlFor="bank-description" className="block text-sm font-medium text-dark-300 mb-2">
                Description (Optional)
              </label>
              <input
                id="bank-description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What's this payment for?"
                className="input"
                disabled={isProcessing}
              />
            </div>
            
            {status && (
              <div className={`p-3 rounded-lg ${status.includes('successfully') ? 'bg-success-500/20 text-success-500' : status.includes('Processing') ? 'bg-primary-500/20 text-primary-500' : 'bg-error-500/20 text-error-500'}`}>
                {status}
              </div>
            )}
            
            <button
              onClick={handleBankTransfer}
              disabled={isProcessing}
              className="btn btn-primary w-full py-3"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Bank size={20} className="mr-2" />
                  Complete Bank Transfer
                </div>
              )}
            </button>
          </motion.div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="container mx-auto">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-6">Transfer</h1>
        
        <div className="bg-dark-800 rounded-lg mb-6">
          <div className="grid grid-cols-3 border-b border-dark-700">
            <button
              className={`py-4 text-center font-medium transition-colors ${activeTab === 'send' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-dark-300 hover:text-dark-100'}`}
              onClick={() => setActiveTab('send')}
            >
              <div className="flex items-center justify-center">
                <ArrowRight size={16} className="mr-2" />
                Send
              </div>
            </button>
            <button
              className={`py-4 text-center font-medium transition-colors ${activeTab === 'receive' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-dark-300 hover:text-dark-100'}`}
              onClick={() => setActiveTab('receive')}
            >
              <div className="flex items-center justify-center">
                <Wallet size={16} className="mr-2" />
                Receive
              </div>
            </button>
            <button
              className={`py-4 text-center font-medium transition-colors ${activeTab === 'bank' ? 'text-primary-500 border-b-2 border-primary-500' : 'text-dark-300 hover:text-dark-100'}`}
              onClick={() => setActiveTab('bank')}
            >
              <div className="flex items-center justify-center">
                <Bank size={16} className="mr-2" />
                Bank
              </div>
            </button>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="card">
              <h2 className="text-xl font-semibold mb-6">
                {activeTab === 'send' ? 'Send Funds' : activeTab === 'receive' ? 'Receive Funds' : 'Bank Transfer'}
              </h2>
              
              {renderTabContent()}
            </div>
          </div>
          
          <div>
            <div className="card">
              <h3 className="font-semibold mb-4">Transfer Tips</h3>
              <ul className="space-y-4 text-dark-300">
                <li className="flex">
                  <span className="h-6 w-6 rounded-full bg-primary-900 text-primary-500 flex items-center justify-center mr-3 flex-shrink-0">1</span>
                  <p className="text-sm">Always double-check the recipient address before sending.</p>
                </li>
                <li className="flex">
                  <span className="h-6 w-6 rounded-full bg-primary-900 text-primary-500 flex items-center justify-center mr-3 flex-shrink-0">2</span>
                  <p className="text-sm">Transaction fees are paid in ETH and vary based on network congestion.</p>
                </li>
                <li className="flex">
                  <span className="h-6 w-6 rounded-full bg-primary-900 text-primary-500 flex items-center justify-center mr-3 flex-shrink-0">3</span>
                  <p className="text-sm">Bank transfers may take longer to process than direct wallet transfers.</p>
                </li>
                <li className="flex">
                  <span className="h-6 w-6 rounded-full bg-primary-900 text-primary-500 flex items-center justify-center mr-3 flex-shrink-0">4</span>
                  <p className="text-sm">You can view your transaction history in the Transactions tab.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};