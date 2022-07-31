import React from 'react'

export const Chat = ({ users, messages }) => {
    const [text, setText] = React.useState('')

    return (
        <div className="flex h-full flex-col justify-center items-center">
            <div className="max-w-[500px] flex border h-[400px]">
                <div className="w-1/3 bg-gray-200 px-4">
                    <h1 className="text-center mt-2 mb-2">Онлайн({users.length}):</h1>
                    <ul className="flex flex-col">
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
                    <div className="flex flex-col p-4 overflow-auto">
                        <div className="mb-3">
                            <div className="bg-green-600 p-2 rounded-md">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, sint.</div>
                            <div className="text-gray">test user</div>
                        </div>
                        <div className="mb-3">
                            <div className="bg-green-600 p-2 rounded-md">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, sint.</div>
                            <div className="">test user</div>
                        </div>
                        <div className="mb-3">
                            <div className="bg-green-600 p-2 rounded-md">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, sint.</div>
                            <div className="">test user</div>
                        </div>
                        <div className="mb-3">
                            <div className="bg-green-600 p-2 rounded-md">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi, sint.</div>
                            <div className="">test user</div>
                        </div>
                    </div>
                    <div className="bg-white mt-auto p-4">
                        <form>
                            <textarea
                                onChange={e => setText(e.target.value)}
                                value={text}
                                className='border w-full resize-none p-2' />
                            <button
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
