/* eslint-disable no-undef */
// additional.d.ts
declare module '*.mp4' {
    export default string
}
declare module '*.png' {
    export default string
}

declare module '@auth/drizzle-adapter' {
    export function DrizzleAdapter(
        db: any,
        schema?: any,
    ): import('../../node_modules/@auth/core/adapters').Adapter
}
