import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import CustomThemeProvider from "../components/CustomThemeProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Store Web App',
  description: '',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomThemeProvider>{children}</CustomThemeProvider>
      </body>
    </html>
  )
}
