import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
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
          headerName: "Beneficiary Name",
          field: "beneficiaryName",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Payment type",
          field: "paymentType",
          sortable: true,
          filter: true,
        },
        {
          headerName: "Amount",
          field: "amount",
          sortable: true,
          filter: true,
        },
      ],
      rowData: this.props.userObj.transaction,
      gridApi: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.updateTable !== this.props.updateTable) {
      this.state.gridApi.setRowData(this.props.userObj.transaction);
      this.props.setUpdateTable(false);
    }
  }

  onGridReady = (params) => {
    this.setState({
      gridApi: params.api,
    });
  };

  render() {
    return (
      <div className="ag-theme-alpine table-container">
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          onGridReady={this.onGridReady}
        ></AgGridReact>
      </div>
    );
  }
}

export default DataTable;
