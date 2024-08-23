import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import Topbar from "@/components/layout/Topbar";
import Sidebar from "@/components/layout/Sidebar";

const InstructorLayout = ({ children }: { children: React.ReactNode }) => {
  const { userId } = auth()

  if (!userId) {
    return redirect("/sign-in")
  }

  return (
    <div className="h-full flex flex-col">
      <Topbar />
      <div className="flex-1 flex">
       
        <div className="flex-1">{children}</div> 
        <Sidebar />
      </div>
    </div>
  );
};

export default InstructorLayout;
