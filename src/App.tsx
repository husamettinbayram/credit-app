import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

// pages
import Home from "./pages/Home";
import Movements from "./pages/Movements";
import Reports from "./pages/Reports";
import Customer from "./pages/Customer";

// components
import Header from "./components/Header";
import Add from "./pages/AddCustomer";

// types
import customerData from "./types/customerData";

// redux imports
import { useDispatch } from "react-redux/es/hooks/useDispatch";
import { updateList} from "./redux/Slices/customerSlice";
import { updateItems } from "./redux/Slices/itemSlice";

function App() {

  const dispatch  = useDispatch()
  // const [list, setList] = useState<customerData[]>([]);

  useEffect(() => {
    axios.get("http://localhost:4000/customers").then((response) => {
      // console.log(response)
      // setList(response.data);
      dispatch(updateList(response.data))

      console.log("server request")
      return null;
    });
  }, [dispatch]);

  useEffect(() => {
    axios.get("http://localhost:4000/items").then((response) => {

      dispatch(updateItems(response.data))
      console.log("server request")
      return null;
    });
  }, [dispatch]);
// bu dispatch'i değendency list'e eklememi istedi  bir hata veya bir sorun vermedi ekleyince de


  return (
    <div className="container">
      {/* <Header /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/add-customer" element={<Add />}></Route>
          <Route path="/movements" element={<Movements />}></Route>
          <Route path="/reports" element={<Reports />}></Route>
          <Route path="/customer/:customerID" element={<Customer />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
