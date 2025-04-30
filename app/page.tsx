"use client"
import { LandingNav } from "@/components/shared/landing-nav"
import { Testimonials } from "@/components/shared/testimonials"
import { PricingCards } from "@/components/shared/pricing-cards"
import { FAQ } from "@/components/shared/faq"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, GraduationCap, BookOpen, Users, Calendar, Award, ArrowRight } from "lucide-react"
import { useTheme } from "next-themes"

export default function LandingPage() {
  const { theme, setTheme } = useTheme();

  // const getPricingCards = useGetSu
  return (
    <div className="flex flex-col min-h-screen dark:bg-slate-950">
      {/* Header/Navigation */}
      <LandingNav />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none dark:text-white">
                    Transform Your Teaching Experience
                  </h1>
                  <p className="max-w-[600px] text-slate-500 dark:text-slate-400 md:text-xl">
                    The all-in-one platform for educators to create, manage, and deliver engaging learning experiences.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="gap-1">
                      Get Started Free
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button size="lg" variant="outline" className="dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-800">
                      See How It Works
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-sm dark:text-slate-300">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>No credit card required</span>
                </div>
              </div>
              <div className="mx-auto lg:mx-0 relative">
                <Image
                  src="/images/landing.jpg"
                  width={550}
                  height={550}
                  alt="EduTeach Dashboard"
                  className="rounded-lg shadow-xl"
                  priority
                />
                <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium dark:text-white">Trusted by 10,000+ educators</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="flex items-center justify-center w-full py-12 md:py-24 bg-white dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl dark:text-white">
                  Everything You Need to Teach Effectively
                </h2>
                <p className="max-w-[700px] text-slate-500 dark:text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform provides all the tools you need to create engaging lessons, manage your classroom, and
                  track student progress.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardHeader>
                  <BookOpen className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="dark:text-white">Interactive Lessons</CardTitle>
                  <CardDescription className="dark:text-slate-400">
                    Create engaging, multimedia-rich lessons that keep students motivated and focused.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm dark:text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Drag-and-drop lesson builder</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Embed videos, quizzes, and activities</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Real-time student engagement tracking</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/features/lessons">
                    <Button variant="outline" className="w-full dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700">
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="dark:text-white">Classroom Management</CardTitle>
                  <CardDescription className="dark:text-slate-400">
                    Easily manage students, assignments, and communications in one place.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm dark:text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Student profiles and progress tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Automated grading and feedback</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Parent-teacher communication tools</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/features/classroom">
                    <Button variant="outline" className="w-full dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700">
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card className="dark:bg-slate-800 dark:border-slate-700">
                <CardHeader>
                  <Calendar className="h-10 w-10 text-primary mb-2" />
                  <CardTitle className="dark:text-white">Scheduling & Planning</CardTitle>
                  <CardDescription className="dark:text-slate-400">
                    Plan your curriculum, schedule classes, and manage your teaching calendar.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm dark:text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Curriculum planning tools</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Class scheduling and reminders</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      <span>Resource allocation and management</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/features/planning">
                    <Button variant="outline" className="w-full dark:text-slate-200 dark:border-slate-700 dark:hover:bg-slate-700">
                      Learn More
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="flex items-center justify-center  w-full py-12 md:py-24 bg-slate-50 dark:bg-slate-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl dark:text-white">
                  Simple Steps to Transform Your Teaching
                </h2>
                <p className="max-w-[700px] text-slate-500 dark:text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started with EduTeach in just a few simple steps and revolutionize your classroom experience.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">1</div>
                <h3 className="text-xl font-bold dark:text-white">Sign Up</h3>
                <p className="text-slate-500 dark:text-slate-400">Create your free account and set up your teacher profile.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">2</div>
                <h3 className="text-xl font-bold dark:text-white">Create Your Classroom</h3>
                <p className="text-slate-500 dark:text-slate-400">Add your students and organize your virtual classroom.</p>
              </div>
              <div className="flex flex-col items-center space-y-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white">3</div>
                <h3 className="text-xl font-bold dark:text-white">Start Teaching</h3>
                <p className="text-slate-500 dark:text-slate-400">Create lessons, assign work, and track student progress.</p>
              </div>
            </div>
            <div className="flex justify-center">
              <Link href="/signup">
                <Button size="lg">Get Started Today</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="flex items-center justify-center  w-full py-12 md:py-24 bg-white dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl dark:text-white">Loved by Educators Worldwide</h2>
                <p className="max-w-[700px] text-slate-500 dark:text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what teachers and educational institutions are saying about EduTeach.
                </p>
              </div>
            </div>
            <Testimonials />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="flex items-center justify-center  w-full py-12 md:py-24 bg-slate-50 dark:bg-slate-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Pricing</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl dark:text-white">Simple, Transparent Pricing</h2>
                <p className="max-w-[700px] text-slate-500 dark:text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that's right for you and your teaching needs.
                </p>
              </div>
            </div>
            <PricingCards />
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="flex items-center justify-center  w-full py-12 md:py-24 bg-white dark:bg-slate-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">FAQ</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl dark:text-white">Frequently Asked Questions</h2>
                <p className="max-w-[700px] text-slate-500 dark:text-slate-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Find answers to common questions about EduTeach.
                </p>
              </div>
            </div>
            <FAQ />
          </div>
        </section>

        {/* CTA Section */}
        <section className="flex items-center justify-center  w-full py-12 md:py-24 bg-primary text-primary-foreground dark:bg-slate-800 dark:border-slate-700">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Transform Your Teaching?</h2>
                <p className="max-w-[700px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of educators who are already using EduTeach to create engaging learning experiences.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="gap-1">
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 dark:bg-slate-800 dark:text-primary-foreground dark:hover:bg-slate-700"
                  >
                    Contact Sales
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4" />
                <span>14-day free trial • No credit card required</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white dark:bg-slate-900 dark:border-slate-800">
        <div className="container flex flex-col gap-6 py-8 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <Link href="/" className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold dark:text-white">EduTeach</span>
            </Link>
            <nav className="flex flex-wrap gap-4 md:gap-6">
              <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4 dark:text-slate-200">
                Features
              </Link>
              <Link href="#how-it-works" className="text-sm font-medium hover:underline underline-offset-4 dark:text-slate-200">
                How It Works
              </Link>
              <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4 dark:text-slate-200">
                Testimonials
              </Link>
              <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4 dark:text-slate-200">
                Pricing
              </Link>
              <Link href="#faq" className="text-sm font-medium hover:underline underline-offset-4 dark:text-slate-200">
                FAQ
              </Link>
            </nav>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="text-sm text-slate-500 dark:text-slate-400">© {new Date().getFullYear()} EduTeach. All rights reserved.</div>
            <div className="flex gap-4">
              <Link href="/terms" className="text-sm text-slate-500 dark:text-slate-400 hover:underline underline-offset-4">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-slate-500 dark:text-slate-400 hover:underline underline-offset-4">
                Privacy
              </Link>
              <Link href="/cookies" className="text-sm text-slate-500 dark:text-slate-400 hover:underline underline-offset-4">
                Cookies
              </Link>
            </div>
          </div>
          
          {/* Theme Toggle Button */}
          <div className="flex justify-end">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-400">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-800">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              )}
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}