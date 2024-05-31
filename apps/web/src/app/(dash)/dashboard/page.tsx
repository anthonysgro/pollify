import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

async function DashboardPage() {
    return (
        <>
            <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Dashboard
                    </h2>
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
                    <TabsContent
                        value="overview"
                        className="space-y-4"
                    ></TabsContent>
                    <TabsContent
                        value="detail"
                        className="space-y-4"
                    ></TabsContent>
                </Tabs>
            </div>
        </>
    )
}

export default withPageAuthRequired(DashboardPage)
