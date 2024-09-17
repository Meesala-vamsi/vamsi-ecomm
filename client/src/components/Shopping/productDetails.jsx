import { useDispatch, useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";
import { setProductDetails } from "@/store/dashboardSlice";
import { Avatar, AvatarFallback } from "../ui/avatar";
import StarRating from "../Utils/starRating";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { addReviews, fetchReviews } from "@/store/reviewsSlice";
import { toast } from "react-toastify";

const ProductDetailsDialog = ({
  open,
  setOpen,
  productDetails,
  handleAddToCart,
}) => {
  const dispatch = useDispatch();
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const { user } = useSelector((state) => state.auth);
  const { reviewsList } = useSelector((state) => state.reviews);

  const handleRatingChange = (getRating) => {
    setRating(getRating);
  };

  useEffect(() => {
    if (productDetails !== null) {
      dispatch(fetchReviews(productDetails?._id));
    }
  }, [productDetails, dispatch]);

  const handleAddReview = () => {
    dispatch(
      addReviews({
        userId: user?.id,
        productId: productDetails?._id,
        comments: reviewMsg,
        ratings: rating,
        userName: user?.username,
      })
    ).then((response) => {
      if (response?.payload?.status === "success") {
        setRating(0);
        setReviewMsg("");
        toast.success("Review added successfully..");
        dispatch(fetchReviews(productDetails._id));
      }else{
        toast.error(response?.payload?.message)
        setRating(0);
        setReviewMsg("");
      }
    });
  };

  const calculatedReview =reviewsList && reviewsList.length > 0? reviewsList.reduce((sum, item) => sum + item.ratings, 0) / reviewsList.length:0;
  console.log(calculatedReview)
  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        setOpen(false);
        dispatch(setProductDetails());
        setRating(0);
        setReviewMsg("");
      }}
    >
      <DialogContent className="max-w-[90vw] sm:max-w-[80vw] lg:max-w-[60vw] grid grid-cols-2 gap-4">
        <div className="relative">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            className="rounded-lg h-full"
          />
          <div className="absolute bottom-2 right-2">
            <Badge className="w-20 flex justify-center text-md">
              {productDetails?.brand[0].toUpperCase() +
                productDetails?.brand.slice(1)}
            </Badge>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-extrabold">{productDetails?.title}</h2>
          <p className="text-black text-sm">{productDetails?.description}</p>
          <div className="flex justify-between items-center">
            <p
              className={
                productDetails?.salePrice > 0
                  ? "line-through font-bold text-xl"
                  : "font-bold text-xl"
              }
            >
              ${productDetails?.price}
            </p>
            <p
              className={
                productDetails?.salePrice > 0 ? "font-bold text-xl" : "hidden"
              }
            >
              ${productDetails?.salePrice}
            </p>
          </div>
          <p className="text-gray-500 font-bold text-md">
            {productDetails?.totalStock > 0 ? "In Stock" : "Out of stock"}
          </p>
          <div className="flex gap-2 items-center">
              <StarRating rating={calculatedReview}/>
              <span className="text-gray-400">({calculatedReview})</span>
          </div>
          <Button
            disabled={productDetails?.totalStock <= 0}
            onClick={() =>
              handleAddToCart(productDetails?._id, productDetails?.totalStock)
            }
          >
            Add to cart
          </Button>
          <Separator className="mt-3" />

          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            {reviewsList && reviewsList.length > 0 ? (
              reviewsList?.map((eachReview, index) => (
                <div key={index}>
                  <div className="grid gap-6">
                    <div className="flex gap-4">
                      <Avatar className="w-10 h-10 border">
                        <AvatarFallback>
                          {eachReview?.userName[0]?.toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold">{eachReview?.userName}</h3>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {eachReview?.comments}
                        </div>
                        <p className="text-muted-foreground">
                          <StarRating rating={eachReview?.ratings} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews</p>
            )}
            <div className="mt-10 flex-col flex gap-2">
              <label>Write a review</label>
              <div className="flex gap-1">
                <StarRating
                  rating={rating}
                  handleRatingChange={handleRatingChange}
                />
              </div>
              <Input
                name="reviewMsg"
                value={reviewMsg}
                onChange={(event) => setReviewMsg(event.target.value)}
                placeholder="Write a review..."
              />
              <Button
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
