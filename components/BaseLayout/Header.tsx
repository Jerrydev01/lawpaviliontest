import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../../assets/logo.svg";
import cart from "../../assets/cart.svg";
import CartModal from "../Cart/CartModal";
import { useSelector } from "react-redux";

interface LinksProps {
  name?: string;
  href?: string;
  id?: string;
}

const links: LinksProps[] = [
  {
    id: "1",
    name: "Women",
    href: "category/women",
  },
  {
    id: "2",
    name: "men",
    href: "category/men",
  },
  {
    id: "3",
    name: "Kids",
    href: "category/kids",
  },
];

const currencies = [
  {
    id: "1",
    name: "NGN",
    currency: "₦",
  },
  {
    id: "5",
    name: "USD",
    currency: "$",
  },
  {
    id: "2",
    name: "EUR",
    currency: "€",
  },
  {
    id: "3",
    name: "JPY",
    currency: "¥",
  },
];

const Header = () => {
  const [active, setActive] = useState<string>("");
  const [currency, setCurrency] = useState(currencies);
  const [show, setShow] = useState<boolean>(false);

  const { cartItems } = useSelector((state: any) => state.product);

  const router = useRouter();

  // active link in nextjs
  React.useEffect(() => {
    setActive(router.pathname);
  }, [router]);

  // const handleCurrency = (item: any) => {
  //   setCurrency(item);
  // };

  // change currency state
  const changeCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCurrency = e.target.value;
    const newCurrency = currencies.map((item) => {
      if (item.name === selectedCurrency) {
        return {
          ...item,
          selected: true,
        };
      } else {
        return {
          ...item,
          selected: false,
        };
      }
    });
    setCurrency(newCurrency);
  };

  const handleShowModal = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  // how to create a tailwind css overlay for the cart modal

  return (
    <section className="fixed w-full z-[50]">
      <section className="relative py-6 z-40 bg-white w-full">
        <nav className="container py-6 flex justify-between items-center">
          <ul className="flex lg:gap-8 gap-4 uppercase">
            {links.map((link) => {
              return (
                <li key={link.id}>
                  <Link
                    className={
                      active === `/${link.href}`
                        ? "border-b-2 border-[#5ECE7B] text-color-primary pb-2"
                        : ""
                    }
                    onClick={() => setActive(`/${link.href}`)}
                    href={`/${link.href}`}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link href="/cart" className="">
            <Image src={logo} alt="logo" width={32} height={30} />
          </Link>
          <div className="flex gap-3 items-center">
            <div className="">
              {/* gow to style select input */}
              <select
                className="bg-transparent border-none focus:outline-none py-2"
                name="currency"
                id="currency"
                onChange={changeCurrency}
              >
                {currency.map((item) => {
                  return (
                    //  {/* gow to style select option from blue*/}
                    <option
                      className=" px-3 border-none focus:outline-none bg-white text-[#1F2937] py-10 mt-2"
                      key={item.id}
                      value={item.currency}
                    >
                      {item.currency} {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <button onClick={handleShowModal} className="">
              <Image src={cart} alt="logo" width={20} height={20} />
              <span className="absolute top-6 translate-x-3 -mt-2 -mr-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.reduce(
                  (total: any, item: any) => total + item.quantity,
                  0
                )}{" "}
              </span>
            </button>
          </div>
        </nav>
      </section>
      {/* // how to create a tailwind css overlay for the cart modal */}
      {show ? (
        <>
          <div
            onClick={() => setShow(!show)}
            className="fixed top-0 right-0 bottom-0 left-0 bg-[#37374987]  z-10"
          ></div>
          <div className="relative mt-10 -translate-y-10 float-right xl:-translate-x-[8rem] z-20 bg-white px-4 text-left py-3">
            <CartModal />
          </div>
        </>
      ) : null}
    </section>
  );
};

export default Header;
