import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import { Transaction } from '../types/Transaction';

interface WalletContextType {
  address: string | null;
  balance: string;
  chainId: number | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
  isLoading: boolean;
}

const defaultContext: WalletContextType = {
  address: null,
  balance: '0',
  chainId: null,
  isConnected: false,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  transactions: [],
  addTransaction: () => {},
  isLoading: false,
};

export const WalletContext = createContext<WalletContextType>(defaultContext);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Check if MetaMask is installed
  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window as any;
      
      if (!ethereum) {
        console.log('Make sure you have MetaMask installed!');
        return;
      }
      
      // Check if we're authorized to access the user's wallet
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      
      if (accounts.length !== 0) {
        const account = accounts[0];
        setAddress(account);
        setIsConnected(true);
        
        // Get chain ID
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        setChainId(parseInt(chainId, 16));
        
        // Get balance
        await updateBalance(account);
        
        // Load transactions from localStorage
        const storedTransactions = localStorage.getItem('transactions');
        if (storedTransactions) {
          setTransactions(JSON.parse(storedTransactions));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateBalance = async (account: string) => {
    try {
      const { ethereum } = window as any;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const balance = await provider.getBalance(account);
        setBalance(ethers.utils.formatEther(balance));
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const connectWallet = async () => {
    try {
      setIsLoading(true);
      const { ethereum } = window as any;
      
      if (!ethereum) {
        alert('Please install MetaMask to use this app!');
        return;
      }
      
      // Request account access
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      
      if (accounts.length !== 0) {
        setAddress(accounts[0]);
        setIsConnected(true);
        
        // Get chain ID
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        setChainId(parseInt(chainId, 16));
        
        // Get balance
        await updateBalance(accounts[0]);
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setBalance('0');
    setChainId(null);
    setIsConnected(false);
  };

  const addTransaction = (transaction: Transaction) => {
    const updatedTransactions = [transaction, ...transactions];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    
    // Listen for account changes
    const { ethereum } = window as any;
    if (ethereum) {
      ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAddress(accounts[0]);
          updateBalance(accounts[0]);
        } else {
          disconnectWallet();
        }
      });
      
      ethereum.on('chainChanged', (chainId: string) => {
        setChainId(parseInt(chainId, 16));
        if (address) {
          updateBalance(address);
        }
      });
    }
    
    return () => {
      if (ethereum) {
        ethereum.removeAllListeners();
      }
    };
  }, []);

  return (
    <WalletContext.Provider
      value={{
        address,
        balance,
        chainId,
        isConnected,
        connectWallet,
        disconnectWallet,
        transactions,
        addTransaction,
        isLoading,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};