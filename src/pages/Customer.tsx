import { FormEvent, ChangeEvent, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// redux storage dispatch functions
import { addItem, updateItems, deleteItem } from "../redux/Slices/itemSlice";
import {
  deleteCustomer,
  updateCustomer,
  updateCustomerAlt,
} from "../redux/Slices/customerSlice";

import axios from "axios";

// type imports
import customerData from "../types/customerData";
import itemType from "../types/itemType";
import { RootState } from "../redux/store";

import Header from "../components/Header";

// item input variables --- these variables will be set in the form elemnt
let idVar: number = 0;
let stockNoVar: number = 0; // ok
let nameVar: string = "";
// let priceVar: number = 0;
// let unitsVar: number = 0;
// let totalVar: number = 0;
// let unitNameVar: string = "pieces";
let unitNameVar: string = "none";

function Customer() {
  // states
  const [unitPrice, setUnitPrice] = useState<number>(0);
  const [units, setUnits] = useState<number>(1);
  // const [filtered, setFiltered] = useState<itemType[]>([]);

  // create hook
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //create

  // const formRef = useRef<HTMLFormElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // destructure param
  const { customerID } = useParams();

  // customerState is going to be taken and to be filterd later to extract required customer data
  const { customerState, itemState } = useSelector((e: RootState) => e);

  // filter -- destruct --- assign
  const [currentCustomer] = customerState.filter(
    (item: customerData) => item.id === Number(customerID)
  );

  // console.log(currentCustomer);

  // if page does not load, a link button to Home Page appears
  if (currentCustomer === undefined) {
    return (
      <button
        className="btn btn-primary"
        onClick={() => {
          navigate("/");
        }}
      >
        HOME
      </button>
    );
  }

  function itemFormHandle(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    // console.log("form çalıştı");

    if (
      nameVar === "" ||
      unitPrice === 0 ||
      units === 0 ||
      unitNameVar === "none"
    ) {
      return;
    }

    const time = new Date();
    const newItem: itemType = {
      buyer: currentCustomer.name,
      buyerId: currentCustomer.id,
      id: time.getTime(),
      createdYear: time.getFullYear(),
      createdMonth: time.getMonth() + 1,
      createdDay: time.getDate(),
      createdHour: time.getHours(),
      createdMinute: time.getMinutes(),
      createdSecond: time.getSeconds(),
      stockNo: stockNoVar,
      name: nameVar,
      price: unitPrice,
      units: units,
      total: unitPrice * units,
      unitName: unitNameVar,
    };
    // console.log(newItem);
    axios
      .post("http://localhost:4000/items", newItem)
      .then(() => {
        axios
          .put(`http://localhost:4000/customers/${customerID}`, {
            ...currentCustomer,
            debt: currentCustomer.debt + unitPrice * units,
          })
          .then(() => {
            dispatch(addItem(newItem));
            dispatch(
              updateCustomer({
                ...currentCustomer,
                debt: currentCustomer.debt + unitPrice * units,
              })
            );
          });
      })
      .catch((err) => console.log(err));

    // secure formRef. escape error
    if (formRef.current) {
      formRef.current.reset();
    }
  }

  function handleDeleteItem(
    itemID: number,
    buyerID: number,
    totalMinus: number
  ) {
    // console.log("handleDeleteItem");

    axios.delete(`http://localhost:4000/items/${itemID}`).then(() => {
      axios
        .put(`http://localhost:4000/customers/${customerID}`, {
          ...currentCustomer,
          debt: currentCustomer.debt - totalMinus,
        })
        .then(() => {
          dispatch(deleteItem(itemID));
        });
    });

 
  }

  return (
    <div>
      <Header pageName="none" />
      <div className="container">
        <h2 className="text-center border mt-1">
          {currentCustomer.name.toUpperCase()}
        </h2>
        <div className="d-grid gap-2">
          <button
            className="btn btn-secondary mt-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseDataForm"
          >
            Customer Details
          </button>
        </div>

        {/* Customer Info */}
        <form className="collapse" id="collapseDataForm">
          <fieldset disabled>
            <legend>Customer Details</legend>
            <div className="mb-3">
              <label htmlFor="name">Customer Title : </label>
              <input
                type="text"
                id="name"
                className="form-control"
                placeholder={currentCustomer.name}
              />

              <label htmlFor="No">Customer No : </label>
              <input
                type="text"
                id="No"
                className="form-control"
                placeholder={currentCustomer.No.toString()}
              />

              <label htmlFor="address">Address : </label>
              <input
                type="text"
                id="address"
                className="form-control"
                placeholder={currentCustomer.address}
              />

              <label htmlFor="phone">Contact : </label>
              <input
                type="text"
                id="phone"
                className="form-control"
                placeholder={currentCustomer.phone}
              />

              <label htmlFor="debt">DEBT : </label>
              <input
                type="text"
                id="debt"
                className="form-control"
                placeholder={(
                  currentCustomer.debt + currentCustomer.debtAtStart
                ).toString()}
              />
            </div>
          </fieldset>
        </form>

        {/* Customer Entry Button */}
        <div className="d-grid gap-2">
          <button
            className="btn btn-success mt-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseEntryForm"
            onClick={() => {
              if (formRef.current) {
                formRef.current.reset();
                setUnitPrice(0);
              }
            }}
          >
            Add Item
          </button>
        </div>

        {/* Customer Entry Field/form */}
        <form
          onSubmit={itemFormHandle}
          className="collapse"
          id="collapseEntryForm"
          ref={formRef}
        >
          {/* <h2>ADD ITEM</h2> */}
          <div className="mb-3 container">
            <label htmlFor="itemNo" className="form-label">
              Item Stock No (Optional)
            </label>
            <input
              type="number"
              className="form-control"
              id="itemNo"
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                stockNoVar = evt.target.valueAsNumber;
              }}
            />

            <label htmlFor="item" className="form-label">
              Item (Enter Item name)
            </label>
            <input
              type="text"
              className="form-control"
              id="item"
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                nameVar = evt.target.value;
              }}
            />

            <label htmlFor="unitPrice" className="form-label">
              Unit Price
            </label>
            <input
              type="number"
              className="form-control"
              id="unitPrice"
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                setUnitPrice(evt.target.valueAsNumber);
              }}
            />

            <label htmlFor="NoofUnits" className="form-label">
              Number of Units
            </label>
            <input
              type="number"
              className="form-control"
              id="NoofUnits"
              defaultValue={1}
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                setUnits(evt.target.valueAsNumber);
              }}
            />

            <label htmlFor="SelectUnit" className="form-label mt-2">
              {`Unit Type ->`}
            </label>

            <select
              className="form-select"
              id="SelectUnit"
              defaultValue={"none"}
              onChange={(event: ChangeEvent<HTMLSelectElement>) => {
                unitNameVar = event.target.value;
                console.log(unitNameVar);
              }}
            >
              <option value="pieces">pieces</option>
              <option value="box">box</option>
              <option value="kgs">kgs</option>
              <option value="liter">liter</option>
              <option value="set">set</option>
              <option value="tonnes">tonnes</option>
              <option value="cans">cans</option>
              <option value="meter">meter</option>
              <option value="none">Please select unit type</option>
            </select>

            {/* conditional render */}
            {units * unitPrice !== undefined &&
            units * unitPrice !== null &&
            !isNaN(units * unitPrice) ? (
              <h2 className="text-center">{`Total : ${
                units * unitPrice
              } $`}</h2>
            ) : (
              <h2 className="text-center">Total : 0 $</h2>
            )}
          </div>
          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>

        <div className="d-grid gap-2">
          <button
            className="btn btn-warning mt-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseMoves"
            onClick={() => {
              if (formRef.current) {
                formRef.current.reset();
                setUnitPrice(0);
              }
            }}
          >
            View Details
          </button>
        </div>

        <div className="collapse" id="collapseMoves">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Item</th>
                <th scope="col">Date</th>
                <th scope="col">Unit Price</th>
                <th scope="col">Units</th>
                <th scope="col">Total</th>
                <th scope="col"> Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {itemState
                .filter((item: itemType) => {
                  return item.buyerId === Number(customerID);
                })
                .map((item: itemType, index: number) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{`${("0" + item.createdDay).slice(-2)}/${
                        "0" + item.createdMonth
                      }/${item.createdYear} - ${("0" + item.createdHour).slice(
                        -2
                      )}:${("0" + item.createdMinute).slice(-2)}:${(
                        "0" + item.createdSecond
                      ).slice(-2)}`}</td>
                      <td>{item.price} $</td>
                      <td>{`${item.units} ${item.unitName}`}</td>
                      <td>{item.total} $</td>
                      <td>
                        <button className="btn btn-warning btn-sm">Edit</button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            handleDeleteItem(item.id, item.buyerId, item.total);
                          }}
                        >
                          Del
                        </button>
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

export default Customer;


