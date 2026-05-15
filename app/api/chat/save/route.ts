import { NextRequest, NextResponse } from "next/server";

// This is a mock API - in production, connect to Supabase
// For demo purposes, we'll simulate the save operation

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, platform, role, content, metadata } = body;

    // Validate required fields
    if (!user_id || !platform || !role || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // In production, save to Supabase:
    // await supabase.from("chat_messages").insert({
    //   user_id,
    //   platform,
    //   role,
    //   content,
    //   metadata,
    // });

    // For demo, just log and return success
    console.log(`[Chat Save] ${platform}:${role} - ${user_id}: ${content.substring(0, 50)}...`);

    return NextResponse.json({
      success: true,
      message_id: `msg_${Date.now()}`,
      saved_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Chat save error:", error);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}