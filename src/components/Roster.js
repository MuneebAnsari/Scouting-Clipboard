import React from "react";
import * as ReactBootstrap from "react-bootstrap";
import "../styles/Roster.css";

const Roster = props => (
  <div className="roster__container">
    <ReactBootstrap.Panel bsStyle="primary">
      <ReactBootstrap.Panel.Heading>
        <ReactBootstrap.Panel.Title componentClass="h3">
          MY ROSTER
        </ReactBootstrap.Panel.Title>
      </ReactBootstrap.Panel.Heading>
      {props.roster.map((currPlayer, i) => {
        return (
          <div key={i} className="roster__players">
            <ReactBootstrap.ListGroupItem>
              {currPlayer.name}

              <ReactBootstrap.Button
                onClick={() => props.updateRoster.remove(currPlayer.name)}
                className="remove"
              >
                <ReactBootstrap.Glyphicon glyph="remove" />
              </ReactBootstrap.Button>
              <div className="notes-btn">
                <ReactBootstrap.OverlayTrigger
                  placement="top"
                  overlay={tooltip}
                >
                  <ReactBootstrap.Button className="comment">
                    <ReactBootstrap.Glyphicon glyph="comment" />
                  </ReactBootstrap.Button>
                </ReactBootstrap.OverlayTrigger>
              </div>
            </ReactBootstrap.ListGroupItem>
          </div>
        );
      })}
    </ReactBootstrap.Panel>
  </div>
);
export default Roster;

const tooltip = (
  <ReactBootstrap.Tooltip id="tooltip">
    <strong>Add Comments</strong>
  </ReactBootstrap.Tooltip>
);
