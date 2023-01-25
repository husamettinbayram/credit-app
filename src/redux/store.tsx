import { configureStore } from "@reduxjs/toolkit"
import customerSlice from "./Slices/customerSlice"
import itemSlice from "./Slices/itemSlice"

const store = configureStore({
    reducer:{
        customerState : customerSlice,
        itemState: itemSlice
    }
})

// console.log(store)

// buradaki Rootstate'i, useSelector'da tipi bulmak için export edip useSelector ile kaydolan componente taşımak için export ediyoruz
export type RootState = ReturnType<typeof store.getState>

export default store