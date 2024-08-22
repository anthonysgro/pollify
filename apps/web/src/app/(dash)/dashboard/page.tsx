import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import {
    Badge,
    Bell,
    Home,
    LineChart,
    Package,
    Package2,
    ShoppingCart,
    Users,
} from 'lucide-react'
import Link from 'next/link'

async function DashboardPage() {
    return <div>"Dashboard"</div>
}

export default withPageAuthRequired(DashboardPage)
