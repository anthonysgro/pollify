import { drizzle } from 'drizzle-orm/aws-data-api/pg'
import { RDSDataClient } from '@aws-sdk/client-rds-data'
import { fromIni } from '@aws-sdk/credential-providers'

const rdsClient = new RDSDataClient({
    credentials: fromIni(),
    region: 'us-east-1',
})

export const db = drizzle(rdsClient, {
    database: process.env.DATABASE_URL!,
    secretArn: process.env.RDS_PASSWORD!,
    resourceArn: process.env.RDS_ARN!,
})
