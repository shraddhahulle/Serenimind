
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import MiniPlayer from './MiniPlayer';
import { useMeditation } from '../contexts/MeditationContext';

const Layout: React.FC = () => {
  const { isPlaying } = useMeditation();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      <main className="flex-1 container mx-auto px-4 py-4 max-w-6xl">
        <Outlet />
      </main>
      {isPlaying && <MiniPlayer />}
    </div>
  );
};

export default Layout;
