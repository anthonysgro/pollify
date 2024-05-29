# Pollify

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

-   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
-   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Plan

Schema:

1. Poll Creation
   a. A user can create many polls. A poll can also have one creator
2. Poll voting
   a. A user can vote in many polls. A poll can have many user votes.
   b. A poll can optionally have either 1 vote per user or multiple votes per user.

Poll properties:

1. title
2. description (optional)
3. image (optional)
4. type
   a. multiple choice
   b. meeting poll
   c. image poll
   d. ranking poll
5. answer options
6. settings
   a. allow selection of multiple options
   b. require participants names
7. security
   a. allow multiple votes per person
   b. one vote per IP address
   c. one vote per account
   d. one vote per unique code
8. captcha enabled
9. block vpn users
10. advanced settings
    a. poll close date
    b. allow comments
    c. hide share button
    d. results visibility
    e. vote permissions
    f. collaboration mode
