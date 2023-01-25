import { createSlice } from "@reduxjs/toolkit";
import itemType from "../../types/itemType";

const initialState: itemType[] = [];

const itemSlice = createSlice({
  name: "itemSlice",
  initialState: initialState,
  reducers: {
    updateItems: (state, action) => {
      return action.payload;
    },
    addItem: (state, action) => {
      return [...state, action.payload];
    },

    // buyerId should be passed from caller funciton ---- payload <=> buyerID
    deleteCustomerItems: (state, action) => {
      let temp: itemType[] = [];
      state.map((item: itemType) => {
        if (item.buyerId !== action.payload) {
          temp = [...temp, item];
        }
      })

      console.log("deletecustomerItem")
      return temp
    },

    // id of the item to be deleted should be passed
    deleteItem: (state, action) => {
      let temp: itemType[] = [];

      state.map((item: itemType) => {
        if (item.id !== action.payload) {
          temp = [...temp, item];
        }
      })
      

      return temp;
    },
  },
});

export default itemSlice.reducer;

export const { addItem, updateItems, deleteCustomerItems, deleteItem } =
  itemSlice.actions;
