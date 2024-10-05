import React, {useContext} from 'react';
import { MdSearch, MdNotifications, MdAccountCircle } from 'react-icons/md';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SidebarContext } from '../sidebar/SidebarItem';
const Navbar = ({ userData }) => {

  const { expanded, setExpanded } = useContext(SidebarContext);


  return (
    <nav className="flex items-center justify-between bg-white shadow-sm pt-4 pb-4 pl-2 fixed w-full top-0 z-10">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left side of the navbar */}
        <div className="flex items-center">

          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 rounded-md px-3 py-2 mr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <MdSearch className="text-gray-500" size={20} />
        </div>
        {/* Right side of the navbar */}
        <div className="flex items-center">
          <div className="relative mr-4">
            <MdNotifications className="text-gray-500" size={24} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <div className="flex items-center">
            <MdAccountCircle className="text-gray-500" size={24} />
            <span className="ml-2">{userData?.username}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
