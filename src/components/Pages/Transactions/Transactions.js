import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { secureStorage } from "../../../utils/clientStorage/clientStorage";
import DataTable from "./Table";
import "./Transactions.css";

class Transactions extends Component {
  constructor() {
    super();
    this.state = {
      userObj: secureStorage.getItem(sessionStorage.currentUser),
      transactionsForm: [
        {
          name: "from",
          value: {},
          options: [],
          error: "",
        },
        {
          name: "to",
          value: {},
          options: [],
          error: "",
        },
        {
          name: "amount",
          value: "",
          error: "",
        },
      ],
      updateTable: false,
    };
  }

  componentDidMount() {
    const { userObj, transactionsForm } = this.state;

    let tempTransactionsForm = transactionsForm;

    tempTransactionsForm[0].options = userObj.from;
    tempTransactionsForm[0].value = `${userObj.from[0].name} (account: ${userObj.from[0].accountNumber})`;

    tempTransactionsForm[1].options = userObj.to;
    tempTransactionsForm[1].value = `${userObj.to[0].name} (account: ${userObj.to[0].accountNumber})`;

    this.setState({
      transactionsForm: tempTransactionsForm,
    });
  }

  setUpdateTable = (updateTable) => {
    this.setState = {
      updateTable: updateTable,
    };
  };

  resetAnimation = (index) => {
    const { transactionsForm } = this.state;
    let tempTransactionsForm = transactionsForm;
    tempTransactionsForm[index].error = "";
    this.setState({ transactionsForm: tempTransactionsForm });
  };

  handleFromChange = (e) => {
    const { transactionsForm } = this.state;
    let tempTransactionsForm = transactionsForm;
    tempTransactionsForm[0].value = e.target.value;
    this.setState({ transactionsForm: tempTransactionsForm });
    // reset animation
    if (
      tempTransactionsForm[0].value !== "" ||
      tempTransactionsForm[0].value !== null
    ) {
      this.resetAnimation(0);
    }
  };

  handleToChange = (e) => {
    const { transactionsForm } = this.state;
    let tempTransactionsForm = transactionsForm;
    tempTransactionsForm[1].value = e.target.value;
    this.setState({ transactionsForm: tempTransactionsForm });
    // reset animation
    if (
      tempTransactionsForm[1].value !== "" ||
      tempTransactionsForm[1].value !== null
    ) {
      this.resetAnimation(1);
    }
  };

  handleAmountChange = (e) => {
    const { transactionsForm } = this.state;
    let tempTransactionsForm = transactionsForm;
    tempTransactionsForm[2].value = e.target.value;
    this.setState({ transactionsForm: tempTransactionsForm });
    // reset animation
    if (
      tempTransactionsForm[2].value !== "" ||
      tempTransactionsForm[2].value !== null
    ) {
      this.resetAnimation(2);
    }
  };

  handleSubmit = () => {
    const { transactionsForm } = this.state;
    let tempTransactionsForm = transactionsForm;
    let valid = true;

    // Validation
    tempTransactionsForm.forEach((item) => {
      if (item.value === "" || item.value === null) {
        if (item.name === "from") {
          item.error = "From field is required";
          valid = false;
        } else if (item.name === "to") {
          item.error = "To field is required";
          valid = false;
        } else if (item.name === "amount") {
          item.error = "Amount field is required";
          valid = false;
        }
      } else {
        item.error = "";
      }
    });

    this.setState({ transactionsForm: tempTransactionsForm });

    if (valid) {
      const { userObj } = this.state;
      let tempUserObj = userObj;

      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0");
      let yyyy = today.getFullYear();

      today = mm + "/" + dd + "/" + yyyy;

      tempUserObj.transaction.push({
        date: today,
        beneficiaryName: transactionsForm[1].value
          .split(" ")
          .slice(0, 2)
          .join(" "),
        paymentType: "online",
        amount: transactionsForm[2].value,
      });

      this.setState({
        userObj: tempUserObj,
        updateTable: true,
      });

      secureStorage.setItem(userObj.username, userObj);

      // Reset all the form values
      let resetTransactionsForm = transactionsForm;

      resetTransactionsForm[0].value = `${userObj.from[0].name} (account: ${userObj.from[0].accountNumber})`;
      resetTransactionsForm[0].options = userObj.from;

      resetTransactionsForm[1].value = `${userObj.to[0].name} (account: ${userObj.to[0].accountNumber})`;
      resetTransactionsForm[1].options = userObj.to;

      resetTransactionsForm[2].value = "";

      console.log("resetTransactionsForm ", resetTransactionsForm);

      this.setState({
        transactionsForm: resetTransactionsForm,
      });
    }
  };

  render() {
    const { transactionsForm, userObj, updateTable } = this.state;

    let from =
      transactionsForm[0].options &&
      transactionsForm[0].options.map((item, index) => {
        return (
          <option
            key={index}
          >{`${item.name} (account: ${item.accountNumber})`}</option>
        );
      });

    let to =
      transactionsForm[1].options &&
      transactionsForm[1].options.map((item, index) => {
        return (
          <option
            key={index}
          >{`${item.name} (account: ${item.accountNumber})`}</option>
        );
      });

    return (
      <div className="transactions-container">
        <div className="transactions-form">
          <h4 className="text-center">New Transactions</h4>
          <Form
            className="form-container mt-5 ml-auto mr-auto mt-5"
            onClick={(event) => event.preventDefault()}
          >
            <Form.Group>
              <Form.Label>From</Form.Label>
              <Form.Control
                className={`${transactionsForm[0].error !== "" ? "error" : ""}`}
                as="select"
                value={transactionsForm[0].value}
                onChange={this.handleFromChange}
              >
                {from}
              </Form.Control>
              <div className="error-message">{transactionsForm[0].error}</div>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>To</Form.Label>
              <Form.Control
                className={`${transactionsForm[0].error !== "" ? "error" : ""}`}
                as="select"
                onChange={this.handleToChange}
                value={transactionsForm[1].value}
              >
                {to}
              </Form.Control>
              <div className="error-message">{transactionsForm[1].error}</div>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Amount(₹)</Form.Label>
              <Form.Control
                className={`${transactionsForm[2].error !== "" ? "error" : ""}`}
                type="number"
                placeholder="₹"
                name="Amount"
                onChange={this.handleAmountChange}
                value={transactionsForm[2].value}
              />
              <div className="error-message">{transactionsForm[2].error}</div>
            </Form.Group>
            <div className="d-flex mt-4">
              <Button
                className="ml-auto mr-auto "
                variant="primary"
                type="submit"
                onClick={this.handleSubmit}
              >
                Pay
              </Button>
            </div>
          </Form>
        </div>
        <div className="transactions-table d-flex justify-content-center">
          <DataTable
            userObj={userObj}
            transactionsForm={transactionsForm}
            updateTable={updateTable}
            setUpdateTable={this.setUpdateTable}
          />
        </div>
      </div>
    );
  }
}

export default Transactions;
