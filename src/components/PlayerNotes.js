import React, { Component } from "react";
import { Tabs } from "react-bootstrap";
import { Tab } from "react-bootstrap";

import "../styles/PlayerNotes.css";

class PlayerNotes extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      key: 1
    };
  }

  handleSelect = key => {
    this.setState({ key });
  };

  render() {
    return (
      <div className="tabs">
        <Tabs
          activeKey={this.state.key}
          onSelect={this.handleSelect}
          id="controlled-tab"
        >
          <Tab eventKey={1} title="Notes">
            Tab 1 content
          </Tab>
          <Tab eventKey={2} title="Analytics">
            Tab 2 content
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default PlayerNotes;
