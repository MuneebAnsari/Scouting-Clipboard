const express = require("express");
//const mongoose = require("mongoose");

const app = express();

//const db = require("./config/keys").mongoURI;

// mongoose
//   .connect(db)
//   .then(() => console.log("Connected to Mongo successfully..."))
//   .catch(err => console.log(err));

app.get("/api/players", (req, res) => {
  const players = [
    { id: 1, name: "LeBron James" },
    { id: 2, name: "Kevin Durant" },
    { id: 3, name: "James Harden" }
  ];
  res.json(players);
});

const port = 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
