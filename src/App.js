import React, { Component } from "react";

// Helper functions
import Helpers from "./helpers";

// Styling
import "./App.css";

// Components
import SearchForm from "./components/SearchForm";
import PlayerInfo from "./components/PlayerInfo";
import Playlist from "./components/Playlist";
import Roster from "./components/Roster";
import PlayerNotes from "./components/PlayerNotes";

// Youtube API
const API_KEY = "AIzaSyCi8kNgg4PEcJ0xzBPadQ-OVB9SMdsRFQQ";
const MAX_RESULTS = 5;

class App extends Component {
  constructor(props) {
    super(props);

    /* create copy of getPlayerData and pass the context 
    we want getPlayerData to bind to. The context for getPlayerData is now 
    App */
    this.getPlayerData = this.getPlayerData.bind(this);

    this.state = {
      players: [],
      highlights: [],
      roster: [],
      firstName: "",
      lastName: ""
    };
  }

  // Grab players currently in roster
  componentDidMount() {
    fetch("/api/players")
      .then(res => res.json())
      .then(roster => this.setState({ roster }));
  }

  async getPlayerData(e) {
    //e.preventDefault();

    // format player entry
    const player = e.target.elements.player.value.split(" ");
    const firstName = player[0].toLowerCase().trim();
    const lastName = player[1].toLowerCase().trim();

    // Make API call
    try {
      const response = await fetch(
        `https://nba-players.herokuapp.com/players-stats/${lastName}/${firstName}`
      );

      // Check if input is a valid nba player (valid response)
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const currPlayerData = await response.json();

      // Fix team acronym for Utah Jazz
      Helpers.fixTeamAcronym(currPlayerData, "uth", "uta");
      // Fix team acronym for Phoenix Suns
      Helpers.fixTeamAcronym(currPlayerData, "pho", "phx");
      // Fix team acronym for New Orleans Pelicans
      Helpers.fixTeamAcronym(currPlayerData, "nor", "nop");
      // Fix team acronym for Brooklyn Nets
      Helpers.fixTeamAcronym(currPlayerData, "bro", "bkn");

      this.setState({ players: [currPlayerData] });
      this.setState({ firstName });
      this.setState({ lastName });
    } catch (error) {
      console.log("Not an NBA player!!!!");
    }

    console.log(this.state.players);
  }

  getHighlights = e => {
    e.preventDefault();

    /*************ERROR CHECK FOR ONLY FIRST NAME*************/
    // format player entry
    const player = e.target.elements.player.value.split(" ");
    const firstName = player[0].toLowerCase().trim();
    const lastName = player[1].toLowerCase().trim();

    var highlightQuery = `${firstName} ${lastName} highlights`;
    var URL = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${MAX_RESULTS}&order=viewcount&q=${highlightQuery}&type=video+&videoDefinition=high&key=${API_KEY}`;

    //Make API call
    fetch(URL)
      .then(response => response.json())
      .then(highlightsData => {
        console.log(highlightsData);

        // Iterate over highlightsData and for each highlight extract its thumbnail, title, video.
        const highlights = highlightsData.items.map(highlight => {
          return {
            thumbnail: highlight.snippet.thumbnails.default.url,
            title: highlight.snippet.title,
            video: `https://www.youtube.com/embed/${highlight.id.videoId}`
          };
        });
        this.setState({ highlights });
        console.log(this.state.highlights);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // Update the roster by adding a player to the roster or removing a player from the roster
  updateRoster = {
    add: () => {
      //Check if player already in roster
      var playerInRoster = Helpers.isPlayerInRoster(
        this.state.roster,
        this.state.players
      );

      // Only update the state of the roster if the player is not already in the roster
      if (!playerInRoster) {
        if (this.state.roster.length < 5) {
          this.setState({
            roster: [...this.state.roster, ...this.state.players]
          });
        }
      }
    },

    remove: player => {
      var roster = this.state.roster;
      for (var i = 0; i < roster.length; i++) {
        if (roster[i].name === player) {
          roster.splice(i, 1);
          console.log(`Removed ${player} from roster`);
        }
      }
      this.setState({ roster });
    }
  };

  render() {
    return (
      <div className="App">
        <SearchForm
          getPlayerData={this.getPlayerData}
          getHighlights={this.getHighlights}
          highlights={this.state.highlights}
        />

        <PlayerInfo
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          players={this.state.players}
          updateRoster={this.updateRoster}
        />

        <Roster
          roster={this.state.roster}
          updateRoster={this.updateRoster}
          players={this.state.players}
        />

        <Playlist
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          highlights={this.state.highlights}
        />

        <PlayerNotes />
      </div>
    );
  }
}

export default App;
