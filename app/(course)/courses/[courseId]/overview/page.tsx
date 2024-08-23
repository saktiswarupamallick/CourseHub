import { clerkClient } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import ReadText from "@/components/custom/ReadText";

const CourseOverview = async ({ params }: { params: { courseId: string } }) => {
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      isPublished: true,
    },
    include: {
      sections: {
        where: {
          isPublished: true,
        },
      },
    },
  });

  if (!course) {
    return redirect("/");
  }

  const instructor = await clerkClient.users.getUser(course.instructorId);

  let level;

  if (course.levelId) {
    level = await db.level.findUnique({
      where: {
        id: course.levelId,
      },
    });
  }

  return (
    <div className="px-6 py-4 flex flex-col gap-5 bg-lime-100  text-sm">
      {/* Top section divided into two parts */}
      <div className="flex justify-between gap-8">
        {/* Left side: Title, instructor, and description */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{course.title}</h1>
          <p className="font-medium text-xl">{course.subtitle}</p>

          <div className="flex gap-2 items-center mt-4">
            <Image
              src={
                instructor.imageUrl
                  ? instructor.imageUrl
                  : "/avatar_placeholder.jpg"
              }
              alt={instructor.fullName ? instructor.fullName : "Instructor photo"}
              width={40}
              height={40}
              className="rounded-full"
            />
            
            <p className="text-xl font-bold">Mentor:   {instructor.fullName}</p>
          </div>

          {/* Description directly under the instructor's name */}
          <div className="mt-4">
            
            <ReadText  value={course.description!} />
          </div>
          <div className="flex gap-2 items-center ">
            <p className="text-xl text-gray-500 font-bold">Level:</p>
            <p  className="text-2xl font-bold" >{level?.name}</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="font-bold text-gray-500 text-xl">Price:</p>
            <p className="text-2xl font-bold">₹{course.price}</p>
          </div>
        </div>

        {/* Right side: Course image, level, and price */}
        <div className="flex flex-col items-end gap-4">
          <Image
            src="/teacher.jpg"
            alt={course.title}
            width={400}     
            height={200}   
            layout="fixed"  
            className="rounded-lg "
          />
          
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
