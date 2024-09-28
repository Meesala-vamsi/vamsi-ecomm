import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import banner1 from "../../assets/home-banner.webp";
import Address from "@/components/Shopping/address";
import DashboardOrders from "./orders";
const Account = () => {
  return (
    <div>
      <div className="overflow-hidden">
        <img
          src="https://res.cloudinary.com/db0f83m76/image/upload/v1726667562/account_page_image_f9x6bx.webp"
          alt="banner-image"
          className="w-full lg:h-[500px] scale-150"
        />
      </div>
      <div className="lg:px-6 lg:py-4 sm:border-0  mt-3">
        <div className="lg:px-7 lg:py-6 shadow-lg rounded-md">
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <DashboardOrders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Account;
