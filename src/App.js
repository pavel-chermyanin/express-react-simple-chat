import axios from 'axios'
import socket from './socket'
import React from 'react';
import { JoinBlock } from './componets/JoinBlock';
import reducer from './reducer'
import { Chat } from './componets/Chat';


function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    username: null,
    users: [],
    messages: [],
  })

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj
    })
    // будем отправлять сокеты на бэк-сокеты
    socket.emit('ROOM:JOIN', obj)
    const {data} = await axios.get(`/rooms/${obj.roomId}`)
    setUsers(data.users)
  }

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users
    })
  }

  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers)
  }, [])

  return (
    <div className="container mx-auto h-screen">
      {
        !state.joined 
        ? <JoinBlock onLogin={onLogin} />
          : <Chat {...state}/>
      }
    </div>
  );
}
window.socket = socket

export default App;
