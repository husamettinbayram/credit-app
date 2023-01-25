import { FormEvent, useRef, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { addCustomer } from "../redux/Slices/customerSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../components/Header";

import customerData from "../types/customerData";

function AddCustomer() {
  const formRef = useRef<HTMLFormElement>(null);
  const { customerState } = useSelector((e: any) => e);
  const dispatch = useDispatch();
  const alertText: string = "please fill all the fields";
  let newCustomer: customerData;

  let customerName: string = "";
  let customerAddress: string = "";
  let customerPhone: string = "";
  let customerDebt: number = 0;

  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!customerName || !customerAddress || !customerPhone) {
      alert(alertText);
      return;
    }
    newCustomer = {
      id: new Date().getTime(),
      No: Math.floor(Math.random() * 10e5),
      name: customerName,
      address: customerAddress,
      phone: customerPhone,
      debtAtStart: customerDebt,
      debt: 0,
    };

    axios
      .post("http://localhost:4000/customers", newCustomer)
      .then(() => {
        dispatch(addCustomer(newCustomer));
        if (formRef.current !== null) {
          formRef.current.reset();
        }
        navigate("/");
      })
      .catch(() => {
        alert("error");
      });

    // console.log(customer)
  }

  return (
    <div>
      <Header pageName="addcustomer"></Header>
      <div className="container">
        <h2>Add Customer</h2>
        <form onSubmit={handleSubmit} ref={formRef}>
          <div className="mb-3">
            <label htmlFor="customerName" className="form-label">
              Customer / Company Name
            </label>
            <input
              type="text"
              className="form-control"
              id="customerName"
              onChange={(e) => {
                customerName = e.target.value;
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => {
                customerAddress = e.target.value;
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Telephone
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                customerPhone = evt.target.value;
              }}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="debtField" className="form-label">
              Opening debt
            </label>
            <input
              type="number"
              className="form-control"
              id="debtField"
              onChange={(evt: ChangeEvent<HTMLInputElement>) => {
                customerDebt = evt.currentTarget.valueAsNumber;
              }}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        {/* 
      {customerState.map((item: customerData, index: number) => {
        return (
          <div key={index}>
            <span>{index} </span>
            <span>{item.name} </span>
            <span>{item.address} </span>
            <span>{item.phone} </span>
          </div>
        );
      })} */}
      </div>
    </div>
  );
}

export default AddCustomer;
