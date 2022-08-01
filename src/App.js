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

  // при клике на button
  const onLogin = async (obj) => {
    // установить новый state
    dispatch({
      type: 'JOINED',
      payload: obj
    })
    // будем отправлять socket событие на бэк
    socket.emit('ROOM:JOIN', obj)
    // отправляем запрос на роут
    // вернет объект с полями users и messages
    // если такой комнаты нет, поля будут пустыми массивами
    const { data } = await axios.get(`/rooms/${obj.roomId}`)
    dispatch({
      type: 'SET_DATA',
      payload: data
    })
  }

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users
    })
  }

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message
    })
  }

  /// если придет socket событие ROOM:SET_USERS
  /// отправить dispatch setUsers
  /// установит payload в поле users
  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers)
    // когда с бэка придет новое сообщение
    // установить payload в поле messages
    socket.on('ROOM:NEW_MESSAGE', addMessage)
  }, [])

  return (
    <div className="container mx-auto h-screen">
      {
        !state.joined
          ? <JoinBlock onLogin={onLogin} />
          : <Chat {...state} onAddMessage={addMessage} />
      }
    </div>
  );
}

export default App;
