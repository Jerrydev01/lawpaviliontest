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
import { PaystackButton } from "react-paystack";
import Paystack from "../Paystack/Paystack";

const CartModal = () => {
  const { cartItems } = useSelector((state: any) => state.product);
  const publicKey = "pk_test_d952a1215d7aa35e20067bf8b846345ea0495602";
  const amount = parseInt("");

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [colorIsActive, setColorIsActive] = useState<string>("");
  const [sizeIsActive, setSizeIsActive] = useState<string>("");
  const [show, setShow] = useState(false);

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
    <article className="relative w-full">
      <div className="overflow-auto max-h-[30rem]">
        <h3 className="flex gap-2">
          <span className="font-bold">My Bag,</span>
          <span className="">
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
          </span>
        </h3>
        {cartItems.length > 0 ? (
          <article className="">
            {cartItems.map((item: any) => {
              return (
                <article
                  key={item.id}
                  className="flex lg:flex-row flex-col items-baseline justify-between gap-8 my-4"
                >
                  <div className="">
                    <div className="">
                      <h3 className="font-[300] pt-4">
                        {" "}
                        <span className="text-[1.125rem]">
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
                    <Link href={`${item.id}`} className="w-[180px] relative">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        objectFit="contain"
                        layout="responsive"
                      />
                    </Link>
                    <button
                      onClick={() => handleRemoveFromCart(item)}
                      className="absolute bg-color-primary text-white font-bold p-2 flex rounded-full top-2 right-3 z-10"
                    >
                      <AiOutlineDelete />
                    </button>
                  </div>
                </article>
              );
            })}
            {/* get cart total */}

            <div className="flex justify-between items-center font-rob font-semibold py-5">
              <h3 className="">Total</h3>
              <h3 className="pr-5">
                {" "}
                {formatMoney(
                  cartItems.reduce(
                    (total: any, item: any) =>
                      total + item.quantity * item.price,
                    0
                  )
                )}
              </h3>
            </div>
            <div className="flex flex-col lg:flex-row text-center justify-between pr-5 gap-3 ">
              <Link
                href="/cart"
                onClick={()=> setShow(show)}
                className="px-4 py-3 mb-2 w-full uppercase border border-[#1D1F22]"
              >
                View bag
              </Link>
              <button
                onClick={handleShowModal}
                className="uppercase w-full text-white bg-[#5ECE7B] py-3 mb-2"
              >
                CHECK OUT
              </button>
            </div>
          </article>
        ) : (
          <div className="pt-7 px-5"> Your Cart is Empty</div>
        )}
      </div>
      <div className="">
        {show ? (
          <>
            <div
              onClick={() => setShow(!show)}
              className="fixed top-0 right-0 bottom-0 left-0 bg-[#37374987]  z-10"
            ></div>
            {/* how to center a div for mobile */}
            <div className="m-auto grid place-items-center fixed z-20 top-[30%] lg:-translate-x-[80%] -translate-x-[33%] md:-translate-x-[90%]  ">
              <Paystack />
            </div>
          </>
        ) : null}
      </div>
    </article>
  );
};

export default CartModal;
