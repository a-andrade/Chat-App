// s17.152 \\
const path = require('path')
const http = require('http')
const express = require('express')
// s17.154 \\
const socketio = require('socket.io')
const Filter = require('bad-words')
// s17.163/4 \\
const { generateMessage, generateLocationMessage } = require('./utils/messages')
// s17.170 \\
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

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

    // s17.167 \\
    socket.on('join', ({ username, room }, callback) => {
        // s17.170 \\
        const { error, user } = addUser({ id: socket.id, username, room })

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        // s17.156 \\
        // challenge
        socket.emit('message', generateMessage('Welcome!'))

        // s17.157 \\
        socket.broadcast.to(user.room).emit('message', generateMessage(`${user.username} has joined!`))

        callback()
    })

    // s17.156 \\
    // challenge
    socket.on('sendMessage', (message, callback) => {
        // s17.159 \\
        const filter = new Filter()

        if (filter.isProfane(message)) {
            return callback('Profanity is not allowed!')
        }

        io.emit('message', generateMessage(message))
        callback('Message delivered.')
    })

    // s17.158 \\
    // challenge
    socket.on('sendLocation', (location, callback) => {
        io.emit('locationMessage', generateLocationMessage(`https://google.com/maps/?q=${location.latitude}, ${location.longitude}`))
        // s17.159 \\
        callback()
    })

    // s17.157 \\
    socket.on('disconnect', () => {
        // s17.170 \\
        const user = removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', generateMessage(`${user.username} has left the room.`))
        }
    })
})

server.listen(port, () => {
    console.log('Server is up on port: ' + port)
})

// socket.emit              --> sends event to specific client
// io.emit                  --> sends event ot every client
// socket.broadcast.emit    --> sends event to every client except this
// io.to.emit               --> sends event to every client in specific room
// socket.broadcast.to.emit --> sends event to every client except this, in specific room