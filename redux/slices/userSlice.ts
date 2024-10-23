import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface userState {
  user: any,
  language: String,
  country: any,
  currency: any
}

const initialState: userState = {
  user: {},
  language: 'English',
  country: {"code": "GB", "code3": "GBR", "name": "United Kingdom", "number": "826"},
  currency: {code: 'GBP', symbol: '£'},
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateLocation: (state, action: PayloadAction) => {
        state.country = action.payload
    },
    updateCurrency: (state, action: PayloadAction<any>) => {
        state.currency = action.payload
    },
    updateLanguage: (state, action: PayloadAction<String>) => {
        state.language = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { updateCurrency, updateLanguage, updateLocation } = userSlice.actions

export default userSlice.reducer