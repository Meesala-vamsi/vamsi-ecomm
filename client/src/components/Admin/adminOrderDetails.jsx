import React, { useEffect, useState } from 'react'
import { DialogContent, DialogDescription, DialogTitle } from '../ui/dialog'
import { Separator } from '../ui/separator';
import CommonForm from '../Utils/form';
import { useDispatch, useSelector } from 'react-redux';
import { Badge } from '../ui/badge';
import { getAllOrderDetails, getAllOrdersByUser, updateOrderStatus } from '@/store/adminOrderSlice';
import { toast } from 'react-toastify';

const initialState={
  status:""
}
const AdminOrderDetails = ({setOpenOrderDetailsDialog}) => {
  const [formData,setFormData] = useState(initialState)
  const {allOrderDetails} = useSelector(state=>state.adminOrders)
  const dispatch = useDispatch()

  const handleUpdateStatus=(event)=>{
    event.preventDefault()
    dispatch(updateOrderStatus({id:allOrderDetails?._id,orderStatus:formData?.status}))
    .then((response)=>{
      if(response?.payload?.status==="success"){
        dispatch(getAllOrderDetails(allOrderDetails?._id))
        dispatch(getAllOrdersByUser())
        setOpenOrderDetailsDialog(false)
        toast.success(response?.payload?.message)
      }else{
        console.log(response)
      }
    })
  }
  

  return (
    <DialogContent className="w-1/2">
      <div className="flex justify-between mt-10">
        <p className="font-bold">Order ID</p>
        <label>{allOrderDetails?._id}</label>
      </div>
      <div className="flex justify-between ">
        <p className="font-bold">Order Date</p>
        <label>{allOrderDetails?.orderDate?.split("T")[0]}</label>
      </div>
      <div className="flex justify-between ">
        <p className="font-bold">Payment Id</p>
        <label className="font-medium">{allOrderDetails?.paymentId}</label>
      </div>
      <div className="flex justify-between ">
        <p className="font-bold">PayerId</p>
        <label className="font-medium">{allOrderDetails?.payerId}</label>
      </div>
      <div className="flex justify-between ">
        <p className="font-bold">Payment Mode</p>
        <label className="font-medium">{allOrderDetails?.paymentMethod}</label>
      </div>
      <div className="flex justify-between ">
        <p className="font-bold">Order Status</p>
        <label>
          <Badge
            className={
              allOrderDetails?.orderStatus === "success"
                ? "bg-green-500"
                : "bg-black"
            }
          >
            {allOrderDetails?.orderStatus}
          </Badge>
        </label>
      </div>
      <div className="flex justify-between ">
        <p className="font-bold">Order Price</p>
        <label>${allOrderDetails?.totalAmount}</label>
      </div>
      <Separator />
      <div className="grid gap-4">
        <div className="grid gap-2 font-medium">Order Details</div>
        <ul className="grid gap-3">
          {allOrderDetails?.cartItems?.map((eachItem, index) => (
            <li
              key={index}
              className="flex justify-between p-0 items-center list-none"
            >
              <span className="max-w-[40%] truncate">{eachItem?.title}</span>
              <span>${eachItem?.price}</span>
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
            {allOrderDetails?.address?.firstName}{" "}
            {allOrderDetails?.address?.lastName}
          </p>
          <p>
            <span className="font-bold">Address: </span>
            {allOrderDetails?.address?.city},{allOrderDetails?.address?.address}
          </p>
          <p>
            <span className="font-bold">Pincode: </span>
            {allOrderDetails?.address?.pincode}
          </p>
          <p>
            <span className="font-bold">Phone: </span>
            {allOrderDetails?.address?.phone}
          </p>
          <p>
            <span className="font-bold">Description: </span>
            {allOrderDetails?.address?.description}
          </p>
        </div>
      </div>

      <div className="my-3">
        <CommonForm
          formControls={[
            {
              label: "Order Status",
              name: "status",
              componentType: "select",
              options: [
                { id: "pending", label: "Pending" },
                { id: "inProcess", label: "In Process" },
                { id: "inShipping", label: "In Shipping" },
                { id: "delivered", label: "Delivered" },
                { id: "rejected", label: "Rejected" },
              ],
            },
          ]}
          formData={formData}
          setFormData={setFormData}
          buttonText="Update Order Status"
          onSubmit={handleUpdateStatus}
        />
      </div>
      <DialogTitle></DialogTitle>
      <DialogDescription></DialogDescription>
    </DialogContent>
  );
}

export default AdminOrderDetails