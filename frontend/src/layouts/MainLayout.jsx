import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
