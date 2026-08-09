import { neon } from "@neondatabase/serverless";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const sql = neon(process.env.DATABASE_URL);

        const searchParams = request.nextUrl.searchParams;
        const roomString = searchParams.get('room_id');

        const response = await sql`SELECT game, board_id FROM rooms WHERE code = ${roomString}`;

        return NextResponse.json(response, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}