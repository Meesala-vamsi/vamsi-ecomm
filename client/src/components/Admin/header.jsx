import { GiHamburgerMenu } from "react-icons/gi";
import { TbLogout } from "react-icons/tb";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser, resetTokenAndCredentials } from "@/store/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Header = ({setOpen}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClickLogout=()=>{
    // dispatch(logoutUser())
    // .then((response)=>{
    //   console.log(response)
    //   if(response?.data?.status==="success"){
    //     toast.success(response?.data?.message)
    //   }else{
    //     toast.success(response?.data?.message);
    //   }
    // })

    dispatch(resetTokenAndCredentials());
    sessionStorage.clear();
    navigate("/auth/login");
    toast.success("Logged out successfully.");
  }
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b">
      <Button className="sm:block lg:hidden" onClick={()=>setOpen(true)}>
        <GiHamburgerMenu className=" text-white text-2xl " />
      </Button>
      <div className="flex flex-1 justify-end">
        <Button className=" gap-2 inline-flex text-sm font-medium" onClick={onClickLogout}>
          <TbLogout className="text-2xl sm:text" />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header;
