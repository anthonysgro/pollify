# Pollify Readme

Welcome to Pollify, this is our Turborepo where we store most things related to the application!

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

-   `web`: The [Next.js](https://nextjs.org/) app used for the website and immediate backend apis
-   `cdk`: The [CDK](https://aws.amazon.com/cdk/) app used for AWS infrastructure
-   `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
-   `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

-   [TypeScript](https://www.typescriptlang.org/) for static type checking
-   [ESLint](https://eslint.org/) for code linting
-   [Prettier](https://prettier.io) for code formatting

### Build

To build all apps and packages, run the following command:

```
cd ./pollify
npm build
```

### Develop

To develop all apps and packages, run the following command:

```
cd ./pollify
npm dev
```

To develop just the webapp:

```
cd ./pollify
npm run dev --workspace apps/web
```

## Integrations and Setup

### AWS

### Postgres

We maintain EC2 instances in AWS that own our postgres instances with 30GB of storage for testing purposes. See ec2 host mapping here:

```
beta - ec2-user@ec2-54-226-51-25.compute-1.amazonaws.com
gamma - TBD
prod - TBD
```

To access, connect using the .pem keypair for each environment like so:

```zsh
ssh -i pollify-beta-postgres-keypair.pem ec2-user@ec2-54-226-51-25.compute-1.amazonaws.com
```

You should only connect directly to the EC2 host for root user actions like db upgrades and maintenance. Some common commands for the postgres admin:

Edit postgres connections pg_hba.conf

```zsh
sudo nano /var/lib/pgsql/data/pg_hba.conf
```

Edit postgres config

```zsh
sudo nano /var/lib/pgsql/data/postgresql.conf
```

Normally, we can connect to the DB by using our username + password combinations. Please contact the db admin for credentials. Example connection string:

```
postgres://{username}:{password}@ec2-54-226-51-25.compute-1.amazonaws.com:5432/pollify_beta
```

## Useful Links

Learn more about the power of Turborepo:

-   [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
-   [Caching](https://turbo.build/repo/docs/core-concepts/caching)
-   [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
-   [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
-   [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
-   [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)
