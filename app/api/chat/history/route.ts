import { NextRequest, NextResponse } from "next/server";

// This is a mock API - in production, connect to Supabase
// For demo purposes, we'll simulate the retrieval

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("user_id");
    const limit = parseInt(searchParams.get("limit") || "50");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing user_id" },
        { status: 400 }
      );
    }

    // In production, fetch from Supabase:
    // const { data } = await supabase
    //   .from("chat_messages")
    //   .select("*")
    //   .eq("user_id", userId)
    //   .order("created_at", { ascending: false })
    //   .limit(limit);

    // For demo, return empty array (no history yet)
    return NextResponse.json({
      messages: [],
      total: 0,
      user_id: userId,
    });
  } catch (error) {
    console.error("Chat history error:", error);
    return NextResponse.json(
      { error: "Failed to fetch history" },
      { status: 500 }
    );
  }
}