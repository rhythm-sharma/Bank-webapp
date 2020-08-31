import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import { Document, Page } from "react-pdf";
import { secureStorage } from "../../../utils/clientStorage/clientStorage";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: "Date",
          field: "date",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Document",
          field: "document",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Preview",
          field: "preview",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Amount",
          field: "amount",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Status",
          field: "status",
          sortable: true,
          filter: true,
        },
      ],
      rowData: this.props.userObj.capital,
      file: null,
      gridApi: null,
    };
  }

  componentDidMount() {
    const { file } = this.state;
    console.log(JSON.parse(localStorage.getItem("file")));
    this.setState({
      file: JSON.parse(localStorage.getItem("file")),
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.updateTable !== this.props.updateTable) {
      console.log(this.props.userObj.capital);
      this.state.gridApi.setRowData(this.props.userObj.capital);
      this.props.setUpdateTable(false);
    }
  }

  onGridReady = (params) => {
    this.setState({
      gridApi: params.api,
    });
  };

  render() {
    const { file } = this.state;
    return (
      <div className="ag-theme-alpine table-container">
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          onGridReady={this.onGridReady}
        ></AgGridReact>
        {/* {file && <Document file={file.path}></Document>} */}
      </div>
    );
  }
}

export default DataTable;
