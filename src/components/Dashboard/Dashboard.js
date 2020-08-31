import React from "react";
import { Component } from "react";
import Navigation from "../Shared/Nav/Nav";
import Nav from "react-bootstrap/Nav";
import Transactions from "../Pages/Transactions/Transactions";
import Capital from "../Pages/Capital/Capital";
import "./Dashboard.css";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      activeTab: "transactions",
    };
  }

  handleActiveTab = (activeTabName) => {
    this.setState({
      activeTab: activeTabName,
    });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <div className="">
        <Navigation />
        <div className="mt-5 nav-pill-container">
          <Nav variant="pills" defaultActiveKey="/home">
            <Nav.Item
              className={activeTab === "capital" && "outline"}
              onClick={() => this.handleActiveTab("transactions")}
            >
              <Nav.Link active={activeTab === "transactions" ? true : false}>
                Transactions
              </Nav.Link>
            </Nav.Item>
            <Nav.Item
              className={`ml-5 ${activeTab === "transactions" && "outline"}`}
              onClick={() => this.handleActiveTab("capital")}
            >
              <Nav.Link active={activeTab === "capital" ? true : false}>
                Capital
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
        <div className="mt-5">
          {activeTab === "capital" && <Capital />}
          {activeTab === "transactions" && <Transactions />}
        </div>
      </div>
    );
  }
}

export default Dashboard;
