require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const loginRoute = require("./routes/login");
const clientRoute = require("./routes/client");
const wordsRoute = require("./routes/word");
const tradingRoute = require("./routes/trading");
const path = require("path"); // Import the path module
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());
app.use("/api/auth", loginRoute);
app.use("/api/client", clientRoute);
app.use("/api/words", wordsRoute);
app.use("/api/trading", tradingRoute);

app.use(express.static(path.join(__dirname, "admin-view/dist")));

// Handle SPA
app.get("/admin", (req, res) => {
  res.sendFile(path.join(__dirname, "admin-view/dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
