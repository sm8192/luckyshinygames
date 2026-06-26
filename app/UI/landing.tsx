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

    return (
        <div>
            {loading ?
                <h5>Loading...</h5> :
                <p>{JSON.stringify(data)}</p>
            }
        </div>
    )
}