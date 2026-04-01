
'use client'


import React from 'react'
import { ThemeProvider } from 'next-themes'


type Props = {
    children: React.ReactNode
}

/**
 * Simple wrapper around next-themes ThemeProvider.
 * - enableSystem: whether to respect the OS theme (default: true)
 * - defaultTheme: 'system' | 'light' | 'dark' (default: 'system')
 * - attribute: which attribute to set on html (default: 'class')
 */
export function MyThemeProvider({children}: Props) {
    return (
        <ThemeProvider enableSystem={false} defaultTheme="dark" attribute="class">
            {children}
        </ThemeProvider>
    )
}
