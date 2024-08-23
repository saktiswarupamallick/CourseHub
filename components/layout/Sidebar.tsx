"use client";

import { BarChart4,NotebookPen ,BookmarkCheck} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const sidebarRoutes = [
    { icon: <BookmarkCheck />, label: "Tutorials", path: "/instructor/courses" },
    {
      icon: <BarChart4 />,
      label: "Achievement",
      path: "/instructor/performance",
    },
    {
      icon: <NotebookPen />,
      label: "Notetaker",
      path: "/instructor/notes",
    },
  ];

  return (
    <div className="max-sm:hidden flex flex-col w-64  px-3 my-4 gap-4 text-sm font-medium">
      {sidebarRoutes.map((route) => (
        <Link
          href={route.path}
          key={route.path}
          className={`flex items-center gap-4 p-3 rounded-lg hover:bg-lime-100
          ${pathname.startsWith(route.path) && "bg-lime-500 text-white hover:bg-lime-900"}
          `}
        >
          {route.icon} {route.label}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
