var mongoose = require("mongoose");

async function getEnvConfig() {
  const mongodb = process.env.MONGODB_DB;

  return {
    mongodb,
  };
}

function getMongoConnection() {
  let url = process.env.MONGODB;
  try {
    console.log("Connecting to", url);
    mongoose.connect(url);
    var db = mongoose.connection;

    db.on("error", function (err) {
      console.error("Failed to connect to database");
      process.exit(1);
    });

    db.once("open", function () {
      console.log("Connected to Mongo Successfully");
      return true;
    });
  } catch (error) {
    console.error("MongoDB Connection Error. Make sure MongoDB is running.", error);
    return false;
  }
}

module.exports = {
  getEnvConfig,
  getMongoConnection,
};
