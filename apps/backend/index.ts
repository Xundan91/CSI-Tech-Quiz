import express from "express";
import routes from "./routes";
import dotenv from "dotenv";
import cors from "cors"
import {WebSocket ,WebSocketServer  } from 'ws'
import http from 'http'
import { log } from "console";
dotenv.config();
var bodyParser = require('body-parser')


const app = express();

app.use(express.json());
const allowedOrigins = ['http://localhost:8081','http://localhost:8080','http://localhost:3000', 'https://techo-pedia-csi.vercel.app','https://csi-tech-quiz.onrender.com'];
app.use(cors({ origin: allowedOrigins }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", routes);
 
const server = http.createServer(function(req, res){
  res.end("server connnect")
})

const wss = new WebSocketServer({server})

wss.on("connection", function connection(socket){
  socket.on("error" , console.error)

  socket.on("message", function foreach(data){
    wss.clients.forEach(function(client){
      if( client.readyState === WebSocket.OPEN){
        client.send(data)

      }
      
    })
  })
  socket.send("Hello from webserver")

}
)
wss.on("connection", function(socket){
  socket.on("error", console.error)
  socket.on("message", function client(data){
    wss.clients.forEach(function(client){
      if(client.readyState === WebSocket.OPEN){
        client.send(data)
      }
    })
  })
})
server.listen(3000 , ()=>{
  console.log("server lisening");
  
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
