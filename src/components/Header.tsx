import React from 'react';
import { CheckSquare } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white bg-opacity-90 backdrop-blur-md shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center">
          <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-2 rounded-xl">
              <CheckSquare className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                タスク管理アプリ
              </h1>
              <p className="text-sm text-gray-500">シンプルで使いやすいタスク管理ツール</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;