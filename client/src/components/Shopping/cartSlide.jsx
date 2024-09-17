import React from 'react'
import { SheetContent, SheetTitle } from '../ui/sheet'
import { SelectSeparator } from '../ui/select'
import { Button } from '../ui/button'
import DisplayCartItems from './displayCartItems'
import { useNavigate } from 'react-router-dom'


const CartSlide = ({cartList,setOpenCart}) => {
  let totalPrice = 0;
  const navigate = useNavigate()
  cartList?.map((eachItem)=>{
    if(eachItem?.salePrice>0){
      totalPrice += eachItem?.quantity*eachItem?.salePrice
    }else{
      totalPrice += eachItem?.quantity * eachItem?.price;
    }
    return totalPrice
  })

  return (
    <SheetContent className="sm:max-w-md">
      <SheetTitle className="font-bold mb-4">Cart Items</SheetTitle>
      {cartList?.map((eachItem, index) => (
        <DisplayCartItems key={index} item={eachItem} />
      ))}
      <SelectSeparator className="text-black border border-gray-200" />
      <div className="flex justify-between items-center font-bold mt-4">
        <h2 className="">Total</h2>
        <p className="">${totalPrice}</p>
      </div>
      <Button className="w-full mt-6" onClick={()=>{
        navigate("/dashboard/checkout");
        setOpenCart(false)
      }}>Checkout</Button>
    </SheetContent>
  );
}

export default CartSlide