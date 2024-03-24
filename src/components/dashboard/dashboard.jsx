import React, { useState, useEffect } from 'react';
import { MdDashboard, MdEqualizer, MdPeople, MdViewModule, MdShoppingBasket, MdReceipt, MdSettings, MdHelp } from 'react-icons/md';
import Sidebar from './sidebar/Sidebar';
import SidebarItem, { SidebarContext } from './sidebar/SidebarItem';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Dashboard = () => {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { username, email } = decodedToken;
        setUserData({ username, email });
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    } else {
      navigate('/');
    }
  }, [navigate]);


  return (
    <div className="flex">
      <SidebarContext.Provider value={{ expanded, setExpanded }}>
        <Sidebar>
          <SidebarItem icon={<MdDashboard size={20} />} text="Dashboard" alert />
          <SidebarItem icon={<MdEqualizer size={20} />} text="Statistics" active />
          <SidebarItem icon={<MdPeople size={20} />} text="Users" />
          <SidebarItem icon={<MdViewModule size={20} />} text="Inventory" />
          <SidebarItem icon={<MdShoppingBasket size={20} />} text="Orders" alert />
          <SidebarItem icon={<MdReceipt size={20} />} text="Billings" />
          <hr className="my-3" />
          <SidebarItem icon={<MdSettings size={20} />} text="Settings" />
          <SidebarItem icon={<MdHelp size={20} />} text="Help" />
        </Sidebar>
      </SidebarContext.Provider>
      <main className="App flex-1 p-4">
        <h1> Hello, {userData?.username} </h1>
      </main>
    </div>
  );
};

export default Dashboard;