import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { IoIosMenu } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { RiAccountPinCircleLine } from "react-icons/ri";
import { BsCart3 } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { HiOutlineLogout } from "react-icons/hi";
import { logoutUser } from "@/store/authSlice";
import { toast } from "react-toastify";
import { IoSearch } from "react-icons/io5";
import { useEffect, useState } from "react";
import { searchProducts } from "@/store/dashboardSlice";
import CartSlide from "./cartSlide";
import { fetchAllCartItems } from "@/store/cartSlice";



const Header = ({ displaySidebarItems, setOpenSidebar, openSidebar }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartList } = useSelector((state) => state.cartProducts);
  const [searchValue, setSearchValue] = useState("");
  const [openCart, setOpenCart] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onClickSearch = () => {
    dispatch(searchProducts(searchValue)).then((response) => {
      if (response.payload.status === "success") {
      } else {
        toast.error(response.payload.message);
      }
    });
  };

  useEffect(() => {
    if (searchValue === "") {
      onClickSearch();
    }
  }, [searchValue]);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchAllCartItems({ id: user?.id }));
    }
  }, [dispatch]);

  const headerRightContent = () => (
    <div className="">
      <div className="flex flex-col gap-4 mt-3 justify-center lg:items-center lg:mt-0 lg:flex-row">
        <Sheet open={openCart} onOpenChange={setOpenCart}>
          <BsCart3
            className="text-2xl font-extrabold cursor-pointer"
            onClick={() => setOpenCart(true)}
          />
          <CartSlide
            cartList={cartList?.items?.length > 0 ? cartList?.items : null}
            setOpenCart={setOpenCart}
          />
        </Sheet>
        <DropdownMenu className="">
          <DropdownMenuTrigger className="border-0 w-10 p-0 rounded-full bg-background cursor-pointer">
            <Avatar className="w-full">
              <AvatarFallback className="bg-black text-white flex justify-center items-center">
                {user?.username[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" className="w-60">
            <DropdownMenuLabel>Welcome {user?.username}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="flex items-center gap-2 font-bold cursor-pointer"
              onClick={() => navigate("/dashboard/account")}
            >
              <RiAccountPinCircleLine className="text-2xl" />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex items-center gap-2 font-bold cursor-pointer"
              onClick={onClickLogout}
            >
              <HiOutlineLogout className="text-2xl" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );

  const onClickLogout = () => {
    dispatch(logoutUser()).then((response) => {
      if (response?.data?.status === "success") {
        toast.success(response?.data?.message);
      } else {
        toast.success(response?.data?.message);
      }
    });
  };

  return (
    <header className="sticky flex justify-between items-center top-0 px-2 border-b h-16 md:px-4 bg-background z-50">
      <Link
        to="/dashboard/home"
        className="flex items-center gap-2 cursor-pointer text-black hover:text-black"
      >
        <FaHome className="text-2xl" />
        <span className="font-bold text-xl">Ecommerce</span>
      </Link>
      <Sheet open={openSidebar} onOpenChange={setOpenSidebar}>
        <SheetTrigger className="lg:hidden" asChild>
          <IoIosMenu className="text-2xl cursor-pointer" />
        </SheetTrigger>
        <SheetContent side="left">
          <div className="lg:hidden">{displaySidebarItems()}</div>
          <div className="lg:hidden ">{headerRightContent()}</div>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetContent>
      </Sheet>
      <div
        className={
          location.pathname !== "/dashboard/products"
            ? "hidden lg:block"
            : "items-center gap-3 hidden"
        }
      >
        {displaySidebarItems()}
      </div>
      <div className="hidden lg:flex items-center w-80 border-2 rounded-full pl-2 border-black ">
        <input
          type="search"
          className="h-9 w-full border-0 focus:outline-none rounded-full"
          placeholder="Search...."
          onChange={onChangeSearchInput}
          value={searchValue}
        />
        <div
          className="bg-black flex justify-center p-2 rounded-tr-2xl w-12 rounded-br-2xl cursor-pointer"
          onClick={onClickSearch}
        >
          <IoSearch className="text-xl text-white" />
        </div>
      </div>
      <div className="hidden lg:block">{headerRightContent()}</div>
    </header>
  );
};

export default Header;
