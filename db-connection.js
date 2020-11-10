const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", () => console.log("Error while connecting to DB."));
db.once("open", () => console.log("Database connected successfully..."));

module.exports = db;
