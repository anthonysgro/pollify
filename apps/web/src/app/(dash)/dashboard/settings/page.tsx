import { withPageAuthRequired } from '@auth0/nextjs-auth0'

async function SettingsPage() {
    return <div>Settings Page</div>
}

export default withPageAuthRequired(SettingsPage)
