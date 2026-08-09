'use client'

import { useState, useEffect } from "react";

interface ticTacToeBoardProps {
    boardId: number
}

export default function TicTacToeBoard({ boardId }: ticTacToeBoardProps) {
    const [loading, setLoading] = useState(true)
    const [boardState, setBoardState] = useState<string[][]>([["", "", ""], ["", "", ""], ["", "", ""]]);

    useEffect(() => {
        const fetchTTTBoardData = (id: number) => {
            fetch('/api/tic-tac-toe?id=' + id)
                .then((res) => res.json())
                .then((data) => {
                    setLoading(false);
                    console.log("ttt data is " + JSON.stringify(data));
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