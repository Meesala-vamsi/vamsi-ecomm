import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import banner1 from "../../assets/home-banner.webp";
import Address from "@/components/Shopping/address";
import DashboardOrders from "./orders";
const Account = () => {
  return (
    <div>
      <img src={banner1} alt="banner-image" className="w-full lg:h-[500px]" />
      <div className="px-6 py-4 mt-3">
        <div className="px-7 py-6 shadow-lg rounded-md">
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
