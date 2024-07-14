const express = require("express"); 
const app = express();  
const socketio = require("socket.io");
const http = require("http");
const path = require("path");

const server = http.createServer(app); 
const io = socketio(server); 

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

io.on("connection", function(socket){ 
    console.log("A user connected");

    socket.on("send-location", function(data){ 
        io.emit("receive-location", {id: socket.id, ...data});
    });

   
});

app.get("/", function(req, res){ 
    res.render("index");
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
