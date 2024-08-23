import { db } from "@/lib/db"; // Import Prisma client
import NotesCard from "../../../components/notes/Notescard"; // Component to display individual notes

export default async function Home() {
  // Fetch notes from the database
  const notes = await db.notes.findMany({
    orderBy: {
      createdAt: "desc", // Optionally order by creation date
    },
  });

  return (
    <div className="md:mt-5 md:px-10 xl:px-16 pb-16">
      <div className="flex flex-wrap gap-7 justify-center">
        {notes.map((note) => (
          <NotesCard key={note.id} notes={note} /> // Use the NotesCard component to render each note
        ))}
      </div>
    </div>
  );
}
