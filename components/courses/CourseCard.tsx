import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";
import { Course } from "@prisma/client";
import { Gauge } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CourseCard = async ({ course }: { course: Course }) => {
  const instructor = await clerkClient.users.getUser(course.instructorId);

  let level;

  if (course.levelId) {
    level = await db.level.findUnique({
      where: {
        id: course.levelId,
      },
    });
  }

  // Convert the price to rupees if it's not null, otherwise set a default value
  const priceInRupees = course.price !== null ? (course.price * 82).toFixed(2) : "Price not available";

  // Truncate the description to 10 words and remove HTML tags
  const truncatedDescription = course.description
    ? course.description.replace(/<\/?[^>]+(>|$)/g, "").split(" ").slice(0, 10).join(" ") + "..."
    : "";

  return (
    <Link
      href={`/courses/${course.id}/overview`}
      className="border rounded-lg cursor-pointer max-w-sm w-full"
    >
      <div className="w-full h-full flex flex-col">
        <Image
          src={course.imageUrl ? course.imageUrl : "/image_placeholder.webp"}
          alt={course.title}
          width={500}
          height={300}
          className="rounded-t-lg object-cover w-full h-48"
        />
        <div className="px-4 py-3 flex flex-col gap-2 flex-grow">
          <h2 className="text-lg font-bold">{course.title}</h2>
          <div className="flex-grow">
            <p className="text-sm font-medium">{truncatedDescription}</p>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm font-bold">
              {course.price !== null ? `₹ ${priceInRupees}` : "Free"}
            </p>
            {level && (
              <div className="flex gap-2 items-center">
                <Gauge size={20} />
                <p>{level.name}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
