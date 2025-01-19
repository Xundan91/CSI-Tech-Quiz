import express from "express";
import routes from "./routes";
import dotenv from "dotenv";
import cors from "cors"

dotenv.config();
var bodyParser = require('body-parser')


const app = express();

app.use(express.json());
const allowedOrigins = [
  'http://localhost:8081', 
  'http://localhost:8080', 
  'http://localhost:3000', 
  'http://localhost:3001', 
  'https://techo-pedia-csi.vercel.app', 
  'https://csi-tech-quiz.onrender.com',
  'http://3.108.63.218:8081'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true, 
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", routes);


app.get("/",(req:any, res:any)=>{
  res.status(200).json({
    msg : "finnaly"
  })
})
const PORT =  8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
