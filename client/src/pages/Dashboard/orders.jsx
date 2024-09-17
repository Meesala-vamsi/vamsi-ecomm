import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import DashboardOrderDetails from '@/components/Shopping/dashboardOrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUserOrders, getOrderDetails, resetOrderDetails } from '@/store/orderSlice';
import { Badge } from '@/components/ui/badge';

const DashboardOrders = () => {
  const [openOrderDetailsDialog,setOpenOrderDetailsDialog] = useState(false)
  const {user} = useSelector(state=>state.auth);
  const {ordersList,orderDetails} = useSelector(state=>state.orders)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(getAllUserOrders({userId:user?.id}))
  },[dispatch])

  useEffect(()=>{
    if(orderDetails!==null){
      setOpenOrderDetailsDialog(true)
    }
  },[orderDetails])
 
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="lg:px-3">Your Orders</CardTitle>
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
              {ordersList?.map((eachOrder, index) => (
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
                      onOpenChange={()=>{
                        setOpenOrderDetailsDialog(false);
                        dispatch(resetOrderDetails())
                      }}
                    >
                      <Button onClick={() => {
                        setOpenOrderDetailsDialog(true);
                        dispatch(getOrderDetails(eachOrder?._id))
                      }}>
                        View details
                      </Button>
                      <DashboardOrderDetails order={orderDetails} />
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

export default DashboardOrders;