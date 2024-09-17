import { Link, Outlet, useLocation } from 'react-router-dom'
import Header from './header'
import Sidebar from './sidebar';
import { LuHome } from "react-icons/lu";
import { FaMale } from "react-icons/fa";
import { FaFemale } from "react-icons/fa";
import { LuFootprints } from "react-icons/lu";
import { SiSmartthings } from "react-icons/si";
import { TbMoodKidFilled } from "react-icons/tb";
import { AiFillProduct } from "react-icons/ai";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getProducts } from '@/store/dashboardSlice';




const DashboardLayout = () => {
  const location = useLocation();
  const [openSidebar,setOpenSidebar] = useState(false)
  const sidebarItems = [
    {
      id: "products",
      label: "Products",
      path: "/dashboard/products",
      icon: (
        <AiFillProduct
          className={
            location.pathname !== "/dashboard/products"
              ? "lg:hidden"
              : "text-xl block"
          }
        />
      ),
    },
    {
      id: "men",
      label: "Men",
      path: "/dashboard/products",
      icon: (
        <FaMale
          className={
            location.pathname !== "/dashboard/products"
              ? "lg:hidden"
              : "text-xl block"
          }
        />
      ),
    },
    {
      id: "women",
      label: "Women",
      path: "/dashboard/products",
      icon: (
        <FaFemale
          className={
            location.pathname !== "/dashboard/products"
              ? "lg:hidden"
              : "text-xl block"
          }
        />
      ),
    },
    {
      id: "kids",
      label: "Kids",
      path: "/dashboard/products",
      icon: (
        <TbMoodKidFilled
          className={
            location.pathname !== "/dashboard/products"
              ? "lg:hidden"
              : "text-xl block"
          }
        />
      ),
    },
    {
      id: "accessories",
      label: "Accessories",
      path: "/dashboard/products",
      icon: (
        <SiSmartthings
          className={
            location.pathname !== "/dashboard/products"
              ? "lg:hidden"
              : "text-xl block"
          }
        />
      ),
    },
    {
      id: "footwear",
      label: "Footwear",
      path: "/dashboard/products",
      icon: (
        <LuFootprints
          className={
            location.pathname !== "/dashboard/products"
              ? "lg:hidden"
              : "text-xl block"
          }
        />
      ),
    },
  ];

  const [getCategory,setCategory] = useState(null)
  const dispatch = useDispatch()

  const onClickSidebar = (category)=>{
    if(category){
    dispatch(getProducts({category}))
    setOpenSidebar(false)
    }
  }

  const displaySidebarItems = () => {
    return (
      <div
        className={
          location.pathname !== "/dashboard/products"
            ? "flex flex-col lg:flex-row"
            : "flex flex-col gap-2 lg:gap-4"
        }
      >
        <Link
          to="/dashboard/home"
          className="text-black flex items-center gap-3 hover:bg-muted py-3 px-2 text-md rounded-md hover:text-black"
        >
          <LuHome
            className={
              location.pathname !== "/dashboard/products"
                ? "lg:hidden"
                : "text-xl block"
            }
          />
          <p>Home</p>
        </Link>
        {sidebarItems.map((eachItem) => (
          <Link
            to={`${eachItem.path}`}
            key={eachItem.id}
            className="text-black flex items-center gap-3 hover:bg-muted py-3 px-2 text-md rounded-md hover:text-black"
            onClick={() => onClickSidebar(eachItem.id)}
          >
            {eachItem.icon}
            {eachItem.label}
          </Link>
        ))}
      </div>
    );
  };
  return (
    <div className="h-screen flex">
      <div
        className={`${
          location.pathname !== "/dashboard/products" ? "hidden" : "block"
        } h-screen overflow-y-auto`}
      >
        <Sidebar
          sidebarItems={sidebarItems}
          displaySidebarItems={displaySidebarItems}
        />
      </div>
      <div className="flex-1 flex flex-col">
        <Header
          sidebarItems={sidebarItems}
          displaySidebarItems={displaySidebarItems}
          setOpenSidebar={setOpenSidebar}
          openSidebar={openSidebar}
        />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout