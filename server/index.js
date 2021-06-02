const express = require('express')
const socketio = require('socket.io')
const http = require('http')

const PORT = process.env.PORT || 5000

const router = require('./router')

const app = express()
const server = http.createServer(app)
const io = socketio(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  })


io.on('connection', (socket)=>{
    console.log("New Connection -->")

    socket.on('join', ({ name, room }, callback)=>{
        const message =  `${name} joined the room ${room}`
        console.log(message)
        callback(message);
    })

    socket.on('disconnect', ()=>{
        console.log('<-- User left')
    })
})

app.use(router)

server.listen(PORT, ()=> console.log(`Server has started on port ${PORT}`))
