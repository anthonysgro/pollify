// import { getUserSession } from "@/lib/session";
// import { redirect } from "next/navigation";
// import { authOptions } from "@/lib/auth";
// import { db } from "@/lib/db";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function DashboardPage() {
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
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          {/* <div className="flex items-center space-x-2 ml-8">
                        <CalendarDateRangePicker
                            className={"hidden md:block"}
                        />
                    </div> */}
        </div>
        <Tabs
          defaultValue="overview"
          className="overflow-scroll h-auto space-y-4 xs:max-w-[300px] sm:max-w-none"
        >
          <TabsList className="flex justify-evenly md:justify-center items-center sm:inline-flex">
            <TabsTrigger value="overview" className="">
              Overview
            </TabsTrigger>
            <TabsTrigger value="detail">Detail</TabsTrigger>
            <TabsTrigger value="analytics">Analysis</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4"></TabsContent>
          <TabsContent value="detail" className="space-y-4"></TabsContent>
        </Tabs>
      </div>
    </>
  );
}
