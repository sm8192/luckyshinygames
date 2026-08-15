'use client'

import { useState, SubmitEvent } from "react";
import Room from "./room";
import GameSelect from "./game_select";
import RoomEntryForm from "./room_entry_form";

export default function Landing() {
    const [game, setGame] = useState<string>('');
    const [boardId, setBoardId] = useState<number>(-1);
    const [roomCode, setRoomCode] = useState<string>('');
    const [roomNotFound, setRoomNotFound] = useState<boolean>(false);

    const roomCodeSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const enteredRoomCode = String(formData.get("room-code"));

        const response = await fetch('/api/room?room_id=' + enteredRoomCode, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            if (data[0] && data[0].game && data[0].board_id) {
                setRoomNotFound(false);
                setRoomCode(enteredRoomCode);
                setGame(data[0].game);
                setBoardId(data[0].board_id);
            } else {
                setRoomNotFound(true);
            }
        }
    }

    const postRoom = async (code: string) => {
        const response = await fetch('/api/room', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ room_id: code })
        });

        if (response.ok) {
            setRoomCode(code);
        }
    }

    const createNewRoom = async () => {
        let roomCode;
        let roomCodeExists = true;
        const characters = 'abcdefghijklmnopqrstuvwxyz';

        do {
            roomCode = '';

            for (let i = 0; i < 6; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                const randomChar = characters[randomIndex];
                roomCode += randomChar;
            }

            const response = await fetch('/api/room/exists?room_id=' + roomCode, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (!data[0].exists) {
                roomCodeExists = false;
            }

        } while (roomCodeExists)

        postRoom(roomCode);
    }

    const createTicTacToeBoard = async () => {
        /*
        const response = await fetch('/api/tic-tac-toe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });

        if (response.ok) {
            const data = await response.json();
            return data[0].id;
        } else {
            return -1;
        }
            */
    }

    const patchRoomData = async (roomId: string, gameId: string, boardId: number) => {
        /*
        const response = await fetch('/api/room', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ room_id: roomId, game_id: gameId, board_id: boardId })
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
            */
    }

    const chooseGame = async (game: string) => {
        if (game === 'tic-tac-toe') {
            console.log('in the if');
            /*
            const boardId = await createTicTacToeBoard();

            if (boardId != -1) {

                const patchSuccess = await patchRoomData(roomCode, game, boardId);

                if (patchSuccess) {
                    setBoardId(boardId);
                }
            }
                */
        }

        //setGame(game);
    }

    return (
        <div className="m-8">
            {!roomCode ?
                <RoomEntryForm roomCodeSubmit={roomCodeSubmit} roomNotFound={roomNotFound} createNewRoom={createNewRoom} /> :
                <div>
                    {!game || !boardId ?
                        <GameSelect chooseGame={chooseGame} /> :
                        <Room game={game} boardId={boardId} />}
                </div>}
        </div>
    )
}