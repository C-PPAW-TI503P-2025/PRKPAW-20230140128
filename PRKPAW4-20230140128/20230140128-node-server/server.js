const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;
const morgan = require("morgan");

const presensiRoutes = require("./routes/presensi");
const reportRoutes = require("./routes/reports");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Home Page for API");
});

app.use("/api/presensi", presensiRoutes);
app.use("/api/reports", reportRoutes);

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}/`);
});
