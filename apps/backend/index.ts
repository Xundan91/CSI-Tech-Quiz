import express from "express";
import routes from "./routes";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();
var bodyParser = require('body-parser')

const app = express();

app.use(express.json());
 
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", routes);
 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
