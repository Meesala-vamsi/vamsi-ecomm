import ProductDetailsDialog from "@/components/Shopping/productDetails";
import DashboardProductItems from "@/components/Shopping/productItems";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createCartItem, fetchAllCartItems } from "@/store/cartSlice";
import { fetchProductById, getProducts } from "@/store/dashboardSlice";
import { fetchAllProducts } from "@/store/productSlice";
import {
  DropdownMenuRadioGroup,
} from "@radix-ui/react-dropdown-menu";
import { useEffect, useState } from "react";
import { HiArrowsUpDown } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const sortItems = [
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "title-AtoZ", label: "Title: A to Z" },
  { id: "title-ZtoA", label: "Title: Z to A" },
];

const DashProducts = () => {
  const { productsList, productDetails } = useSelector(
    (state) => state.dashboardProducts
  );
  const [sort, setSort] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const {cartList} = useSelector(state=>state.cartProducts)
  const [openProductDetailsDialog, setOpenProductDetailsDialog] =useState(false);
  const dispatch = useDispatch();
  const handleAddToCart = (productId,stock) => {

    let getCartItems = cartList?.items || [];

    if(getCartItems.length){
      let indexOfCurrentItem = getCartItems.findIndex((item=>item.productId===productId))
      console.log(indexOfCurrentItem)
      if(indexOfCurrentItem > -1){
        const getQuantity = getCartItems[indexOfCurrentItem].quantity;
        if(getQuantity + 1 > stock){
          toast.error(`You have to add only ${getQuantity} items for this product.`);
          return;
        }
        
      }
    }
    dispatch(
      createCartItem({
        productId: productId,
        userId: user?.id,
        quantity: 1,
      })
    ).then((response) => {
      if (response?.payload?.status === "success") {
        dispatch(fetchAllCartItems({ id: user?.id }));
        toast.success(response?.payload?.message);
      } else {
        toast.error(response?.payload?.message);
      }
    });
  };

  // useEffect(() => {
  //   if (sort !== null) {
  //     dispatch(getProducts({ sort: sort }));
  //   }
  // }, [dispatch, sort]);

  useEffect(() => {
    setSort("price-hightolow");
  }, []);

  // useEffect(()=>{
  //   dispatch(fetchAllProducts())
  // },[dispatch])

  useEffect(() => {
    if (productDetails !== null) setOpenProductDetailsDialog(true);
  }, [productDetails]);

  const handleSort = (value) => {
    setSort(value);
  };

  const onClickProduct = (id) => {
    dispatch(fetchProductById({ id }));
  };

  return (
    <div>
      <div className="flex justify-between items-center border px-5 py-3 border-b">
        <h2 className="font-bold text-lg">All products</h2>
        <DropdownMenu>
          <DropdownMenuTrigger className="bg-background border-0 p-0">
            <Button
              variant="outline"
              className="flex gap-2 border items-center w-full"
            >
              <HiArrowsUpDown className="text-lg" />
              Sort
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="left">
            <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
              {sortItems.map((eachItem) => (
                <DropdownMenuRadioItem value={eachItem.id} key={eachItem.id}>
                  {eachItem.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 px-10 py-9">
        {productsList?.products?.map((eachProduct, index) => (
          <DashboardProductItems
            key={index}
            products={eachProduct}
            onClickProduct={onClickProduct}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
      <ProductDetailsDialog
        open={openProductDetailsDialog}
        setOpen={setOpenProductDetailsDialog}
        productDetails={productDetails?.product}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default DashProducts;
