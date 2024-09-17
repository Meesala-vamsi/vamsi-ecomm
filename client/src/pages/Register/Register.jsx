import { Input } from "@/components/ui/input";
import { CiLock } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { registerUser } from "@/store/authSlice";
import { useDispatch } from "react-redux";

const Register = () => {
  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const onChangeInput = (e) => {
    const { id, value } = e.target;
    setRegisterData({
      ...registerData,
      [id]: value,
    });
  };

  const onSubmitDetails = async (e) => {
    e.preventDefault();

    // form submission
    dispatch(registerUser(registerData))
      .then((response) => {
        if (response?.payload?.status === "success") {
          toast.success(response?.payload?.message);
          navigate("/auth/login");
          setRegisterData({
            username: "",
            email: "",
            password: "",
          });
        }else{
          toast.error(response?.payload?.message);
        }
      })
  };

  return (
    <div className="lg:px-12 lg:py-12">
      <h2 className="text-4xl font-thin leading-tight text-center">Sign up and get 20% off your first order</h2>
      <form action="" onSubmit={onSubmitDetails}>
        <div className="flex items-center border border-blue-300 h-10 my-5">
          <CgProfile className="text-2xl mx-3" />
          <Input
            type="text"
            placeholder="Username"
            value={registerData.username}
            id="username"
            name="username"
            className="bg-white w-full h-full border-0"
            onChange={onChangeInput}
          />
        </div>
        <div className="flex items-center border border-blue-300 h-10 my-5">
          <MdOutlineEmail className="text-2xl mx-3" />
          <Input
            type="email"
            placeholder="Email"
            value={registerData.email}
            id="email"
            name="email"
            className=" bg-white w-full h-full border-0"
            onChange={onChangeInput}
          />
        </div>
        <div className="flex items-center border border-blue-300 h-10">
          <CiLock className="text-2xl mx-3" />
          <Input
            type="password"
            placeholder="Password"
            value={registerData.password}
            id="password"
            name="password"
            className="h-full w-full border-0 outline-none"
            onChange={onChangeInput}
          />
        </div>
        <div className="my-4 flex gap-3">
          <p>Already have an account? </p>
          <Link to="/auth/login">Login here</Link>
        </div>
        <div className="flex justify-center">
          <button type="submit" className="my-8 bg-black text-white">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
