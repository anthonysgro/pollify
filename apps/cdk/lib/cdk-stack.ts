import * as cdk from 'aws-cdk-lib'
import { aws_s3 as s3 } from 'aws-cdk-lib'
import { Construct } from 'constructs'

export class PollifyRdsDatabaseStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props)

        new s3.Bucket(this, 'MyFirstBucket', {
            versioned: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
        })
    }
}
