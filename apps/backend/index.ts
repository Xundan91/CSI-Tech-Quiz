import express from "express";
import routes from "./routes";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();
var bodyParser = require('body-parser')

const app = express();

app.use(express.json());
const allowedOrigins = ['http://localhost:8081','http://localhost:8080','http://localhost:3000', 'https://techo-pedia-csi.vercel.app','https://csi-tech-quiz.onrender.com'];
app.use(cors({ origin: allowedOrigins }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", routes);
 
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
