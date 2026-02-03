const express = require("express");
const cors = require("cors");
const uploadRoutes = require("./src/routes/upload.routes");
const app = express();
app.use(cors());
app.use("/api", uploadRoutes);
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend is running successfully");
});
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
