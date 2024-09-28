import Address from "@/components/Shopping/address";
import banner1 from "../../assets/home-banner.webp";
import { useDispatch, useSelector } from "react-redux";
import DisplayCartItems from "@/components/Shopping/displayCartItems";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createOrder } from "@/store/orderSlice";
import { toast } from "react-toastify";
const Checkout = () => {
  const {cartList} = useSelector(state=>state.cartProducts)
  const {user} = useSelector(state=>state.auth)
  const [getSelectAddress,setSelectAddress]=useState(null)
  const [paymentStarted,setPaymentStarted] = useState(false)
  const {successUrl} = useSelector(state=>state.orders)
  const dispatch = useDispatch()


  let totalPrice = 0;
  cartList?.items?.map((eachItem) => {
    if (eachItem?.salePrice > 0) {
      totalPrice += eachItem?.quantity * eachItem?.salePrice;
    } else {
      totalPrice += eachItem?.quantity * eachItem?.price;
    }
    return totalPrice;
  });

  const onClickCheckout=()=>{

    if(cartList.items.length<=0){
      toast.error("Your cart is empty.Please add items to proceed.")
      return;
    }

    if(!getSelectAddress){
      toast.error("Please select address to proceed.");
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId:cartList?._id,
      cartItems: cartList?.items?.map((eachItem) => ({
        productId: eachItem?.productId,
        title: eachItem?.title,
        image: eachItem?.image,
        price: eachItem?.salePrice > 0 ? eachItem?.salePrice : eachItem?.price,
        quantity: eachItem?.quantity,
      })),
      address:getSelectAddress,
      orderStatus: "pending",
      paymentMethod:"paypal",
      paymentStatus: "pending",
      totalAmount:totalPrice,
      orderDate:new Date(),
      orderUpdateDate:new Date(),
      paymentId:'',
      payerId:'',
    };

    dispatch(createOrder(orderData))
    .then((response)=>{
      if(response?.payload?.status==="success"){
        setPaymentStarted(true)
        console.log(response)
      }else{
        console.log(response)
        setPaymentStarted(false)
      }
    })
  }

  if(successUrl){
    window.location.href=successUrl
  }
 
  return (
    <div>
      <img
        src="https://res.cloudinary.com/db0f83m76/image/upload/v1726667562/account_page_image_f9x6bx.webp"
        alt="checkout banner"
        className="w-full lg:h-[500px]"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 mt-2b  ">
          <Address
            className=""
            setSelectAddress={setSelectAddress}
            getSelectAddress={getSelectAddress}
          />
        </div>
        <div className="px-7 py-10">
          {cartList?.items.map((eachItem) => (
            <DisplayCartItems item={eachItem} />
          ))}
          <Button
            className="rounded-none w-full my-3"
            onClick={onClickCheckout}
          >
            Checkout with paypal
          </Button>
          <div className="flex justify-between items-center font-bold mt-4 border px-3 py-4 rounded-md border-gray-300">
            <h2 className="">Total</h2>
            <p className="">${totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
