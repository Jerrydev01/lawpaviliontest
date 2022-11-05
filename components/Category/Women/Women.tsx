import React from "react";
import { formatMoney } from "../../../utils/utils";
import { products } from "../../../libs/data";
import Image from "next/legacy/image";
import Link from "next/link";
import cart from "../../../assets/cart2.svg";
import { addToCart } from "../../../store/features/productSlice";

import { useDispatch } from "react-redux";

const Women = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
  };

  return (
    <article>
      <article className="grid lg:grid-cols-3 grid-cols-2 lg:gap-[40px] gap-3 gap-y-11 py-10">
        {products.women.map((product) => {
          return (
            <div
              className="hover:shadow-lg p-4 relative  group"
              key={product.id}
            >
              <Link href={`${product.pages}/${product.id}`} className="">
                <div className="">
                  <Image
                    alt={product.name}
                    objectFit="contain"
                    src={product.imageUrl}
                    layout="responsive"
                  />
                </div>
                {product.productQuantity > 0 ? (
                  <>
                    <p className="pt-3 text-[#1D1F22] font-[300]">
                      {product.name}
                    </p>
                    <span className="font-semibold">
                      {formatMoney(product.price)}
                    </span>
                  </>
                ) : (
                  <>
                    <p className="pt-3 text-[#8D8F9A] font-[300]">
                      {product.name}
                    </p>
                    <span className=" text-[#8D8F9A]">
                      {formatMoney(product.price)}
                    </span>
                  </>
                )}
              </Link>
              {product.productQuantity > 0 ? (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-color-primary w-fit p-2 flex justify-center items-center rounded-full absolute right-10 -translate-y-20 z-10 invisible group-hover:visible"
                >
                  <Image src={cart} alt="cart" height={21} width={22} />
                </button>
              ) : (
                <button
                  disabled
                  className="bg-gray-500 w-fit p-2 flex justify-center items-center rounded-full absolute right-10 -translate-y-20 z-10 invisible group-hover:visible"
                >
                  <Image src={cart} alt="cart" height={21} width={22} />
                </button>
              )}
            </div>
          );
        })}
      </article>
    </article>
  );
};

export default Women;
