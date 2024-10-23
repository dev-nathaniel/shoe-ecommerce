import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface wishList {
  products: any[],
}

const initialState: wishList = {
  products: [],
}

export const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addWishProduct: (state, action: PayloadAction<any>) => {
      state.products.push(action.payload.product);
        
    },
    removeWishProduct: (state, action: PayloadAction<any>) => {
      const found = state.products.find((i)=> {return i.name == action.payload.product.name})
      const index = state.products.findIndex((i) => i.name == found.name)
      state.products.splice(index, 1)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addWishProduct, removeWishProduct } = wishListSlice.actions

export default wishListSlice.reducer