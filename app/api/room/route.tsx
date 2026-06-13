import { neon } from "@neondatabase/serverless";
import { NextResponse } from "next/server";

export async function GET() {

    try {
        const sql = neon(process.env.DATABASE_URL);

        const response = await sql`SELECT * FROM rooms`;

        return NextResponse.json(response, {status: 200})

    } catch (error: any) {
        return NextResponse.json({error: 'Internal Server Error'}, {status: 500});
    }
}