// READ MORE: https://nextjs.org/docs/app/building-your-application/routing/route-handlers

import { NextRequest, NextResponse } from "next/server";


// To handle a GET request to /api
// eslint-disable-next-line no-unused-vars
export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// To handle a POST request to /api
// eslint-disable-next-line no-unused-vars
export async function POST(req: NextRequest) {
  return NextResponse.json({ message: "Hello World" }, { status: 200 });
}

// Same logic to add a `PATCH`, `DELETE`...