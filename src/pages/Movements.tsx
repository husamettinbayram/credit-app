import itemType from "../types/itemType";
// import customerData from "../types/customerData";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

import axios from "axios";

import Header from "../components/Header";

import { deleteItem } from "../redux/Slices/itemSlice";

// import { addItem, updateItems } from "../redux/Slices/itemSlice";

function Movements() {
  const { itemState ,customerState } = useSelector((e: RootState) => e);
  

  const dispatch = useDispatch();

  function handleDeleteItem(record: itemType) {
    axios.delete(`http://localhost:4000/items/${record.id}`).then(() => {
      axios
        .get(`http://localhost:4000/customers/${record.buyerId}`)
        .then((response) => {
          console.log(response.data)
          const currentCustomer = {...response.data, debt: response.data.debt - record.total}
          axios.put(`http://localhost:4000/customers/${record.buyerId}`, currentCustomer)
          .then(()=>{dispatch(deleteItem(record.id));})
        });
    });
  }

  return (
    <div>
      <Header pageName="moves"></Header>
      <div className="container">
        <div className="container" id="none">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th scope="col">Buyer</th>
                <th scope="col">Item</th>
                <th scope="col" className="text-center">
                  Date
                </th>
                <th scope="col" className="text-center">
                  Unit Price
                </th>
                <th scope="col" className="text-center">
                  Units
                </th>
                <th scope="col" className="text-end">
                  Total
                </th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {itemState.map((item: itemType, index: number) => {
                return (
                  <tr key={index}>
                    <th>{index}</th>
                    <td>{item.buyer}</td>
                    <td>{item.name}</td>
                    <td className="text-center">{`${(
                      "0" + item.createdDay
                    ).slice(-2)}/${"0" + item.createdMonth}/${
                      item.createdYear
                    } - ${("0" + item.createdHour).slice(-2)}:${(
                      "0" + item.createdMinute
                    ).slice(-2)}:${("0" + item.createdSecond).slice(-2)}`}</td>
                    <td className="text-center">{item.price} $</td>
                    <td className="text-center">{`${item.units} ${item.unitName}`}</td>
                    <td className="text-end">{item.total} $</td>
                    <td>
                      <div
                        className="btn-group"
                        role="group"
                        aria-label="Basic example"
                      >
                        <button
                          type="button"
                          className="btn btn-sm btn-warning"
                        >
                          EDIT
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => {
                            handleDeleteItem(item);
                          }}
                        >
                          DEL
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Movements;
