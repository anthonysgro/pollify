import { withPageAuthRequired } from '@auth0/nextjs-auth0'

async function WorkshopPage() {
    return <div>Workshop Page</div>
}

export default withPageAuthRequired(WorkshopPage)
