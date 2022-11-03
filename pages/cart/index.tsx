import Image from "next/legacy/image";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { formatMoney } from "../../utils/utils";
import {
  addToCart,
  decreaseFromCart,
  removeFromCart,
} from "../../store/features/productSlice";
import Link from "next/link";

import { AiOutlineDelete } from "react-icons/ai";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import Paystack from "../../components/Paystack/Paystack";

const Index = () => {
  const { cartItems } = useSelector((state: any) => state.product);

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [colorIsActive, setColorIsActive] = useState<string>("");
  const [sizeIsActive, setSizeIsActive] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setColor(value);
  };
  const handleSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSize(value);
  };

  const handleColorActive = (color: string) => {
    if (colorIsActive === color) {
      setColorIsActive("");
    } else {
      setColorIsActive(color);
    }
  };

  const handleSizeActive = (size: string, id: any) => {
    if (sizeIsActive === size && setSizeIsActive === id) {
      setSizeIsActive("");
    } else {
      setSizeIsActive(size);
    }
  };

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
  };

  const handleDecreaseFromCart = (item: any) => {
    dispatch(decreaseFromCart(item));
  };
  const handleRemoveFromCart = (item: any) => {
    dispatch(removeFromCart(item));
  };

  const handleShowModal = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  // how to make each color dynamic in each cart

  return (
    <div className=" container ">
      <h3 className="pt-20 flex gap-2">
        <span className="font-bold lg:text-[2.5rem] text-[2rem]">CART</span>
        {/* <span className="">
          {cartItems.length > 0 ? (
            <>
              <span>
                {cartItems.reduce(
                  (total: any, item: any) => total + item.quantity,
                  0
                )}{" "}
                items
              </span>
            </>
          ) : (
            <span>{0} items</span>
          )}
        </span> */}
      </h3>
      {cartItems.length > 0 ? (
        <article className="">
          {cartItems.map((item: any) => {
            return (
              <article
                key={item.id}
                className="flex flex-col-reverse md:flex-row justify-between gap-3 my-4 border-t pt-5 items-baseline"
              >
                <div className="">
                  <div className="w-full">
                    <h3 className="font-[300] text-[1.875rem] pt-4">
                      {" "}
                      <span className=" font-bold">
                        {item.name.slice(0, 7)}
                      </span>
                      <br />
                      <span className="font-[400]">
                        {item.name.slice(7, item.name.length)}
                      </span>
                    </h3>
                    <p className="font-semibold py-2">
                      {formatMoney(item.price)}
                    </p>
                    <div className="">
                      <h3 className="flex gap-4">
                        Size: <span>{size}</span>{" "}
                      </h3>
                      <div className=" flex gap-3 text-sm items-center">
                        {item.size.map((size: string, index: any) => (
                          <div key={size}>
                            <input
                              className="hidden"
                              type="checkbox"
                              name="size"
                              id={size}
                              value={size}
                              onChange={handleSize}
                              checked={size === item.size}
                            />

                            <div className="mt-2">
                              <label
                                className={` border border-[#1D1F22]  ${
                                  sizeIsActive === size
                                    ? "px-3 py-2 text-white bg-[#1D1F22]"
                                    : "px-3 py-2"
                                }`}
                                onClick={() => handleSizeActive(size, index)}
                                htmlFor={size}
                              >
                                {size}
                              </label>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="pt-5">
                    <h3 className="flex gap-4">
                      {/* how to change hex color to name */}
                      Color: <span>{color}</span>{" "}
                    </h3>
                    <div className=" flex gap-2 items-center">
                      {item.color.map((color: string) => (
                        <div key={color}>
                          <input
                            className="hidden"
                            type="checkbox"
                            name="color"
                            id={color}
                            value={color}
                            onChange={handleColor}
                          />

                          <div className="mt-2">
                            <label
                              className={`  rounded-[2px] ${
                                colorIsActive === color
                                  ? "px-3 py-1 text-white bg-[#1D1F22] border border-[#5ECE7B]"
                                  : "px-3 py-1"
                              }`}
                              onClick={() => setColorIsActive(color)}
                              htmlFor={color}
                              style={{ backgroundColor: color }}
                            ></label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 relative">
                  <div className="flex flex-col gap-3 justify-between  ">
                    <button
                      className=" border border-[#1D1F22] px-3 py-1 text-[20px]"
                      onClick={() => handleAddToCart(item)}
                    >
                      +
                    </button>
                    <p className="text-center">{item.quantity}</p>

                    <button
                      className="  border border-[#1D1F22] px-3 py-1 text-[20px]"
                      onClick={() => handleDecreaseFromCart(item)}
                    >
                      -
                    </button>
                  </div>
                  {/* how to create custom swiper navigation */}
                  <Link
                    href={`${item.id}`}
                    className="lg:w-[180px] w-[300px] relative "
                  >
                    <Swiper
                      spaceBetween={30}
                      centeredSlides={true}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                      }}
                      pagination={{
                        clickable: true,
                      }}
                      navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                      }}
                      modules={[Autoplay, Pagination, Navigation]}
                      className="mySwiper"
                    >
                      <SwiperSlide>
                        {" "}
                        <Image
                          src={item.image[0]}
                          alt={item.name}
                          objectFit="contain"
                          layout="responsive"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={item.image[1]}
                          alt={item.name}
                          objectFit="contain"
                          layout="responsive"
                        />
                      </SwiperSlide>
                      <SwiperSlide>
                        <Image
                          src={item.image[2]}
                          alt={item.name}
                          objectFit="contain"
                          layout="responsive"
                        />
                      </SwiperSlide>
                    </Swiper>
                  </Link>
                  <button
                    onClick={() => handleRemoveFromCart(item)}
                    className="absolute bg-color-primary text-white font-bold p-2 flex rounded-full top-2 right-3 z-10"
                  >
                    <AiOutlineDelete />
                  </button>
                  <div className="text-white flex gap-2 absolute  bottom-5 z-20 right-5">
                    <div className="swiper-button-prev cursor-pointer p-1 bg-black h-fit">
                      <AiOutlineLeft />
                    </div>
                    <div className="swiper-button-next cursor-pointer p-1 bg-black h-fit">
                      <AiOutlineRight />
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
          {/* get cart total */}

          <div className="flex flex-col gap-2 border-t mt-8 text-[1.5rem] font-rale  py-5">
            <h3 className="">
              Tax 21% :{" "}
              <span className="font-bold">
                {" "}
                {formatMoney(
                  cartItems.reduce(
                    (total: any, item: any) =>
                      (total + item.quantity * item.price) * 0.21,
                    0
                  )
                )}
              </span>
            </h3>
            <h3 className="">
              Quantity :{" "}
              <>
                <span className="font-bold">
                  {cartItems.reduce(
                    (total: any, item: any) => total + item.quantity,
                    0
                  )}
                </span>
              </>{" "}
            </h3>
            <h3 className="">
              Total:{" "}
              <span className="pr-5 font-bold">
                {" "}
                {formatMoney(
                  cartItems.reduce(
                    (total: any, item: any) =>
                      total + item.quantity * item.price,
                    0
                  )
                )}
              </span>
            </h3>
          </div>
          <div className="text-center justify-between gap-3 lg:w-fit pb-10">
            <button
              onClick={handleShowModal}
              className="uppercase w-full text-white bg-[#5ECE7B] px-20 lg:py-2 py-3"
            >
              ORDER
            </button>
            {show ? (
              <>
                <div
                  onClick={() => setShow(!show)}
                  className="fixed top-0 right-0 bottom-0 left-0 bg-[#37374987]  z-10"
                ></div>
                {/* how to center a div */}
                <div className="absolute lg:top-[60%] top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white  flex flex-col gap-3 justify-center items-center ">
                  <Paystack />
                </div>
              </>
            ) : null}
          </div>
        </article>
      ) : (
        <div className="pt-7 px-5 flex m-auto justify-center items-center lg:text-[3rem] text-[2.5rem] font-bold mt-20">
          {" "}
          Your Cart is Empty
        </div>
      )}
    </div>
  );
};

export default Index;
