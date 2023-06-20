const mongoose = require("mongoose");

mongood.connect(process.env.MONGODB_URI || "mongodb://localhost/skywatch", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

module.exports = mongoose.connection;