export enum TransactionType {
  WALLET_TO_WALLET = 'WALLET_TO_WALLET',
  BANK_TO_BANK = 'BANK_TO_BANK',
  SMART_CONTRACT = 'SMART_CONTRACT',
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  FAILED = 'FAILED',
}

export interface Transaction {
  id: string;
  type: TransactionType;
  from: string;
  to: string;
  amount: string;
  currency: string;
  timestamp: number;
  status: TransactionStatus;
  hash?: string;
  description?: string;
}