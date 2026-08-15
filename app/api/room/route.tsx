import { neon } from "@neondatabase/serverless";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const sql = neon(process.env.DATABASE_URL);

        const roomParams = request.nextUrl.searchParams;
        const roomString = roomParams.get('room_id');

        const response = await sql`SELECT game, board_id FROM rooms WHERE code = ${roomString}`;

        return NextResponse.json(response, { status: 200 })

    } catch (error: unknown) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const sql = neon(process.env.DATABASE_URL);

        const body = await request.json();
        const room_id = body.room_id;

        const response = await sql`INSERT INTO rooms (code) VALUES (${room_id}) RETURNING *`;

        return NextResponse.json(response, { status: 201 });
    } catch (error: unknown) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const sql = neon(process.env.DATABASE_URL);

        const body = await request.json();
        const room_id = body.room_id;
        const game = body.game;
        const board_id = body.board_id;

        const response = await sql`UPDATE rooms SET game = ${game}, board_id = ${board_id} WHERE code = ${room_id}`;
        return NextResponse.json(response, { status: 200 });
    } catch (error: unknown) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}