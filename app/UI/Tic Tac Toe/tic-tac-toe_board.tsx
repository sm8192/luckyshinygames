'use client'

import { useState, useEffect } from "react";

interface ticTacToeBoardProps {
    boardId: number
}

export default function TicTacToeBoard({ boardId }: ticTacToeBoardProps) {
    const [loading, setLoading] = useState(true)
    const [boardState, setBoardState] = useState<string[][]>([["", "", ""], ["", "", ""], ["", "", ""]]);
    const [players, setPlayers] = useState<object>({ X: "", O: "" });
    const [activePlayer, setActivePlayer] = useState<string>("");

    useEffect(() => {
        const fetchTTTBoardData = (id: number) => {
            fetch('/api/tic-tac-toe?id=' + id)
                .then((res) => res.json())
                .then((data) => {
                    setLoading(false);
                    setBoardState(data[0].board_state);
                    setPlayers(data[0].players);
                    setActivePlayer(data[0].active_player);
                });
        }

        fetchTTTBoardData(boardId);

    }, [boardId])



    return (
        <div>
            {loading ?
                <div>Loading...</div> :
                <div>Tic Tac Toe Board</div>}
        </div>
    )
}