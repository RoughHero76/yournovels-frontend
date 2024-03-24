import React, { useContext, useState } from 'react';
import { LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { SidebarContext } from './SidebarItem';

const Sidebar = ({ children }) => {
  const { expanded, setExpanded } = useContext(SidebarContext);
  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`overflow-hidden transition-all ${expanded ? 'w-32' : 'w-0'}`}
            alt=""
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronLeft /> : <ChevronRight />}
          </button>
        </div>
        <ul className="flex-1 px-3">{children}</ul>
        <div
          className="border-t flex items-center p-3 hover:bg-gray-100"
          onClick={handleLogout}
          style={{ cursor: 'pointer' }}
        >
          <LogOut size={24} />
          {expanded && <span className="ml-3">Logout</span>}
         
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;