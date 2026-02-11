import { Plus_Jakarta_Sans } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import BackgroundBlobs from '@/components/BackgroundBlobs'
import ScrollTriggerCleanup from '@/components/ScrollTriggerCleanup'
import Script from 'next/script'
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

  // useScrollToTop();

  return (

    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0MS3KJJS34"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0MS3KJJS34');
          `}
        </Script>
      </head>
      <body className={plusJakarta.className}>

        <ScrollTriggerCleanup />
        <BackgroundBlobs />

        <Navigation />
        {/* <PageWrapper> */}
        {children}
        {/* </PageWrapper > */}
        <Footer />
        {/* <WhatsAppFloat /> */}
      </body>
    </html>
  )
}
