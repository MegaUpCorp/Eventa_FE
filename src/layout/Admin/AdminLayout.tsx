import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminHeader } from 'src/components/Admin/AdminHeader';
import { AdminNav } from 'src/components/Admin/AdminNav';

export function AdminLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const toggleNav = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <AdminHeader onMenuClick={toggleMobileNav} />
      <div className="flex flex-1">
        <aside
          className={`${
            isMobileNavOpen ? 'block' : 'hidden'
          } md:block w-[200px] flex-shrink-0 ${
            isCollapsed ? 'md:w-[70px]' : 'md:w-[200px]'
          } transition-all duration-300`}
        >
          <AdminNav isCollapsed={isCollapsed} className="h-full" />
        </aside>
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
      <div className="border-t py-2 text-center text-xs">
        <p>© 2025 Eventa. All rights reserved.</p>
      </div>
    </div>
  );
}