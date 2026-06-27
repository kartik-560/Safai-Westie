import { Plus_Jakarta_Sans } from 'next/font/google'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import BackgroundBlobs from '@/components/BackgroundBlobs'
import ScrollTriggerCleanup from '@/components/ScrollTriggerCleanup'
import ConditionalLayout from '@/components/ConditionalLayout' // Import the new wrapper
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-plus-jakarta',
})

export const metadata = {
  title: 'saafAI | No Second Thoughts',
  description: 'Empowering public sanitation with India\'s first AI-driven hygiene rating engine',
  keywords: ['AI', 'sanitation', 'hygiene', 'public toilets', 'India', 'Swachh Bharat', 'cleanliness', 'health', 'technology', 'innovation', "sanitation rating", "public health", "clean India", "hygiene monitoring", "AI technology", "sanitation solutions", "SaafAI", "Swachh Bharat Abhiyan", "public hygiene", "sanitation innovation", "AI-driven sanitation", "cleanliness rating", "sanitation monitoring", "public health technology"],
  icons: {
    icon: '/flo-mascot.png'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-24YFERDE1C"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-24YFERDE1C');
      `,
          }}
        />
      </head>
      <body className={plusJakarta.className}>
        <ScrollTriggerCleanup />
        <BackgroundBlobs />

        {/* Wrap children with the ConditionalLayout */}
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        
        {/* <WhatsAppFloat /> */}
      </body>
    </html>
  )
}