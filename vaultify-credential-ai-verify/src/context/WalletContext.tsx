
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface WalletContextType {
  connected: boolean;
  publicKey: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('use Wallet must be used within a WalletProvider');
  }
  return context;
};

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);

  const connectWallet = async () => {
    try {
      if ('solana' in window) {
        const solana = (window as any).solana;
        if (solana.isPhantom) {
          const response = await solana.connect();
          setPublicKey(response.publicKey.toString());
          setConnected(true);
          toast({
            title: "Wallet Connected",
            description: "Successfully connected to  wallet",
          });
        }
      } else {
        toast({
          title: " Wallet Not Found! download the wallet",
          description: "Please Install The wallet",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to wallet",
        variant: "destructive",
      });
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setPublicKey(null);
    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected from wallet",
    });
  };

  useEffect(() => {
    if ('solana' in window) {
      const solana = (window as any).solana;
      if (solana.isPhantom && solana.isConnected) {
        setConnected(true);
        setPublicKey(solana.publicKey?.toString() || null);
      }
    }
  }, []);

  return (
    <WalletContext.Provider value={{ connected, publicKey, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
