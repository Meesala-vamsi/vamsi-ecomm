import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="flex justify-center bg-gradient-to-r min-h-screen  md:px-44 md:py-28 from-[#3a6ea5] to-[#8ecae6] border border-blue-500">
      <div className="flex justify-center items-center md:grid md:grid-cols-4 md:border md:border-blue-400 md:w-[100%] lg:w-[80%]">
        <div className="col-span-2 h-full overflow-hidden hidden md:block">
          <img
            src="https://res.cloudinary.com/db0f83m76/image/upload/v1726582126/login_banner_qmuogp.png"
            alt=""
            className="w-full h-full"
          />
        </div>
        <main className="bg-white md:h-full col-span-2 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout