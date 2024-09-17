import React from 'react'
import { DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';

const DashboardOrderDetails = ({order}) => {
  return (
    <div>
      <DialogContent className="w-1/2">
        <div className="flex justify-between mt-10">
          <p className="font-bold">Order ID</p>
          <label className="font-medium">{order?._id}</label>
        </div>
        <div className="flex justify-between ">
          <p className="font-bold">Order Date</p>
          <label className="font-medium">
            {order?.orderDate?.split("T")[0]}
          </label>
        </div>
        <div className="flex justify-between ">
          <p className="font-bold">Payment Status</p>
          <label className="font-medium">{order?.paymentStatus}</label>
        </div>
        <div className="flex justify-between ">
          <p className="font-bold">Payment Mode</p>
          <label className="font-medium">{order?.paymentMethod}</label>
        </div>
        <div className="flex justify-between ">
          <p className="font-bold">Order Status</p>
          <label className="font-medium">
            <Badge
              className={
                order?.orderStatus === "success" ? "bg-green-500" : "bg-black"
              }
            >
              {order?.orderStatus}
            </Badge>
          </label>
        </div>
        <div className="flex justify-between ">
          <p className="font-bold">Order Price</p>
          <label className="font-medium">${order?.totalAmount}</label>
        </div>
        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-2 font-medium">Order Details</div>
          <Separator />
          <ul className="grid gap-3">
            {order?.cartItems?.map((eachCartItem, index) => (
              <li
                key={index}
                className="flex justify-between p-0 items-center list-none"
              >
                <span className="max-w-[40%] truncate font-bold">
                  {eachCartItem?.title}
                </span>
                <span className="font-medium">${eachCartItem?.price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4">
          <Separator />
          <div className="grid gap-2 font-medium">Shipping information</div>
          <Separator />
          <div className="grid gap-0.5">
            <p>
              <span className="font-bold">Name: </span>
              {order?.address?.firstName} {order?.address?.lastName}
            </p>
            <p>
              <span className="font-bold">Address: </span>
              {order?.address?.city},{order?.address?.address}
            </p>
            <p>
              <span className="font-bold">Pincode: </span>
              {order?.address?.pincode}
            </p>
            <p>
              <span className="font-bold">Phone: </span>
              {order?.address?.phone}
            </p>
            <p>
              <span className="font-bold">Description: </span>
              {order?.address?.description}
            </p>
          </div>
        </div>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogContent>
    </div>
  );
}

export default DashboardOrderDetails