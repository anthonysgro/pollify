import { withPageAuthRequired } from '@auth0/nextjs-auth0'

async function PollsPage() {
    return <div>Polls Page</div>
}

export default withPageAuthRequired(PollsPage)
