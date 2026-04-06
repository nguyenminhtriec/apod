import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'
// import forms from '@tailwindcss/forms'
// import typography from '@tailwindcss/typography'


const config: Config = {
    content: [
        './app/**/*.{ts,tsx,js,jsx}',
        './pages/**/*.{ts,tsx,js,jsx}',
        './components/**/*.{ts,tsx,js,jsx}',
        './src/**/*.{ts,tsx,js,jsx}',
    ],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: '1rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                // use CSS variables for easy theming (set in :root or body)
                primary: {
                    DEFAULT: 'var(--color-primary)',
                    50: 'var(--color-primary-50)',
                    100: 'var(--color-primary-100)',
                },
                accent: 'var(--color-accent)',
            },
            transitionDuration: {
                DEFAULT: '200ms',
            },
        },
    },
    // plugins: [forms, typography],
}

export default config
