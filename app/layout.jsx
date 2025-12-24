import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-plus-jakarta',
})

export const metadata = {
  title: 'saafAI | No Second Thoughts',
  description: 'Empowering public sanitation with India\'s first AI-driven hygiene rating engine',
  keywords: ['AI', 'sanitation', 'hygiene', 'public toilets', 'India', 'Swachh Bharat'],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={plusJakarta.className}>{children}</body>
    </html>
  )
}
