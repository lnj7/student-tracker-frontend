import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function PublicLayout({ theme, setTheme }) {
  return (
    <>
      <Navbar theme={theme} setTheme={setTheme} />
      <div style={{ padding: '20px' }}>
        <Outlet />
      </div>
    </>
  );
}
