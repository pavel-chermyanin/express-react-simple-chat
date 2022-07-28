
const express = require('express')

const app = express();

// создаем сервер и говорим что оно будет работать через app
const server = require('http').Server(app)
// connecting socket.io
// здесь будет хранится вся инфа о сокетах
const io = require('socket.io')(server, {
    cors: {
        origin: '*'
    }
})

// DB
const rooms = new Map()

// Routes
app.get('/rooms', (req, res) => {
    res.json(rooms)
})

// будет создаваться специальный объект для каждого user
io.on('connection', socket => {
    console.log('user connected', socket);
})


server.listen(9999, (error) => {
    if (error) {
        throw Error(error)
    }
    console.log('server started!!')
})