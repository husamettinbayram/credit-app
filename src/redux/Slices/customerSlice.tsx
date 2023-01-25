import { createSlice } from "@reduxjs/toolkit";
import customerData from "../../types/customerData";

const initialState: customerData[] = [];

const customerSlice = createSlice({
  name: "customerSlice",
  initialState: initialState,
  reducers: {
    updateList: (state, action) => {
      return action.payload;
    },
    addCustomer: (state, action) => {
      return [...state, action.payload];
    },

    // payload <=> customer id
    deleteCustomer: (state, action) => {
      let temp: customerData[] = [];

      state.map((item: customerData) => {
        if (item.id !== action.payload) {
          temp = [...temp, item]
        }
      });
      console.log("deletecustomerSlice")
      return temp
    },

    // action.payload refers to the customer data to be updated in the store
    updateCustomer: (state, action) => {
      let temp: customerData[] = [];
      state.map((item: customerData) => {
        if (item.id !== action.payload.id) {
          temp = [...temp, item];
        } else {
          temp = [...temp, action.payload];
        }
      });

      return temp;
    },

    // alternative way to update customer.
    // payload parameter1: payload.index ---- refers to the index of the customer to be updated
    // payload parameter2: payload.edittedCustomer ----- refers to the new customer info

    // unused - finding the index parameter at the calling function side, may be harder
    updateCustomerAlt: (state, action) => {
      state[action.payload.index] = action.payload.edittedCustomer;
    },
  },
});

export default customerSlice.reducer;

export const { addCustomer, updateList, updateCustomer, updateCustomerAlt, deleteCustomer } =
  customerSlice.actions;
