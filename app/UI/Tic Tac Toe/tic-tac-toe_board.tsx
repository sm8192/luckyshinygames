'use client'

import { useState, useEffect } from "react";
import TicTacToeSpace from "./tic-tac-toe_space";

type spaceSymbol = 'X' | 'O' | '';

interface ticTacToeBoardProps {
    boardId: number
}

export default function TicTacToeBoard({ boardId }: ticTacToeBoardProps) {
    const [loading, setLoading] = useState(true)
    const [boardState, setBoardState] = useState<spaceSymbol[][]>([['', '', ''], ['', '', ''], ['', '', '']]);
    const [players, setPlayers] = useState<object>({ X: '', O: '' });
    const [activePlayer, setActivePlayer] = useState<spaceSymbol>('');
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [winner, setWinner] = useState<spaceSymbol>('');

    useEffect(() => {
        const fetchTTTBoardData = (id: number) => {
            fetch('/api/tic-tac-toe?id=' + id)
                .then((res) => res.json())
                .then((data) => {
                    setLoading(false);
                    setBoardState(data[0].board_state.board);
                    setPlayers(data[0].players);
                    setActivePlayer(data[0].active_player);
                });
        }

        fetchTTTBoardData(boardId);
    }, [boardId])

    const checkRowForWin = (board: string[][], row: number) => {
        if (board[row][0] &&
            board[row][0] == board[row][1] &&
            board[row][0] == board[row][2]) {
            return true;
        }
        return false;
    }

    const checkColumnForWin = (board: string[][], column: number) => {
        if (board[0][column] &&
            board[0][column] == board[1][column] &&
            board[0][column] == board[2][column]) {
            return true;
        }
        return false;
    }

    const checkDiagonalsForWin = (board: string[][]) => {
        if (board[0][0] &&
            board[0][0] == board[1][1] &&
            board[0][0] == board[2][2]
        ) {
            return true;
        } else if (board[0][2] &&
            board[0][2] == board[1][1] &&
            board[0][2] == board[2][0]
        ) {
            return true;
        } else {
            return false;
        }
    }

    const checkForWin = (board: string[][]) => {
        let win = false;
        for (let i = 0; i < 3; i++) {
            win = checkRowForWin(board, i);
            if (win) {
                break;
            }
        }
        if (win) {
            return win;
        } else {
            for (let i = 0; i < 3; i++) {
                win = checkColumnForWin(board, i);
                if (win) {
                    break;
                }
            }
            if (win) {
                return win;
            } else {
                win = checkDiagonalsForWin(board);
            }
        }
        return win;
    }

    const playerMove = (row: number, column: number) => {
        if (!gameOver) {

            let tempBoard: spaceSymbol[][] = [];

            for (let i = 0; i < boardState.length; i++) {
                tempBoard.push(boardState[i]);
            }

            if (tempBoard[row][column] != '') {
                return;
            }

            tempBoard[row][column] = activePlayer;
            if (checkForWin(tempBoard)) {
                setBoardState(tempBoard);
                setWinner(activePlayer);
                return;
            }
            setBoardState(tempBoard);
        }
    }

    return (
        <div>
            {loading ?
                <div>Loading...</div> :
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td><TicTacToeSpace symbol={boardState[0][0]} playerMove={() => playerMove(0, 0)} /></td>
                                <td><TicTacToeSpace symbol={boardState[0][1]} playerMove={() => playerMove(0, 1)} /></td>
                                <td><TicTacToeSpace symbol={boardState[0][2]} playerMove={() => playerMove(0, 2)} /></td>
                            </tr>
                            <tr>
                                <td><TicTacToeSpace symbol={boardState[1][0]} playerMove={() => playerMove(1, 0)} /></td>
                                <td><TicTacToeSpace symbol={boardState[1][1]} playerMove={() => playerMove(1, 1)} /></td>
                                <td><TicTacToeSpace symbol={boardState[1][2]} playerMove={() => playerMove(1, 2)} /></td>
                            </tr>
                            <tr>
                                <td><TicTacToeSpace symbol={boardState[2][0]} playerMove={() => playerMove(2, 0)} /></td>
                                <td><TicTacToeSpace symbol={boardState[2][1]} playerMove={() => playerMove(2, 1)} /></td>
                                <td><TicTacToeSpace symbol={boardState[2][2]} playerMove={() => playerMove(2, 2)} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>}
        </div>
    )
}