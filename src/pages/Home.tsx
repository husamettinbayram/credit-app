// import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch, useSelector } from "react-redux";

import customerData from "../types/customerData";
import itemType from "../types/itemType";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import { deleteCustomer } from "../redux/Slices/customerSlice";
import { deleteCustomerItems } from "../redux/Slices/itemSlice";

import Header from "../components/Header";
function Home() {
  const { customerState, itemState } = useSelector((e: any) => e);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  // called by handleDeleteCustomer, not directly
  function callRecursiveDelete(listOfIDs: number[], customerID: number) {
    if (listOfIDs.length !== 0) {
      axios
        .delete(`http://localhost:4000/items/${listOfIDs[0]}`)
        .then(() => callRecursiveDelete(listOfIDs.slice(1),customerID));
    }else{
      axios.delete(`http://localhost:4000/customers/${customerID}`)
      .then(()=> {console.log("customer deleted")})
    }
  }

  // function handleDeleteCustomer(id: number) {
  function handleDeleteCustomer(custID: number) {
    // console.log(id);
    // console.log("hello");
    dispatch(deleteCustomer(custID));
    dispatch(deleteCustomerItems(custID));
    // console.log("deletecustomer")

    const liste = itemState
      .filter((item: itemType) => item.buyerId === custID)
      .map((item: itemType) => item.id);
      callRecursiveDelete(liste, custID);
  }

  return (
    <div>
      <Header pageName="home" />

      <div className="container">
        <h2>HOMEPAGE</h2>

        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Address</th>
              <th scope="col">Phone</th>
              <th scope="col">Debt</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {customerState.map((item: customerData, index: number) => {
              return (
                <tr key={index}>
                  <th scope="row">{index}</th>
                  <td onClick={() => navigate(`/customer/${item.id}`)}>
                    {item.name}
                  </td>
                  <td>{item.address}</td>
                  <td>{item.phone}</td>
                  <td>{item.debt + item.debtAtStart}</td>
                  <td>
                    {" "}
                    <button
                      onClick={() => {
                        handleDeleteCustomer(item.id);
                      }}
                    >
                      DEL
                    </button>{" "}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
