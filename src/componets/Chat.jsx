import React from 'react'
import socket from '../socket'

export const Chat = ({ users, messages, username, roomId, onAddMessage }) => {
    const [text, setText] = React.useState('')
    const messagesRef = React.useRef(null)

    // отправить на бэк socket событие ROOM:NEW_MESSAGE
    const onSendMessage = () => {
        socket.emit('ROOM:NEW_MESSAGE', {
            text,
            username,
            roomId
        })
        // поменять state на клиенте
        onAddMessage({ username, text })
        setText('')
    }

    React.useEffect(() => {
        messagesRef.current.scrollTo(0, 99999)
    }, [messages])

    return (
        <div className="flex h-full flex-col justify-center items-center">
            <div className="max-w-[500px] flex border h-[400px]">
                <div className="w-1/3 bg-gray-200 px-4">
                    <h1 className="text-ellipsis text-center mt-2 mb-2 font-bold overflow-hidden border-b-slate-300 border pb-2">
                        Комната:
                        <br />
                        {roomId}
                    </h1>
                    <hr className="bg-black" />
                    <h2 className="text-center mt-2 mb-2 font-bold">Онлайн({users.length}):</h2>
                    <ul
                        className="flex flex-col">
                        {users.map(name => (
                            <li
                                key={name}
                                className="bg-gray-100 py-1 w-full rounded-sm mb-2 pl-2">
                                {name}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="w-2/3 bg-slate-100 flex flex-col">
                    <div
                        ref={messagesRef}
                        className="flex flex-col p-4 overflow-auto">
                        {
                            messages.map((message, idx) => (
                                <div
                                    key={idx}
                                    className="mb-3">
                                    <div className="bg-green-600 p-2 rounded-md mb-1">{message.text}</div>
                                    <div className="text-gray opacity-50 text-xs">{message.username}</div>
                                </div>
                            ))
                        }

                    </div>
                    <div className="bg-white mt-auto p-4">
                        <form
                            onSubmit={e => e.preventDefault()}>
                            <textarea
                                onChange={e => setText(e.target.value)}
                                value={text}
                                className='border w-full resize-none p-2' />
                            <button
                                onClick={onSendMessage}
                                className="py-2 px-4 bg-slate-500 text-white rounded-lg hover:bg-slate-400">
                                Отправить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
