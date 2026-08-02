'use client'

import { useState, useEffect } from "react";

export default function Landing() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

   /* useEffect(() => {
        fetch('/api/room')
            .then((res) => res.json())
            .then((data) => {
                setData(data);
                setLoading(false);
            })
    }, []) */

    const roomCodeButtonClick = () => {

    }


    return (
        <div>
            <h5>Enter room code:</h5>
            <input id='room-code-input' type="text"></input>
            <button onClick={roomCodeButtonClick}></button>
            {loading ?
                <h5>Loading...</h5> :
                <p>Not Loading</p>
            }
        </div>
    )
}