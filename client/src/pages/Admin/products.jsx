import ProductImageUpload from "@/components/Admin/imageUpload";
import AdminProductItems from "@/components/Admin/productItems";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import CommonForm from "@/components/Utils/form";
import { addProducts, fetchAllProducts, updateProducts } from "@/store/productSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "puma", label: "Puma" },
      { id: "levi's", label: "Levi's" },
      { id: "zara", label: "Zara" },
      { id: "h&m", label: "H&M" },
      {id:"ASOS",label:"ASOS"}
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

const initialData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const Products = () => {
  const [formData, setFormData] = useState([]);
  const [openAddProductsDialogue, setOpenAddProductsDialogue] = useState(false);
  const [imageUpload,setImageUpload] = useState(null)
  const [uploadedImageUrl,setUploadedImageUrl] = useState("")
  const [imageLoadingState,setImageLoadingState] = useState(true)
  const [productId,setProductId] = useState(null)
    const [submitType, setSubmitType] = useState("post");
  const dispatch = useDispatch()
  const { productsList } = useSelector((state) => state.adminProducts);

  const onSubmit = (e) => {
    e.preventDefault();

    if(submitType==="post"){
      dispatch(
        addProducts({
          ...formData,
          image: uploadedImageUrl,
        })
      ).then((response) => {
        console.log(response);
        if (response?.payload?.status === "success") {
          toast.success(response.payload?.message);
          dispatch(fetchAllProducts());
          setOpenAddProductsDialogue(false);
          setFormData(initialData);
        } else {
          toast.error(response.payload?.message);
        }
      });
    }else{
      dispatch(
        updateProducts({ productId, formData:{...formData,image:uploadedImageUrl} })
      ).then((response) => {
        console.log(response);
        if (response?.payload?.status === "success") {
          toast.success(response.payload?.message);
          dispatch(fetchAllProducts());
          setOpenAddProductsDialogue(false);
          setFormData(initialData);
          setProductId(null)
        } else {
          toast.error(response.payload?.message);
        }
      });
    }
  };

  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[dispatch])

  return (
    <>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <Sheet
          open={openAddProductsDialogue}
          onOpenChange={()=>{
            setOpenAddProductsDialogue(false)
            setProductId(null),
            setFormData(initialData)
          }}
          className="w-64"
        >
          <SheetContent side="right" className="overflow-auto">
            <SheetHeader className="">
              <SheetTitle className="mb-7 font-extrabold">
                {submitType==="patch"? "Edit the product":"Add new product"}
              </SheetTitle>
            </SheetHeader>
            <SheetDescription></SheetDescription>
            <div className="">
              <ProductImageUpload
                file={imageUpload}
                setFile={setImageUpload}
                setImageLoadingState={setImageLoadingState}
                uploadedImageUrl={uploadedImageUrl}
                setUploadedImageUrl={setUploadedImageUrl}
                imageLoadingState={imageLoadingState}
              />
              <CommonForm
                formData={formData}
                setFormData={setFormData}
                buttonText="Add"
                onSubmit={onSubmit}
                formControls={addProductFormElements}
              />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div>
        <div className="w-full flex flex-1 justify-end">
          <Button onClick={() => {setOpenAddProductsDialogue(true); setSubmitType("post")}}>
            Add new product
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-3 lg:grid-cols-4">
          {productsList?.products?.map((eachProduct, index) => (
            <AdminProductItems
              product={eachProduct}
              setFormData={setFormData}
              setSubmitType={setSubmitType}
              setProductId={setProductId}
              setOpenAddProductsDialogue={setOpenAddProductsDialogue}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
