import { neon } from "@neondatabase/serverless";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const sql = neon(process.env.DATABASE_URL);
        
        const roomParams = request.nextUrl.searchParams;
        const roomString = roomParams.get('room_id');

        const response = await sql`SELECT EXISTS (SELECT 1 FROM rooms WHERE code = ${roomString}) AS exists`;

        return NextResponse.json(response, { status: 200 });

    } catch (error: unknown) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}