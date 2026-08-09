import { neon } from "@neondatabase/serverless";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const sql = neon(process.env.DATABASE_URL);

        const searchParams = request.nextUrl.searchParams;
        const ticTacToeId = searchParams.get('id');

        const response = await sql`SELECT board_state, players, active_player FROM tic-tac-toe_boards WHERE id = ${ticTacToeId}`;

        return NextResponse.json(response, {status: 200})

    } catch (error: any) {
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}