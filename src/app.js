const express = require("express");
const app = express();
const PUERTO = 8080;
const exphbs = require("express-handlebars");
const socket = require("socket.io");

//Middleware
app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.get("/", (req, res) => {
    res.render("index")
})

//Listen
const httpServer = app.listen(PUERTO, () => {
    console.log("Escuchando en el puerto" + PUERTO)
})

//Instancia Socket del lado del backend
const io = new socket.Server(httpServer);

let messages = [];

//Establecemos la conexion 
io.on("connection", (socket) => {
    console.log("Nuevo usuario conectado");

    socket.on("message", (data) => {
        messages.push(data)
     io.emit("messagesLogs", messages);
    })
})

