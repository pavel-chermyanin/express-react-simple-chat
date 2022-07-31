
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

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// DB
const rooms = new Map()

// Routes
app.get('/rooms/:id', (req, res) => {
    const roomId = req.params.id
    const obj = {
        users: [...rooms.get(roomId).get('users').values()],
        messages: [...rooms.get(roomId).get('messages').values()],
    }
    res.json(obj)
})
app.post('/rooms', (req, res) => {
    const { roomId, username } = req.body
    if (!rooms.has(roomId)) {
        rooms.set(roomId, new Map([
            ['users', new Map()],
            ['messages', []],
        ]))
    }
    res.send()
})

// будет создаваться специальный объект для каждого user
io.on('connection', socket => {
    // наш сокет ждет событие, которое придет с клиета
    socket.on('ROOM:JOIN', ({roomId ,username}) => {
        // сервер поключит user к выбранной комнате
        socket.join(roomId)
        rooms.get(roomId).get('users').set(socket.id,username)
        const users = [...rooms.get(roomId).get('users').values()]
        // отправить запрос всем user из roomId
        // broadcast кроме меня
        socket.broadcast.to(roomId).emit('ROOM:SET_USERS', users)
    })

    socket.on('disconnect', () => {
        rooms.forEach((value, roomId) => {
            // перебрать все room, в каждой room получить всех user
            // и удалить user по socket.id
            if(value.get('users').delete(socket.id)) {
                const users = [...value.get('users').values()]
                socket.broadcast.to(roomId).emit('ROOM:SET_USERS', users)
            }
        })
    })

    console.log('user connected', socket.id);
})
console.log(rooms);


server.listen(9999, (error) => {
    if (error) {
        throw Error(error)
    }
    console.log('server started!!')
})