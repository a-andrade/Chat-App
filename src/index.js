// s17.152 \\
const path = require('path')
const http = require('http')
const express = require('express')
// s17.154 \\
const socketio = require('socket.io')

const app = express()
// s17.154 \\
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

// let count = 0

// server (emit) --> client (recieve) --> countUpdated
// client (emit) --> server (recieve) --> increment

// s17.154 \\
io.on('connection', (socket) => {
    console.log('New websocket connection!')
    
    // s17.155 \\
    // socket.emit('countUpdated', count)

    // socket.on('increment', () => {
    //     count++
    //     //socket.emit('countUpdated', count)
    //     io.emit('countUpdated', count)
    // })

    // s17.156 \\
    // challenge
    socket.emit('message', 'Welcome!')

    // s17.157 \\
    socket.broadcast.emit('message', 'A new user has joined!')

    // s17.156 \\
    // challenge
    socket.on('sendMessage', (message) => {
        io.emit('message', message)
    })

    // s17.158 \\
    // challenge
    socket.on('sendLocation', (location) => {
        io.emit('message', `https://google.com/maps/?q=${location.latitude}, ${location.longitude}`)
    })

    // s17.157 \\
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left.')
    })
})

server.listen(port, () => {
    console.log('Server is up on port: ' + port)
})