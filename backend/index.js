const express = require("express")
const app = express()
const http = require("http").createServer(app)
const cors = require("cors")
app.use(cors())
app.get("/", async (req, res) => {
    res.send("Hello from group chat")
})
const io = require("socket.io")(http, {
    cors: {
        origin: '*',
    }
})
io.on("connection", socket => {
    socket.join("OpenChat");
    // socket.emit("msg", "connected from server msg")
    console.log(socket.id,)
    socket.on("msg", (data) => {
        console.log(data)
        socket.to("OpenChat").emit("msg", data)
    })
})

http.listen(8000, () => { console.log("socket server started") })