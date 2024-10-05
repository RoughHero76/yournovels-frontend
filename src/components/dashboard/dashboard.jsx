import React, { useState, useEffect } from 'react';
import { MdDashboard, MdMenuBook, MdMode, MdPerson, MdSettings, MdHelp } from 'react-icons/md';
import Sidebar from './sidebar/Sidebar';
import SidebarItem, { SidebarContext } from './sidebar/SidebarItem';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import NavBar from './navBar/Navbar'

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
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      
      <div className="flex">
        <Sidebar>
          <SidebarItem icon={<MdDashboard size={20} />} text="Dashboard" alert />
          <SidebarItem icon={<MdMenuBook size={20} />} text="Read" active />
          <SidebarItem icon={<MdMode size={20} />} text="Write" />
          <SidebarItem icon={<MdPerson size={20} />} text="Profile" />
          <hr className="my-3" />
          <SidebarItem icon={<MdSettings size={20} />} text="Settings" />
          <SidebarItem icon={<MdHelp size={20} />} text="Help" />
        </Sidebar>
        

        <main className="App flex-1">
        <NavBar userData={userData} />
          <h1> Hello, {userData?.username} </h1>
        </main>
      </div>
    </SidebarContext.Provider>
  );
};

export default Dashboard;

