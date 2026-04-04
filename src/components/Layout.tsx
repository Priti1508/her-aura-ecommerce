import type { ReactNode } from 'react'
import { Footer } from './Footer'
import { Navbar } from './Navbar'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh w-full max-w-[100vw] flex-col overflow-x-clip bg-cream">
      <Navbar />
      <main className="w-full min-w-0 flex-1">{children}</main>
      <Footer />
    </div>
  )
}
