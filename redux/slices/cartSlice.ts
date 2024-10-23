import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface cart {
  products: any[],
  quantity: number,
  total: number
}

const initialState: cart = {
  products: [],
  quantity: 0,
  total: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<any>) => {

      state.quantity += 1;
      state.total += action.payload.price

      const found = state.products.find((i)=> {return i.name == action.payload.product.name})
      if (found) {
        found.quantity += 1
      } else {
      state.products.push(action.payload.product);
      }
    },
    reduceProductQuantity: (state, action: PayloadAction<any>) => {
      state.quantity -= 1;
      state.total -= action.payload.price;
      const found = state.products.find((i)=> {return i.name == action.payload.product.name})
      if (found) {
        found.quantity -= 1;
        // console.log(found.quantity)
        if (found.quantity == 0) {
          const index = state.products.findIndex((i) => i.name == found.name)
          state.products.splice(index, 1)
        }
      } else {
        null
      }
    },
    increaseProductQuantity: (state, action: PayloadAction<any>) => {
      state.quantity += 1;
      state.total += action.payload.price;
      const found = state.products.find((i)=> {return i.name == action.payload.product.name})
      if (found) {
        found.quantity += 1;
        // console.log(found.quantity)
        if (found.quantity == 0) {
          const index = state.products.findIndex((i) => i.name == found.name)
          state.products.splice(index, 1)
        }
      } else {
        null
      }
    }
  },
})

// Action creators are generated for each case reducer function
export const { addProduct, reduceProductQuantity, increaseProductQuantity } = cartSlice.actions

export default cartSlice.reducer