import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { deleteProducts, fetchAllProducts, updateProducts } from "@/store/productSlice";
import { toast } from "react-toastify";

const AdminProductItems = ({ product, setProductId,setSubmitType, setOpenAddProductsDialogue, setFormData }) => {
  const dispatch = useDispatch();

  const onClickDelete = (id) => {
    dispatch(deleteProducts({id}))
    .then((response)=>{
      if (response?.payload?.status === "success") {
        toast.success(response.payload?.message);
        dispatch(fetchAllProducts());
      } else {
        toast.error(response.payload?.message);
      }
    })
  };

  return (
    <Card className="w-full mt-6 shadow-xl">
      <div>
        <img
          src={product.image}
          alt={product.title}
          className="w-full rounded-md h-64 md:h-56 "
        />
        <div className="p-3">
          <h2 className="font-bold">{product.title}</h2>
          <div className="flex justify-between">
            <p
              className={
                product.salePrice > 0
                  ? "line-through font-semibold text-md"
                  : ""
              }
            >
              ${product.price}
            </p>
            <p className="font-bold">
              ${product.salePrice > 0 ? product.salePrice : null}
            </p>
          </div>
          <Button
            className="w-full my-3 bg-green-400"
            onClick={() => {
              setOpenAddProductsDialogue(true);
              setProductId(product._id);
              setSubmitType("patch");
              setFormData(product);
            }}
          >
            Edit
          </Button>
          <Button className="w-full bg-red-400" onClick={() => onClickDelete(product._id)}>
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AdminProductItems;
