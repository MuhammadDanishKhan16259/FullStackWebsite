var mongoose = require("mongoose");
// const mongoAtlasUri = `mongodb://localhost:27017/basic`;
const mongoAtlasUri = `mongodb+srv://Danish123:Danish123@cluster0.wlfra1b.mongodb.net/?retryWrites=true&w=majority`;
function mongooseConnection() {
  try {
    // Connect to the MongoDB cluster
    mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log("Mongoose is connected")
    );
  } catch (e) {
    console.log("could not connect");
  }
  const dbConnection = mongoose.connection;
  dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
  dbConnection.once("open", () => console.log("Connected to DB!"));
}

module.exports = mongooseConnection;
