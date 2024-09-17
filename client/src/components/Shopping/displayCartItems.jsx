import React from "react";
import { FiMinusCircle } from "react-icons/fi";
import { LuPlusCircle } from "react-icons/lu";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItem, updateCartItem } from "@/store/cartSlice";
import { toast } from "react-toastify";
import { Badge } from "../ui/badge";

const DisplayCartItems = ({ item }) => {
  const { user } = useSelector((state) => state.auth);
  const { cartList } = useSelector((state) => state.cartProducts);
  const { productsList } = useSelector((state) => state.dashboardProducts);
  const dispatch = useDispatch();

  //Delete cart item...
  const onClickCartDelete = (productId) => {
    dispatch(deleteCartItem({ userId: user?.id, productId })).then(
      (response) => {
        if (response?.payload?.status === "success") {
          toast.success(response?.payload?.message);
        } else {
          toast.error(response?.payload?.message);
        }
      }
    );
  };

  //update quantity
  const onClickUpdateAction = (item, actionType) => {
    //Restricting the quantity increasing when trying to add more than totalStock..
    if (actionType === "plus") {
      let getCartItems = cartList.items || [];
      if (getCartItems.length) {
        let indexOfCurrentCartItem = getCartItems.findIndex(
          (eachItem) => eachItem.productId === item?.productId
        );
        const getCurrentProductId = productsList?.products?.findIndex(
          (eachItem) => eachItem._id === item?.productId
        );
        const stock = productsList.products[getCurrentProductId].totalStock;

        if (indexOfCurrentCartItem > -1) {
          const getQuantity = getCartItems[indexOfCurrentCartItem].quantity;
          if (getQuantity + 1 > stock) {
            toast.error("You added more quantity which is not in stock.");
            return;
          }
        }
      }
    }

    //updating the quantity when the quantity is lessthan totalStock and also decreasing the quantity.
    dispatch(
      updateCartItem({
        userId: user?.id,
        productId: item?.productId,
        quantity:
          actionType === "minus" ? item?.quantity - 1 : item?.quantity + 1,
      })
    );
  };

  return (
    <div className="grid mb-3 grid-cols-4 lg:grid-cols-3 gap-2">
      <div className=" col-span-2 lg:col-span-1 relative">
        <img
          src={item?.image}
          alt={item?.title}
          className="h-36 w-28 lg:h-36 lg:w-36 rounded-md"
        />
        <Badge className="absolute bottom-1 right-1">
          {item?.brand && item?.brand[0]?.toUpperCase() + item?.brand?.slice(1)}
        </Badge>
      </div>
      <div className="col-span-2 flex flex-col gap-3">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
          <h2 className="text-sm font-bold max-w-34 truncate">{item?.title}</h2>
          <p className="font-bold">
            $
            {item?.salePrice > 0
              ? item?.salePrice * item?.quantity
              : item?.price * item?.quantity}
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2  items-center">
            <Button
              className="border-0 bg-transparent text-black p-0 hover:bg-white"
              onClick={() => onClickUpdateAction(item, "minus")}
              disabled={item?.quantity <= 1}
            >
              <FiMinusCircle className="text-2xl cursor-pointer" />
            </Button>
            <span className="text-xl">{item?.quantity}</span>
            <Button
              className="border-0 bg-transparent text-black p-0 hover:bg-white"
              onClick={() => onClickUpdateAction(item, "plus")}
              disabled={item?.quantity >= 4}
            >
              <LuPlusCircle className="text-2xl cursor-pointer" />
            </Button>
          </div>
        </div>
        <Button
          className="w-full"
          onClick={() => onClickCartDelete(item.productId)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default DisplayCartItems;
