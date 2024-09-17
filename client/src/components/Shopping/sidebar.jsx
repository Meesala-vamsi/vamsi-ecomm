import React from 'react'
import { useLocation } from 'react-router-dom';

const Sidebar = ({ sidebarItems, displaySidebarItems }) => {
  const location = useLocation()
  return (
    <aside className="w-60 min-h-screen hidden overflow-y-scroll lg:block border-r pl-5 pt-11">
      <div className={location.pathname === "/dashboard/home"?"lg:hidden":"block"}>
        {displaySidebarItems()}
      </div>
    </aside>
  );
};

export default Sidebar