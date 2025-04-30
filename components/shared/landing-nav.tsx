"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { GraduationCap, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { signOut, useSession } from "next-auth/react"

export function LandingNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { data: session, status } = useSession()

  const navItems = [
    { name: "Features", href: "/#features" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "Testimonials", href: "/#testimonials" },
    { name: "Pricing", href: "/#pricing" },
    { name: "FAQ", href: "/#faq" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-slate-900 dark:border-slate-800">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold dark:text-white">EduTeach</span>
          </Link>
          <nav className="hidden md:flex gap-6 ml-6">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                className="text-sm font-medium hover:underline underline-offset-4 dark:text-slate-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          {status === "authenticated" ? (
            <>
              <Link href="/dashboard">
                <Button variant="default">Dashboard</Button>
              </Link>
              <Button 
                variant="outline" 
                onClick={() => signOut({ redirectTo: "/" })} 
                className="hidden md:inline-flex dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button 
                  variant="outline" 
                  className="dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Log In
                </Button>
              </Link>
              <Link href="/signup" className="hidden md:inline-flex">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden dark:text-slate-200 dark:hover:bg-slate-800" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="md:hidden border-t dark:border-slate-800">
          <div className="container py-2">
            <nav className="flex flex-col space-y-3 py-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium hover:underline underline-offset-4 dark:text-slate-200"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {status === "authenticated" ? (
                <Button 
                  variant="outline" 
                  onClick={() => signOut({ redirectTo: "/" })} 
                  className="mt-2 dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Log Out
                </Button>
              ) : (
                <Link href="/signup" className="mt-2">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}