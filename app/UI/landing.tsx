'use client'

import { useState, useEffect, SubmitEvent } from "react";
import Room from "./room";

export default function Landing() {
    const [game, setGame] = useState<string>('');
    const [boardId, setBoardId] = useState<number>(-1);
    const [roomCode, setRoomCode] = useState('');

    useEffect(() => {
        console.log("fetching, roomCode is " + roomCode);
        const fetchRoomData = (code: string) => {
            fetch('/api/room?room_id=' + code)
                .then((res) => res.json())
                .then((data) => {
                    console.log("data is " + JSON.stringify(data));
                    setGame(data.game);
                    setBoardId(data.board_id);
                })
        }

        if (roomCode) {
            console.log("before the fetch");
            try {
                fetchRoomData(roomCode);
            } catch (error) {
                console.log("Error is " + error);
            }
            console.log('after the fetch');
        }
    }, [roomCode])

    const roomCodeSubmit = (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const newRoomCode = String(formData.get("room-code"));

        setRoomCode(newRoomCode);
    }

    return (
        <div className="m-8">
            {game ?
                <Room game={game} boardId={boardId} /> :
                <form className="flex flex-col items-center" onSubmit={roomCodeSubmit}>
                    <h5>Enter room code:</h5>
                    <div>
                        <input id='room-code-input'
                            name="room-code"
                            type="text"
                            className="outline outline-slate-200 m-2 rounded-xs text-center"></input>
                    </div>
                    <div>
                        <button className="outline-2 outline-slate-200 rounded-xl p-2 m-2"
                            type='submit'>Enter Room</button>
                    </div>
                </form>
            }
        </div>
    )
}