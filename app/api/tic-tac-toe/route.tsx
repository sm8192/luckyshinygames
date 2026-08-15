import { neon } from "@neondatabase/serverless";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const sql = neon(process.env.DATABASE_URL);

        const searchParams = request.nextUrl.searchParams;
        const ticTacToeId = searchParams.get('id');

        const response = await sql`SELECT board_state, players, active_player FROM tictactoe_boards WHERE id = ${ticTacToeId}`;

        return NextResponse.json(response, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error, ' + error }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const sql = neon(process.env.DATABASE_URL);

        const nullBoard = [['', '', ''], ['', '', ''], ['', '', '']];
        const boardString = JSON.stringify(nullBoard);

        const response = await sql`INSERT INTO tictactoe_boards (board_state, active_player) VALUES (${boardString}, 'X') RETURNING id`;

        return NextResponse.json(response, { status: 201 });
    } catch (error: unknown) {
        return NextResponse.json({ error: 'Internal Server Error is ' + error }, { status: 500 });
    }
}