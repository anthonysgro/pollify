import { Poppins as FontSans } from 'next/font/google'
import { JetBrains_Mono as FontMono } from 'next/font/google'

const fontMono = FontMono({
    subsets: ['latin'],
    variable: '--font-mono',
    preload: false,
})
const fontSans = FontSans({
    subsets: ['latin'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    variable: '--font-sans',
    preload: true,
})

export { fontSans, fontMono }
