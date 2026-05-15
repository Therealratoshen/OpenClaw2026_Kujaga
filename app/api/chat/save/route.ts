import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dfhxirestwsqlbqgdafpsh.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmeHhpcmVzd3NxbGJqZGFmcHNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4MzU0MDUsImV4cCI6MjA5NDQxMTQwNX0.mwZSto7srb6UtqlCH81gg25HkhZIVMaTCBoVz-xNdUA";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

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

    // Save to Supabase
    const { data, error } = await supabase
      .from("chat_messages")
      .insert({
        user_id,
        platform,
        role,
        content,
        metadata: metadata || {},
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message_id: data.id,
      saved_at: data.created_at,
    });
  } catch (error) {
    console.error("Chat save error:", error);
    return NextResponse.json(
      { error: "Failed to save message" },
      { status: 500 }
    );
  }
}