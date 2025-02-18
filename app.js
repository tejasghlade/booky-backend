const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const bookRoutes = require("./routes/bookRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

// intiializa the express
const app = express();

// middlwares
app.use(express.json());

// Routes
// app.use("/", (req, res) => {
//   res.send("Hello Book Management system");
// });

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);

// Error handling middleware
app.use(errorHandler);

// connect to Mongodb
connectDB();

// start the server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
