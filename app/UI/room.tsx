'use client'

import { useState, useEffect } from "react";
import TicTacToeBoard from "./Tic Tac Toe/tic_tac_toe_board";

interface roomProps {
    game: string,
    boardId: number
}

export default function Room({ game, boardId }: roomProps) {
    

    return (
        <div>
            {JSON.stringify({game, boardId})}
        </div>
    )
}