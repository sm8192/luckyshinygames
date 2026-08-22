'use client'

import xImage from '@/app/assets/X.png'
import oImage from '@/app/assets/O.png'
import blankImage from '@/app/assets/Black blank.png'

type spaceSymbol = 'X' | 'O' | '';

interface spaceProps {
    symbol: spaceSymbol,
    playerMove: Function
}

export default function TicTacToeSpace (props: spaceProps) {


    function chooseImage (symbol: spaceSymbol) {
        if(symbol == 'X') {
            return xImage.src;
        } else if (symbol == 'O') {
            return oImage.src;
        } else {
            return blankImage.src;
        }
    }

function handleClick() {
    props.playerMove();
}

    return (
        <div className='h-25 w-25 border-4 border-white' onClick={handleClick}>
            <img src={chooseImage(props.symbol)} height='100px' width='100px' />
        </div>
    )
}