import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout({ theme, setTheme }) {
  return (
    <div>
      <Navbar theme={theme} setTheme={setTheme} />
      <div style={{ padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
}

