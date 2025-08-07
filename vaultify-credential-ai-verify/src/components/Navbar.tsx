
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useWallet } from '../context/WalletContext';
import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  const { connected, publicKey, connectWallet, disconnectWallet } = useWallet();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const formatPublicKey = (key: string) => {
    return `${key.slice(0, 4)}...${key.slice(-4)}`;
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Vaultify
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant={isActive('/') ? "default" : "ghost"}
                className="font-medium"
              >
                Home
              </Button>
            </Link>
            <Link to="/user">
              <Button 
                variant={isActive('/user') ? "default" : "ghost"}
                className="font-medium"
              >
                Student Panel
              </Button>
            </Link>
            <Link to="/company">
              <Button 
                variant={isActive('/company') ? "default" : "ghost"}
                className="font-medium"
              >
                Company Panel
              </Button>
            </Link>

            {connected ? (
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  {formatPublicKey(publicKey!)}
                </Badge>
                <Button onClick={disconnectWallet} variant="outline" size="sm">
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button onClick={connectWallet} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
