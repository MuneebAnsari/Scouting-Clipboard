const helpers = {
  /*
    Fix team acronym as required to obtain image of team's
    logo from https://i.cdn.turner.com/nba/nba/.element/img/1.0/logos/teamlogos_500x500/${obj.team_acronym}.png
    in PlayerInfo component.
  */
  fixTeamAcronym: function(playerData, currAcronym, newAcronym) {
    if (playerData.team_acronym === currAcronym) {
      playerData.team_acronym = newAcronym;
    }
  },

  showVideo: function(title, video) {
    const videoHighlight = document.getElementById("video__container");
    const videoHeight = document.querySelector(".playlist__container");
    const videoWidth = document.querySelector(".info__container");

    videoHighlight.innerHTML = `<iframe title=${title} 
                                width=${videoWidth.clientWidth * 0.65} 
                                height=${videoHeight.clientHeight - 5} 
                                src=${video} 
                                frameBorder="0" 
                                allow="encrypted-media" allowFullScreen></iframe>`;
  },

  hideVideo: function() {
    const videoContainer = document.getElementById("video__container");
    videoContainer.innerHTML = "";
  },

  isPlayerInRoster: function(roster, player) {
    // Check if player already in roster
    var playerInRoster = false;
    for (var i = 0; i < roster.length; i++) {
      if (roster[i].name === player[0].name) {
        playerInRoster = true;
      }
    }
    return playerInRoster;
  },

  config: function() {
    const tabs = document.getElementsByClassName("tabs");
    const rosterContainer = document.getElementsByClassName(
      "roster__container"
    );
    const playlistContainer = document.getElementsByClassName(
      "playlist__container"
    );
    tabs[0].style.display = "block";
    rosterContainer[0].style.display = "block";
    playlistContainer[0].style.display = "block";
  }
};
export default helpers;
