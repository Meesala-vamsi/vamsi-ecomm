import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';

const DashboardProductItems = ({
  products,
  onClickProduct,
  handleAddToCart,
}) => {
  return (
    <Card className="w-full mt-5 cursor-pointer">
      <div onClick={() => onClickProduct(products._id)}>
        <div className="relative">
          <img
            src={products?.image}
            alt=""
            className="w-full md:h-72 rounded-t-lg"
          />
          <div className="absolute top-2 left-2">
            {products?.totalStock <= 10 && products?.totalStock !== 0 ? (
              <Badge>Only {products?.totalStock} Left</Badge>
            ) : products?.salePrice>0?<Badge>Sale</Badge>:null}
          </div>
          <div className="absolute top-2 right-2"></div>
          <div className="absolute bottom-1 right-1">
            {products.brand ? (
              <Badge>
                {products?.brand[0].toUpperCase() + products?.brand.slice(1)}
              </Badge>
            ) : null}
          </div>
        </div>
      </div>
      <div className="px-3 py-2">
        <h2 className="text-md font-extrabold mb-2">{products?.title}</h2>
        <div className="flex justify-between items-center">
          <p
            className={
              products?.salePrice ? "line-through font-bold" : "font-bold"
            }
          >
            ${products.price}
          </p>
          <p className={products.salePrice > 0 ? "font-bold" : "hidden"}>
            ${products?.salePrice}
          </p>
        </div>
        <p className="text-gray-400 font-bold text-sm my-2">
          {products.totalStock > 0 ? "In Stock" : "Out of stock"}
        </p>
        <Button
          disabled={products.totalStock <= 0}
          className="w-full"
          onClick={() => handleAddToCart(products._id,products?.totalStock)}
        >
          Add to cart
        </Button>
      </div>
    </Card>
  );
};

export default DashboardProductItems