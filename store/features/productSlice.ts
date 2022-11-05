import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export interface productState {
  cartItems: any[];
  currency: {
    id: number;
    name: string;
  }[];
}
//  cookies  defined in next js

// const initialState: productState = {
//   cartItems: Cookies.get("cartItems")
//     ? JSON.parse(Cookies.get("cartItems")!)
//     : [],
// };
const initialState: productState = {
  cartItems: [],
  currency: [
    {
      id: 1,
      name: "NGN",
    },
    {
      id: 2,
      name: "USD",
    },
    {
      id: 3,
      name: "EUR",
    },
  ],
};

// how to glabally change currency using redux

// localstorage in reduxjs

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const isProductInCart = state.cartItems.find(
        (item: any) => item.id === product.id
      );
      if (isProductInCart) {
        isProductInCart.quantity += 1;
      } else {
        state.cartItems.push({
          ...product,
          quantity: 1,
        });
      }

      Cookies.set("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseFromCart: (state, action) => {
      const product = action.payload;
      const isProductInCart = state.cartItems.find(
        (item: any) => item.id === product.id
      );
      if (isProductInCart) {
        isProductInCart.quantity -= 1;
        if (isProductInCart.quantity === 0) {
          state.cartItems = state.cartItems.filter(
            (item: any) => item.id !== product.id
          );
        }
      }

      Cookies.set("cartItems", JSON.stringify(state.cartItems));
    },

    //  remove item from cart
    removeFromCart: (state, action) => {
      const product = action.payload;
      const isProductInCart = state.cartItems.find(
        (item: any) => item.id === product.id
      );
      if (isProductInCart) {
        state.cartItems = state.cartItems.filter(
          (item: any) => item.id !== product.id
        );
      }
    },
    // how to convert currency
    // 
    changeCurrencies: (state, action: PayloadAction<number>) => {
      //   const currency = action.payload;
      //   state.currency = currency;
      state.currency = state.currency.map((currency) => {
        if (currency.id === action.payload) {
          return {
            ...currency,
            selected: true,
          };
        } else {
          return {
            ...currency,
            selected: false,
          };
        }
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, decreaseFromCart, removeFromCart, changeCurrencies } =
  productSlice.actions;

export default productSlice.reducer;
