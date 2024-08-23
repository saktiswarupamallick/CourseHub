import { db } from "@/lib/db"; // Import the Prisma client

export const getNotes = async () => {
  try {
    // Fetch all notes from the database
    const notes = await db.notes.findMany({
      orderBy: {
        createdAt: 'desc', // Optionally order by creation date
      },
    });

    // Return the fetched notes
    return {
      data: notes,
      count: notes.length, // Return the total number of notes
    };
  } catch (err) {
    console.log("[getNotes]", err);
    return {
      data: [],
      count: 0,
    };
  }
};
