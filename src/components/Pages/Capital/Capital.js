import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { Form, Button } from "react-bootstrap";
import { secureStorage } from "../../../utils/clientStorage/clientStorage";
import DataTable from "./Table";
import "./Capital.css";

class Capital extends Component {
  constructor() {
    super();
    this.state = {
      userObj: secureStorage.getItem(sessionStorage.currentUser),
      capitalForm: [
        {
          name: "document",
          value: "",
          options: ["Driver’s license", "PAN card", "Adhar card"],
          error: "",
        },
        {
          name: "amount",
          value: "",
          error: "",
        },
        {
          name: "fileUpload",
          value: "",
          error: "",
        },
      ],
      updateTable: false,
    };
  }

  componentDidMount() {
    const { capitalForm } = this.state;
    let tempCapitalForm = capitalForm;
    tempCapitalForm[0].value = tempCapitalForm[0].options[0];
    this.setState({
      capitalForm: tempCapitalForm,
    });
  }

  setUpdateTable = (updateTable) => {
    this.setState({
      updateTable: updateTable,
    });
  };

  resetAnimation = (index) => {
    const { capitalForm } = this.state;
    let tempCapitalForm = capitalForm;
    tempCapitalForm[index].error = "";
    this.setState({ capitalForm: tempCapitalForm });
  };

  handleDocumentChange = (e) => {
    const { capitalForm } = this.state;
    let tempCapitalForm = capitalForm;
    tempCapitalForm[0].value = e.target.value;
    this.setState({ capitalForm: tempCapitalForm });
    // reset animation
    if (tempCapitalForm[0].value !== "" || tempCapitalForm[0].value !== null) {
      this.resetAnimation(0);
    }
  };

  handleAmountChange = (e) => {
    const { capitalForm } = this.state;
    let tempCapitalForm = capitalForm;
    tempCapitalForm[1].value = e.target.value;
    this.setState({ capitalForm: tempCapitalForm });
    // reset animation
    if (tempCapitalForm[1].value !== "" || tempCapitalForm[1].value !== null) {
      this.resetAnimation(1);
    }
  };

  handleFileUploadChange = (e) => {
    const { capitalForm } = this.state;
    let tempCapitalForm = capitalForm;
    tempCapitalForm[2].value = e.target.value;
    this.setState({ capitalForm: tempCapitalForm });
    // reset animation
    if (tempCapitalForm[2].value !== "" || tempCapitalForm[2].value !== null) {
      this.resetAnimation(2);
    }
  };

  handleSubmit = () => {
    const { capitalForm } = this.state;
    let tempCapitalForm = capitalForm;
    let valid = true;

    // Validation
    tempCapitalForm.forEach((item) => {
      if (item.value === "" || item.value === null) {
        if (item.name === "document") {
          item.error = "Document field is required";
          valid = false;
        } else if (item.name === "amount") {
          item.error = "Amount field is required";
          valid = false;
        } else if (item.name === "fileUpload") {
          item.error = "File is required";
          valid = false;
        }
      } else {
        item.error = "";
      }
    });

    this.setState({ capitalForm: tempCapitalForm });

    if (valid) {
      const { userObj } = this.state;
      let tempUserObj = userObj;

      let today = new Date();
      let dd = String(today.getDate()).padStart(2, "0");
      let mm = String(today.getMonth() + 1).padStart(2, "0");
      let yyyy = today.getFullYear();

      today = mm + "/" + dd + "/" + yyyy;

      tempUserObj.capital.push({
        date: today,
        document: capitalForm[0].value,
        preview: "",
        amount: capitalForm[1].value,
        status: "in progress",
      });

      this.setState({
        userObj: tempUserObj,
        updateTable: true,
      });

      secureStorage.setItem(userObj.username, userObj);

      // Reset all the form values
      let resetCapitalForm = capitalForm;

      resetCapitalForm = [
        {
          name: "document",
          value: "",
          options: ["Driver’s license", "PAN card", "Adhar card"],
          error: "",
        },
        {
          name: "amount",
          value: "",
          error: "",
        },
        {
          name: "fileUpload",
          value: "",
          error: "",
        },
      ];

      resetCapitalForm[0].value = tempCapitalForm[0].options[0];
      this.setState({
        capitalForm: resetCapitalForm,
      });
    }
  };

  render() {
    const { userObj, capitalForm, updateTable } = this.state;

    let documentOptions = capitalForm[0].options.map((item, index) => {
      return <option key={index}>{item}</option>;
    });

    return (
      <div className="capital-container">
        <div className="capital-form">
          <h4 className="text-center">Upload Document</h4>
          <Form
            className="form-container mt-5 ml-auto mr-auto mt-5"
            onClick={(event) => event.preventDefault()}
          >
            <Form.Group>
              <Form.Label>Document</Form.Label>
              <Form.Control
                className={`${capitalForm[0].error !== "" ? "error" : ""}`}
                as="select"
                onChange={this.handleDocumentChange}
                value={capitalForm[0].value}
              >
                {documentOptions}
              </Form.Control>
              <div className="error-message">{capitalForm[0].error}</div>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Amount(₹)</Form.Label>
              <Form.Control
                className={`${capitalForm[1].error !== "" ? "error" : ""}`}
                type="number"
                placeholder="₹"
                name="Amount"
                onChange={this.handleAmountChange}
                value={capitalForm[1].value}
              />
              <div className="error-message">{capitalForm[1].error}</div>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>File Upload</Form.Label>
              <Dropzone
                className={`${capitalForm[2].error !== "" ? "error" : ""}`}
                onDrop={(acceptedFiles) => {
                  const fileObject = acceptedFiles[0];

                  const newObject = {
                    lastModified: fileObject.lastModified,
                    lastModifiedDate: fileObject.lastModifiedDate,
                    name: fileObject.name,
                    path: fileObject.path,
                    size: fileObject.size,
                    type: fileObject.type,
                  };
                  const { capitalForm } = this.state;
                  let tempCapitalForm = capitalForm;

                  tempCapitalForm[2].value = newObject;

                  this.setState({ capitalForm: tempCapitalForm });
                  // reset animation
                  if (
                    tempCapitalForm[2].value !== "" ||
                    tempCapitalForm[2].value !== null
                  ) {
                    this.resetAnimation(2);
                  }
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p className="drag-drop text-center text-truncate mb-0">
                        {(capitalForm[2].value && capitalForm[2].value.name) ||
                          "Drop File Here"}
                      </p>
                    </div>
                  </section>
                )}
              </Dropzone>
              <div className="error-message">{capitalForm[2].error}</div>
            </Form.Group>

            <div className="d-flex mt-2">
              <Button
                className="ml-auto mr-auto "
                variant="primary"
                type="submit"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
        <div className="capital-table d-flex justify-content-center">
          <DataTable
            userObj={userObj}
            updateTable={updateTable}
            setUpdateTable={this.setUpdateTable}
          />
        </div>
      </div>
    );
  }
}

export default Capital;
