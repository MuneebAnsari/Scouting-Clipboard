import React from "react";
import * as ReactBootstrap from "react-bootstrap";
import "../styles/PlayerInfo.css";

const PlayerInfo = props => (
  <div>
    {props.players.map((obj, i) => {
      return (
        <div className="info__container" key={i}>
          <img
            className="profileImg"
            src={`https://nba-players.herokuapp.com/players/${props.lastName}/${
              props.firstName
            }`}
            alt="Img not found"
          />
          <ReactBootstrap.OverlayTrigger placement="right" overlay={tooltip}>
            <ReactBootstrap.Glyphicon
              onClick={props.updateRoster.add}
              glyph="plus"
            />
          </ReactBootstrap.OverlayTrigger>

          <h2 className="player__name"> {obj.name} </h2>
          <div className="stats">
            <ul>
              <div className="main__stats">
                <li> PPG: {obj.points_per_game} </li>
                <li> APG: {obj.assists_per_game} </li>
                <li> RPG: {obj.rebounds_per_game} </li>
              </div>
              <div className="other__stats">
                <li> SPG: {obj.steals_per_game} </li>
                <li> BPG: {obj.blocks_per_game} </li>
                <li> TPG: {obj.turnovers_per_game} </li>
              </div>
            </ul>
            <img
              className="Logo"
              src={`https://i.cdn.turner.com/nba/nba/.element/img/1.0/logos/teamlogos_500x500/${
                obj.team_acronym
              }.png`}
              alt="Logo not found"
            />
          </div>
        </div>
      );
    })}
  </div>
);

export default PlayerInfo;

const tooltip = (
  <ReactBootstrap.Tooltip id="tooltip">
    <strong>Add to roster</strong>
  </ReactBootstrap.Tooltip>
);
