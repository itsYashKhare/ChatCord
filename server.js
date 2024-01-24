const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//setting static folder
app.use(express.static(path.join(__dirname, "public")));

// Running when client connects
io.on("connection", (socket) => {
  // console.log("New WebSocket Connection...");

  // Welcome current user
  socket.emit("message", "Welcome to ChatCord!");

  // Broadcast when the  user connects
  socket.broadcast.emit("message", "A user has joined the chat");

  // Runs when clients disconnects
  socket.on("disconnect", () => {
    io.emit("message", "A user left the chat");
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    io.emit("message", msg);
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
