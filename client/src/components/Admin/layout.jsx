import { Outlet } from "react-router-dom"
import Header from "./header"
import Sidebar from "./sidebar"
import { useState } from "react"


const AdminLayout = () => {
  const [open,setOpen] = useState(false)
  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} setOpen={setOpen}/>
      <div className="flex flex-1 flex-col">
        <Header setOpen={setOpen} />
        <main className="flex flex-col flex-1 justify-start bg-muted/40 p-4 md:p-6">
          <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout