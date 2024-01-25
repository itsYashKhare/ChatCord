const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//setting static folder
app.use(express.static(path.join(__dirname, "public")));

const botName = "ChatCord Bot";

// Running when client connects
io.on("connection", (socket) => {
  // console.log("New WebSocket Connection...");

  socket.on("joinroom" , ({ username, room}) => {

  });

  // Welcome current user
  socket.emit("message", formatMessage(botName, "Welcome to ChatCord!"));

  // Broadcast when the  user connects
  socket.broadcast.emit(
    "message",
    formatMessage(botName, "A user has joined the chat")
  );

  // Runs when clients disconnects
  socket.on("disconnect", () => {
    io.emit("message", formatMessage(botName, "A user left the chat"));
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    io.emit("message", formatMessage("USER", msg));
  });
});

const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running on ${PORT}`));
