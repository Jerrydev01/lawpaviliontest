import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface productState {
 cartItems: any[]
}

const initialState: productState = {
cartItems: []
};

// add to cart


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
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, decreaseFromCart, removeFromCart } = productSlice.actions;

export default productSlice.reducer;
