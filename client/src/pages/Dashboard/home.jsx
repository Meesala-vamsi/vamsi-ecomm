import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProducts } from "@/store/dashboardSlice";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { SiSmartthings } from "react-icons/si";
import { LuFootprints } from "react-icons/lu";
import { TbMoodKidFilled } from "react-icons/tb";
import { FaFemale, FaMale } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import banner6 from "../../assets/home-banner6.webp";
import banner5 from "../../assets/home-banner5.webp";
import banner4 from "../../assets/home-banner4.webp";

const Home = () => {
  const categoryItems = [
    {
      id: "products",
      label: "Products",
      path: "/dashboard/products",
      icon: <AiFillProduct className="text-4xl" />,
    },
    {
      id: "men",
      label: "Men",
      path: "/dashboard/products",
      icon: <FaMale className="text-4xl" />,
    },
    {
      id: "women",
      label: "Women",
      path: "/dashboard/products",
      icon: <FaFemale className="text-4xl" />,
    },
    {
      id: "kids",
      label: "Kids",
      path: "/dashboard/products",
      icon: <TbMoodKidFilled className="text-4xl" />,
    },
    {
      id: "accessories",
      label: "Accessories",
      path: "/dashboard/products",
      icon: <SiSmartthings className="text-4xl" />,
    },
    {
      id: "footwear",
      label: "Footwear",
      path: "/dashboard/products",
      icon: <LuFootprints className="text-4xl" />,
    },
  ];

  const slides = [banner6, banner4, banner5];
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productsList } = useSelector((state) => state.dashboardProducts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const onClickCategory = (category) => {
    if (category) {
      dispatch(getProducts({ category }));
      navigate(`/dashboard/products?category=${category}`);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Carousel Section */}
      <div className="relative w-full h-[300px] md:h-[400px] lg:h-[600px] overflow-hidden">
        {slides.map((eachSlide, index) => (
          <img
            src={eachSlide}
            key={index}
            alt={eachSlide}
            className={`${
              index === currentSlide ? "opacity-100" : "opacity-0"
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500`}
          />
        ))}

        <div
          className={`${
            currentSlide === 2
              ? "absolute top-[20%] lg:top-[35%] left-[10%] lg:left-[35%] text-center"
              : "absolute top-[20%] lg:top-[35%] left-[10%] text-start"
          } flex flex-col gap-3 lg:gap-10`}
        >
          <h1 className="font-bold text-xl lg:text-5xl leading-none">
            Get your <br /> Fashion Style
          </h1>
          <div className="text-sm lg:text-lg text-gray-500">
            <p>Shop the latest clothing, shoes, and handbags</p>
            <p>from top fashion brands, style icons, and celebrities.</p>
          </div>
          <div className="mt-0">
            <Button
              className="rounded-none w-40"
              onClick={() => navigate("/dashboard/products")}
            >
              SHOP NOW
            </Button>
          </div>
        </div>

        <Button
          className="absolute top-1/2 transform left-4 -translate-y-1/2 bg-white/80 hover:bg-white/80 hover:border-0"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
            )
          }
        >
          <SlArrowLeft className="text-black" />
        </Button>
        <Button
          className="absolute top-1/2 transform right-4 -translate-y-1/2 bg-white/80 hover:bg-white/80 hover:border-0"
          onClick={() =>
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
          }
        >
          <SlArrowRight className="text-black" />
        </Button>
      </div>

      {/* Category Section */}
      <section className="my-4 px-4 lg:px-16">
        <h2 className="text-center text-2xl lg:text-3xl font-bold mb-6">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {categoryItems.map((eachItem, index) => (
            <Card
              className="cursor-pointer"
              key={index}
              onClick={() => onClickCategory(eachItem.id)}
            >
              <CardContent className="py-7 flex flex-col items-center gap-2">
                {eachItem.icon}
                <p className="font-bold">{eachItem.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Feature Products Section */}
      <section className="bg-gray-50 py-4 px-4 lg:px-20">
        <h2 className="text-center text-2xl lg:text-3xl font-bold mb-6">
          Feature Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsList?.products?.slice(0, 6).map((eachProduct, index) => (
            <Card className="w-full cursor-pointer" key={index}>
              <div>
                <div className="relative overflow-hidden">
                  <img
                    src={eachProduct?.image}
                    alt={eachProduct?.title}
                    className="w-full h-56 md:h-72 object-cover rounded-t-lg hover:scale-105 transition-transform duration-300"
                  />
                  {eachProduct?.salePrice > 0 && (
                    <Badge className="absolute top-2 left-2">Sale</Badge>
                  )}
                  {eachProduct?.brand && (
                    <Badge className="absolute bottom-2 right-2">
                      {eachProduct?.brand[0].toUpperCase() +
                        eachProduct?.brand.slice(1)}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="px-3 py-2">
                <h2 className="text-md font-bold">{eachProduct?.title}</h2>
                <div className="flex justify-between items-center">
                  <p
                    className={
                      eachProduct?.salePrice
                        ? "line-through text-gray-500 font-bold"
                        : "font-bold"
                    }
                  >
                    ${eachProduct?.price}
                  </p>
                  {eachProduct?.salePrice > 0 && (
                    <p className="font-bold">${eachProduct?.salePrice}</p>
                  )}
                </div>
                <p className="text-gray-400 text-sm my-2">
                  {eachProduct?.totalStock > 0 ? "In Stock" : "Out of Stock"}
                </p>
                <Button
                  disabled={eachProduct?.totalStock <= 0}
                  className="w-full"
                >
                  Add to Cart
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button
            className="flex items-center gap-2"
            onClick={() => navigate("/dashboard/products")}
          >
            View All
            <MdKeyboardDoubleArrowRight className="text-xl" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
