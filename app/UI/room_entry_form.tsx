'use client'

interface roomEntryFormProps {
    roomCodeSubmit: Function,
    roomNotFound: boolean,
    createNewRoom: Function
}

export default function RoomEntryForm({ roomCodeSubmit, roomNotFound, createNewRoom }: roomEntryFormProps) {
    return (
        <div>
            <form className="flex flex-col items-center" onSubmit={roomCodeSubmit()}>
                <h5>Enter room code:</h5>
                <div>
                    <input id='room-code-input'
                        name="room-code"
                        type="text"
                        className="outline outline-slate-200 m-2 rounded-xs text-center"></input>
                </div>
                {roomNotFound ?
                    <h4 className="text-red-500">Room not found</h4> :
                    <div className="hidden"></div>}
                <div>
                    <button className="outline-2 outline-slate-200 rounded-xl p-2 m-2"
                        type='submit'>Enter Room</button>
                </div>
                <div>
                    <button className="outline-2 outline-slate-200 rounded-xl p-2 m-2"
                        type='button'
                        onClick={createNewRoom()}>
                        Create New Room
                    </button>
                </div>
            </form>
        </div>
    )
}