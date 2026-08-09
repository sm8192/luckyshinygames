'use client'

import TicTacToeBoard from "./Tic Tac Toe/tic-tac-toe_board";

interface roomProps {
    game: string,
    boardId: number
}

export default function Room({ game, boardId }: roomProps) {
    const chooseBoard = (game: string) => {
        switch (game) {
            case 'tic-tac-toe':
                return <TicTacToeBoard boardId={boardId} />
            default:
                return <div>Error: Game not found</div>
        }
    }

    return (
        <div>
            {chooseBoard(game)}
        </div>
    )
}