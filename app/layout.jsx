import { Plus_Jakarta_Sans } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import BackgroundBlobs from '@/components/BackgroundBlobs'
import ScrollTriggerCleanup from '@/components/ScrollTriggerCleanup'
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
   icons: {
    icon: '/flo-mascot.png'
  }
}

export default function RootLayout({ children }) {

  // useScrollToTop();

  return (

    <html lang="en">

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
