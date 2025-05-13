import { ethers } from 'ethers';
import { Transaction, TransactionStatus, TransactionType } from '../types/Transaction';

export const getProvider = (): ethers.providers.Web3Provider | null => {
  try {
    const { ethereum } = window as any;
    if (ethereum) {
      return new ethers.providers.Web3Provider(ethereum);
    }
    return null;
  } catch (error) {
    console.error('Error getting provider:', error);
    return null;
  }
};

export const getSigner = (): ethers.providers.JsonRpcSigner | null => {
  const provider = getProvider();
  if (provider) {
    return provider.getSigner();
  }
  return null;
};

export const sendTransaction = async (
  to: string,
  amount: string,
  description: string = '',
): Promise<Transaction | null> => {
  try {
    const signer = getSigner();
    if (!signer) throw new Error('No signer available');
    
    const tx = await signer.sendTransaction({
      to,
      value: ethers.utils.parseEther(amount),
    });
    
    const address = await signer.getAddress();
    
    const transaction: Transaction = {
      id: `tx-${Date.now()}`,
      type: TransactionType.WALLET_TO_WALLET,
      from: address,
      to,
      amount,
      currency: 'ETH',
      timestamp: Date.now(),
      status: TransactionStatus.PENDING,
      hash: tx.hash,
      description,
    };
    
    // Wait for transaction confirmation
    await tx.wait();
    
    // Update transaction status
    transaction.status = TransactionStatus.CONFIRMED;
    
    return transaction;
  } catch (error) {
    console.error('Error sending transaction:', error);
    return null;
  }
};

export const getNetworkName = (chainId: number | null): string => {
  if (!chainId) return 'Unknown Network';
  
  switch (chainId) {
    case 1:
      return 'Ethereum Mainnet';
    case 3:
      return 'Ropsten Testnet';
    case 4:
      return 'Rinkeby Testnet';
    case 5:
      return 'Goerli Testnet';
    case 42:
      return 'Kovan Testnet';
    case 56:
      return 'Binance Smart Chain';
    case 137:
      return 'Polygon Mainnet';
    case 80001:
      return 'Polygon Mumbai';
    default:
      return `Chain ID: ${chainId}`;
  }
};