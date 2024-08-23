"use client"; // Ensure this component is client-side only

import { useState } from "react";
import { notes } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Notescard = ({ notes }: { notes: notes }) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const router = useRouter();

    // Formatting the created time
    const formattedDate = new Date(notes.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/notes/${notes.id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setIsDeleted(true);
                router.refresh(); // Refresh the page or handle UI updates
            } else {
                console.error("Failed to delete note:", await response.text());
            }
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    if (isDeleted) return null; // Hide the card after deletion

    return (
        <div className="border rounded-lg shadow-lg max-w-sm w-full mx-auto">
            <Image
                src={notes.imageUrl ? notes.imageUrl : "/teacher.jpg"}
                alt={notes.title}
                width={500}
                height={300}
                className="rounded-t-lg object-cover w-full h-48"
            />
            <div className="px-4 py-3 flex flex-col gap-2">
                <h2 className="text-lg font-bold">{notes.title}</h2>
                <div className="text-sm font-medium text-gray-700">
                    <div
                        className="quill-description"
                        dangerouslySetInnerHTML={{ __html: notes.description || "" }}
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2">Created on: {formattedDate}</p>
                <button
                    onClick={handleDelete}
                    className="mt-4 text-red-600 hover:text-red-800 font-semibold self-end"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default Notescard;
