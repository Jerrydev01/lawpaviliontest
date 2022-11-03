import React, { useState } from "react";
import { products } from "../../../libs/data";
import Image from "next/legacy/image";
import { formatMoney } from "../../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../store/features/productSlice";

const WomenProducts = ({ product }: any) => {
  // const { cartItems } = useSelector((state: any) => state.productArray);
  const [image, setImage] = useState(product[0].image[0]);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [colorIsActive, setColorIsActive] = useState<string>("");
  const [sizeIsActive, setSizeIsActive] = useState<string>("");
  const [buttonActive, setButtonActive] = useState<string>("");

  const dispatch = useDispatch();

  const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setColor(value);
  };
  const handleSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSize(value);
  };

  const handleImageChange = (image: any) => {
    setImage(image);
  };

  const handleColorActive = (color: string) => {
    if (colorIsActive === color) {
      setColorIsActive("");
    } else {
      setColorIsActive(color);
    }
  };

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
  };

  // currency should change when i click a button

  // // convert EUR to USD ?
  // const convertEURToUSD = (price: number) => {
  //   const EURToUSD = 1.17;
  //   return price * EURToUSD;
  // };

  // // convert USD to EUR ?
  // const convertUSDToEUR = (price: number) => {
  //   const USDToEUR = 0.85;
  //   return price * USDToEUR;
  // };

  // // convert EUR to NGN ?
  // const convertEURToNGN = (price: number) => {
  //   const EURToNGN = 495;
  //   return price * EURToNGN;
  // };

  // // convert USD to NGN ?
  // const convertUSDToNGN = (price: number) => {
  //   const USDToNGN = 410;
  //   return price * USDToNGN;
  // };

  // // convert JPY to NGN ?
  // const convertJPYToNGN = (price: number) => {
  //   const JPYToNGN = 3.7;
  //   return price * JPYToNGN;
  // };

  // // convert NGN to EUR ?
  // const convertNGNToEUR = (price: number) => {
  //   const NGNToEUR = 0.002;
  //   return price * NGNToEUR;
  // };

  // // convert NGN to USD ?
  // const convertNGNToUSD = (price: number) => {
  //   const NGNToUSD = 0.0024;
  //   return price * NGNToUSD;
  // };

  // // convert NGN to JPY ?
  // const convertNGNToJPY = (price: number) => {
  //   const NGNToJPY = 0.27;
  //   return price * NGNToJPY;
  // };

  return (
    <article className="container ">
      {product.map((item: any) => {
        return (
          <div className=" pb-14 pt-20" key={item.id}>
            <article className="flex pt-14 lg:flex-row gap-8 flex-col ">
              <div className="flex lg:flex-row flex-col-reverse  xl:gap-[19px] gap-[12px]">
                <div className="flex lg:flex-col gap-6 flex-row ">
                  {product[0].image.map((item: any, i: number) => (
                    <div
                      key={i}
                      className={`rounded-[3px]  h-[85px] w-[85px] xl:h-[85px] lg:h-[92px] ${
                        colorIsActive === item
                          ? "border-[0.6px] border-[#081658]"
                          : ""
                      }`}
                      onClick={() => handleImageChange(item)}
                    >
                      <Image
                        src={item}
                        alt={item.name}
                        layout="responsive"
                        objectFit="contain"
                        width={100}
                        height={100}
                        onClick={() => handleColorActive(item)}
                        className="cursor-pointer"
                      />
                    </div>
                  ))}
                </div>
                <div className="xl:w-[530px] lg:w-[500px] w-full">
                  <Image
                    className="rounded-[3px]"
                    src={image}
                    alt="product"
                    objectFit="cover"
                    layout="responsive"
                  />
                </div>
              </div>
              <div className="lg:w-[35%]">
                <div className="lg:pl-5">
                  {/* how to style a string of length 5 */}
                  <h3 className="text-[1.875rem]">
                    <span className="font-semibold">
                      {item.name.slice(0, 7)}
                    </span>
                    <br />
                    <span className="font-[400]">
                      {item.name.slice(7, item.name.length)}
                    </span>
                  </h3>
                </div>
                <div className="lg:pl-5 mt-5">
                  <div className="">
                    <h3 className="flex gap-4 font-bold">
                      SIZE: <span>{size}</span>{" "}
                    </h3>
                    <div className=" flex gap-3 items-center">
                      {product[0].size.map((size: string) => (
                        <div key={size}>
                          <input
                            className="hidden"
                            type="checkbox"
                            name="size"
                            id={size}
                            value={size}
                            onChange={handleSize}
                          />

                          <div className="mt-4">
                            <label
                              className={` border border-[#1D1F22]  ${
                                sizeIsActive === size
                                  ? "px-5 py-3 text-white bg-[#1D1F22]"
                                  : "px-5 py-3"
                              }`}
                              onClick={() => setSizeIsActive(size)}
                              htmlFor={size}
                            >
                              {size}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-10">
                    <h3 className="flex gap-4 font-bold font-rob">
                      {/* how to change hex color to name */}
                      COLOR: <span>{color}</span>{" "}
                    </h3>
                    <div className=" flex gap-3 items-center">
                      {product[0].color.map((color: string) => (
                        <div key={color}>
                          <input
                            className="hidden"
                            type="checkbox"
                            name="color"
                            id={color}
                            value={color}
                            onChange={handleColor}
                          />

                          <div className="mt-4">
                            <label
                              className={` border rounded-[2px] ${
                                colorIsActive === color
                                  ? "px-4 py-2 text-white bg-[#1D1F22]"
                                  : "px-4 py-2"
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
                  <div className="pt-4 pb-3 font-bold mt-3 text-[#1D1F22]">
                    <h3 className="">PRICE:</h3>
                    <p className="py-1 text-[1.5rem]">
                      {/* // convert EUR to NGN ? */}
                      {formatMoney(item.price)}
                    </p>
                  </div>
                  {item.productQuantity > 0 ? (
                    <button
                      onClick={() => {
                        handleAddToCart(item);
                      }}
                      className="bg-color-primary hover:bg-[#000] duration-200 font-semibold text-white text-center w-full py-2 rounded-[2px]"
                    >
                      ADD TO CART
                    </button>
                  ) : (
                    <button
                      disabled
                      className="bg-gray-600 font-semibold text-white text-center w-full py-2 rounded-[2px]"
                    >
                      OUT OF STOCK
                    </button>
                  )}
                  <p className="pt-5 font-rob">{item.description}</p>
                </div>
              </div>
            </article>
          </div>
        );
      })}
    </article>
  );
};

export default WomenProducts;

// getstaticprops with data?

export async function getStaticProps({ params }: any) {
  const product = products.women.filter((product) => product.id === params.id);
  return {
    props: {
      product,
    },
  };
}

//getStaticPaths
export const getStaticPaths = async () => {
  const paths = await products.women.map((product) => ({
    params: { id: product.id },
  }));
  return {
    paths,
    fallback: false,
  };
};
