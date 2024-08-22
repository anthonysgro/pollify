import { withPageAuthRequired } from '@auth0/nextjs-auth0'

async function OverviewPage() {
    return <div>Overview Page</div>
}

export default withPageAuthRequired(OverviewPage)
