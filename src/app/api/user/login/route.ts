import { DB, readDB } from "@lib/DB";
import { NextRequest, NextResponse } from "next/server";
import { Database } from "@lib/types";

export const POST = async (request: NextRequest) => {
  readDB();
  const body = await request.json();
  const { username, password } = body;

  
  readDB();
  const user = (<Database>DB).users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return NextResponse.json(
      {
        ok: false,
        message: "Username or password is incorrect",
      },
      { status: 400 }
    );
  }
  const secret = process.env.JWT_SECRET || "This is another secret"

  const token = "Replace this with token creation";

  
  return NextResponse.json({ ok: true, token,username });
};
