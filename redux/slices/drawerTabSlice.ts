import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface SelectedTab {
  tab: string
}

const initialState: SelectedTab = {
  tab: 'Collection',
}

export const drawerTabSlice = createSlice({
  name: 'drawerTab',
  initialState,
  reducers: {
    selectTab: (state, action: PayloadAction<string>) => {
      state.tab = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { selectTab } = drawerTabSlice.actions

export default drawerTabSlice.reducer