'use client'

interface gameSelectProps {
    chooseGame: Function
}

export default function GameSelect({ chooseGame }: gameSelectProps) {

    return (
        <div className="flex flex-col items-center">
            <h5>Select a game:</h5>
            <button className="outline-2 outline-slate-200 rounded-xl p-2 m-2"
            onClick={() =>chooseGame('tic-tac-toe')}>
                Tic-Tac-Toe
            </button>
        </div>
    )
}