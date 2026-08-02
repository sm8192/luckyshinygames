'use client'

import { useState, useEffect } from "react";

interface roomProps {
    data: object
}

export default function Room({ data }: roomProps) {


    return (
        <div>
            {JSON.stringify(data)}
        </div>
    )
}