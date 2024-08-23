import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { title, description, imageUrl } = await req.json();

    const newNote = await db.notes.create({
      data: {
        title,
        description,
        imageUrl,
      },
    });

    return NextResponse.json(newNote, { status: 200 });
  } catch (err) {
    console.log("[notes_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
