import React from "react";
import { Button } from "../ui/button";
import { FaStar } from "react-icons/fa";

const StarRating = ({rating,handleRatingChange}) => {
  return [1, 2, 3, 4, 5].map((star) => (
    <Button
      variant="outline"
      className={`p-2 rounded-full transition-colors border-0  ${
        star <= rating
          ? "text-yellow-400 hover:black"
          : "text-black hover:bg-primary hover:text-primary-foreground"
      }`}
    >
      <FaStar
        className={`text-xl ${
          star <= rating
        ?"fill-yellow-400 hover:black":"fill-black"}`}
        onClick={()=>handleRatingChange(star)}
      />
    </Button>
  ));
};

export default StarRating;
