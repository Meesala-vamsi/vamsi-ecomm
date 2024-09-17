import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogDescription } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import AdminOrderDetails from "@/components/Admin/adminOrderDetails";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrderDetails, getAllOrdersByUser } from "@/store/adminOrderSlice";
import { Badge } from "@/components/ui/badge";

const AdminOrders = () => {
  const [openOrderDetailsDialog,setOpenOrderDetailsDialog] = useState(false)
  const { allOrdersList,allOrderDetails } = useSelector((state) => state.adminOrders);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getAllOrdersByUser());
  },[dispatch])

    // useEffect(() => {
    //   if (allOrderDetails !== null) {
    //     setOpenOrderDetailsDialog(true);
    //   }
    // }, [allOrderDetails]);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="px-3">All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Order Status</TableHead>
                <TableHead>Order Price</TableHead>
                <TableHead>
                  <span className="sr-only">Details</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allOrdersList.map((eachOrder, index) => (
                <TableRow key={index}>
                  <TableCell>{eachOrder?._id}</TableCell>
                  <TableCell>{eachOrder?.orderDate?.split("T")[0]}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        eachOrder?.orderStatus === "success"
                          ? "bg-green-500"
                          : "bg-black"
                      }
                    >
                      {eachOrder?.orderStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>${eachOrder?.totalAmount}</TableCell>
                  <TableCell>
                    <Dialog
                      open={openOrderDetailsDialog}
                      onOpenChange={setOpenOrderDetailsDialog}
                    >
                      <Button
                        onClick={() => {
                          setOpenOrderDetailsDialog(true);
                          dispatch(getAllOrderDetails(eachOrder?._id));
                        }}
                      >
                        View details
                      </Button>
                      <AdminOrderDetails
                        setOpenOrderDetailsDialog={setOpenOrderDetailsDialog}
                      />
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminOrders