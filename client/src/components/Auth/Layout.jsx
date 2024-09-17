import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="flex justify-center bg-gradient-to-r min-h-screen  lg:px-44 lg:py-28 from-[#3a6ea5] to-[#8ecae6] border border-blue-500">
      <div className="md:grid md:grid-cols-4 border w-[80%]">
        <div className="col-span-2 h-full  overflow-hidden">
          <img
            src="https://res.cloudinary.com/db0f83m76/image/upload/v1726297619/signup_banner_s3igt0.webp"
            alt=""
            className=" w-full h-full "
          />
        </div>
        <main className="bg-white col-span-2 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout