const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const users = require('./routes/users')
const auth = require('./routes/auth')
const app = express();

app.use(cors());
dotenv.config();

const port = process.env.PORT || 5000;

async function run() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ajito.mongodb.net/giftify?retryWrites=true&w=majority`
      //   {
      //     useNewUrlParser: true,
      //     useFindAndModify: false,
      //     useUnifiedTopology: true,
      //   }
    );
    console.log(`🛢️ database connected successfully!`);
    app.listen(port, () => {
      console.log(`Server is running on ${port} port`);
    });
  } catch (error) {
    console.log(`Field to connect database`, error);
  }
}

run();

app.use(express.json());
app.use("/api/users", users);
app.use("/api/auth", auth);
