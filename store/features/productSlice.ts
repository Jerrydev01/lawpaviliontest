import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export interface productState {
  cartItems: any[];
}
//  cookies  defined in next js

const initialState: productState = {
  cartItems: Cookies.get("cartItems")
    ? JSON.parse(Cookies.get("cartItems")!)
    : [],
};

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

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, decreaseFromCart, removeFromCart } =
  productSlice.actions;

export default productSlice.reducer;
