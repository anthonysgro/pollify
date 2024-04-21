// import { getUserSession } from "@/lib/session";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/lib/auth";
// import { db } from "@/lib/db";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export default async function PollPage() {
  // const userSession = await getUserSession();

  // if (!userSession || !userSession.email) {
  //     redirect(authOptions?.pages?.signIn || "/");
  // }

  // const user = await db.user.findUnique({
  //     where: {
  //         email: userSession.email,
  //     },
  // });

  return (
    <>
      <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Polls</h2>
          {/* <div className="flex items-center space-x-2 ml-8">
                        <CalendarDateRangePicker
                            className={"hidden md:block"}
                        />
                    </div> */}
        </div>
        <Button>Create Poll</Button>
      </div>
    </>
  );
}
