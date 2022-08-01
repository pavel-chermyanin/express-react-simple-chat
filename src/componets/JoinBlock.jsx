import axios from 'axios'
import React, { useRef } from 'react'


export const JoinBlock = ({ onLogin }) => {
    const [roomId, setRoomID] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const roomTextRef = useRef()

    const onEnter = async () => {
        if (!roomId || !username) {
            return alert('Неверные данные')
        }
        const obj = {
            roomId,
            username
        }
        setIsLoading(true)
        await axios.post('/rooms', obj)

        onLogin(obj)    
    }

    const submitForm = (e) => {
        if (e.code === 'Enter') {
            onEnter()
        }
    }

    React.useEffect(() => {
        window.addEventListener('keydown', submitForm)
    
      return () => {
          window.removeEventListener('keydown', submitForm)
      }
    }, [])


    
    return (
        <div className="max-w-[300px] mx-auto h-full flex flex-col justify-center">
            <input
                ref={roomTextRef}
                onChange={e => setRoomID(e.target.value)}
                value={roomId}
                placeholder='Room ID'
                className="w-auto bg-gray-200 text-black
          py-2 px-4 mb-2 text-base"
                type="text"
            />
            <input
                onChange={e => setUsername(e.target.value)}
                value={username}
                placeholder='Ваше Имя'
                className="w-auto bg-gray-200 text-black
          py-2 px-4 mb-4 text-base"
                type="text"
            />
            <button
                disabled={isLoading}
                onClick={onEnter}
                className='border-none bg-slate-500 text-white text-lg py-2 px-4 rounded-sm'
            >
                {isLoading ? 'ВХОД...' : 'ВОЙТИ'}
            </button>
        </div>
    )
}
