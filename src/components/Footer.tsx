import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-10 py-4 text-center text-sm text-gray-500 bg-white bg-opacity-50 backdrop-blur-sm">
      <p>© {currentYear} タスク管理アプリ</p>
    </footer>
  );
};

export default Footer;