import { MdAdminPanelSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { RiDashboardFill } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FaCartArrowDown } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

const sidebarItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dash",
    icon: <RiDashboardFill className="text-lg hover:font-bold" />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: (
      <MdOutlineProductionQuantityLimits className="hover:font-bold text-lg" />
    ),
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <FaCartArrowDown className="text-lg hover:font-bold" />,
  },
];

const Sidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col gap-3">
            <SheetHeader className="flex flex-col h-full">
              <SheetTitle>
                <div
                  className="flex gap-3 items-center cursor-pointer"
                  onClick={() => navigate("/admin/dash")}
                >
                  <MdAdminPanelSettings className="text-xl" />
                  <h1 className="font-extrabold text-lg">Admin Panel</h1>
                </div>
              </SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <div className="mt-6">
                  {sidebarItems.map((eachItem) => (
                    <div
                      key={eachItem.id}
                      className="flex gap-3 items-center px-3 py-2 rounded-md mb-4 hover:bg-muted hover:text-foreground"
                      onClick={() => {
                        navigate(eachItem.path)
                        setOpen?setOpen(false):null
                      }}
                    >
                      {eachItem.icon}
                      <span className="font-normal cursor-pointer hover:font-bold transition-transform duration-700 ease-in-out">
                        {eachItem.label}
                      </span>
                    </div>
                  ))}
                </div>
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden flex-col w-64 border-r px-6 py-7 lg:flex">
        <div
          className="flex gap-3 items-center cursor-pointer"
          onClick={() => navigate("/admin/dash")}
        >
          <MdAdminPanelSettings className="text-3xl" />
          <h1 className="font-extrabold text-xl">Admin Panel</h1>
        </div>
        <div className="mt-6">
          {sidebarItems.map((eachItem) => (
            <div
              key={eachItem.id}
              className="flex gap-3 items-center px-3 py-2 rounded-md mb-4 hover:bg-muted hover:text-foreground"
              onClick={() => navigate(eachItem.path)}
            >
              {eachItem.icon}
              <span className="font-normal cursor-pointer hover:font-bold transition-transform duration-700 ease-in-out">
                {eachItem.label}
              </span>
            </div>
          ))}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
