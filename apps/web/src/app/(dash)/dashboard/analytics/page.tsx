import { withPageAuthRequired } from '@auth0/nextjs-auth0'

async function AnalyticsPage() {
    return <div>Analytics Page</div>
}

export default withPageAuthRequired(AnalyticsPage)
