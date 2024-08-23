import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // Adjust the import path according to your project structure
import { auth } from "@clerk/nextjs/server"; // Adjust if you use a different auth solution

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { notesId: string } }
) => {
  try {
    const { userId } = auth(); // Assuming you are using Clerk for authentication
    const { notesId } = params;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Find the note by ID and ensure it belongs to the authenticated user
    const note = await db.notes.findUnique({
      where: { id: notesId }, // Assuming `userId` is a field in your `notes` table
    });

    if (!note) {
      return new NextResponse("Note not found", { status: 404 });
    }

    // Delete the note from the database
    await db.notes.delete({
      where: { id: notesId},
    });

    return new NextResponse("Note Deleted", { status: 200 });
  } catch (err) {
    console.error(["notesId_DELETE", err]);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
