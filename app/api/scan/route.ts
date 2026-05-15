import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "Scan initiated",
    timestamp: new Date().toISOString(),
  });
}