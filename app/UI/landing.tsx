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
        <div className="m-8 flex flex-col items-center">
            <h5>Enter room code:</h5>
            <div><input id='room-code-input' type="text" className="outline outline-slate-400" m-2></input></div>
            <div><button className="outline-2 outline-slate-400 rounded-xl p-2 m-2" onClick={roomCodeButtonClick}>Enter Room</button></div>
            {loading ?
                <h5>Loading...</h5> :
                <p>Not Loading</p>
            }
        </div>
    )
}