import { ethers } from 'ethers';

export const shortenAddress = (address: string, chars = 4): string => {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`;
};

export const formatBalance = (balance: string, decimals = 4): string => {
  return parseFloat(balance).toFixed(decimals);
};

export const formatTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

export const formatCurrency = (amount: string, currency = 'ETH'): string => {
  return `${formatBalance(amount)} ${currency}`;
};

export const parseEther = (value: string): string => {
  try {
    return ethers.utils.parseEther(value).toString();
  } catch (error) {
    return '0';
  }
};