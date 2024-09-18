import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "@/store/authSlice";
import { toast } from "react-toastify";
const Login = () => {
  const [loginData,setLoginData] = useState({
    email:"",
    password:""
  })

  const dispatch = useDispatch()

  const onChangeInput = (event)=>{
    const {id,value} = event.target

    setLoginData({
      ...loginData,
      [id]:value
    })
  }

  const onSubmitLoginData = (event)=>{
    event.preventDefault()
    dispatch(loginUser(loginData)).then((response)=>{
      console.log(response);
      if(response?.payload?.status==="success"){
        toast.success(response?.payload?.message)
        
      }else{
        toast.error(response?.payload?.message)
      }
    })
  }

  return (
    <div className="px-6 py-5 rounded-sm md:px-12 md:py-20">
      <h2 className="text-xl md:text-3xl font-extrabold text-[#004e89]">
        Welcome to Ecommerce
      </h2>
      <p className="text-lg md:text-2xl text-[#00a6fb] italic">
        Shop Smarter Today
      </p>
      <form action="" onSubmit={onSubmitLoginData}>
        <div className="flex items-center border border-blue-300 h-10 my-5">
          <MdOutlineEmail className="text-2xl mx-3" />
          <Input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            value={loginData.email}
            className=" bg-white w-full h-full border-0"
            onChange={onChangeInput}
          />
        </div>
        <div className="flex items-center border border-blue-300 h-10">
          <CiLock className="text-2xl mx-3" />
          <Input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={loginData.password}
            className="h-full w-full border-0"
            onChange={onChangeInput}
          />
        </div>
        <div className="my-4 flex gap-1 md:gap-3">
          <p className="text-xs md:text-lg">Dont have an account? </p>
          <Link to="/auth/register" className="text-xs md:text-xl">
            Create Account
          </Link>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="my-2 py-1 rounded-none md:my-6 bg-black text-white"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login