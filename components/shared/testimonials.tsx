import Image from "next/image"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "EduTeach has completely transformed how I manage my classroom. The interactive lessons keep my students engaged, and the automated grading saves me hours each week.",
    author: "Sarah Johnson",
    role: "High School Science Teacher",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "As a university professor, I needed a platform that could handle complex course materials. EduTeach exceeded my expectations with its robust features and intuitive interface.",
    author: "Dr. Michael Chen",
    role: "University Professor",
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    quote:
      "Our elementary school has seen a 30% increase in student engagement since implementing EduTeach. The colorful interface and interactive elements are perfect for young learners.",
    author: "Emily Rodriguez",
    role: "Elementary School Principal",
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export function Testimonials() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-8">
      {testimonials.map((testimonial, index) => (
        <Card key={index} className="border-0 shadow-md">
          <CardContent className="pt-6">
            <Quote className="h-8 w-8 text-primary/40 mb-2" />
            <p className="text-slate-700">{testimonial.quote}</p>
          </CardContent>
          <CardFooter>
            <div className="flex items-center gap-4">
              <Image
                src={testimonial.avatar || "/placeholder.svg"}
                alt={testimonial.author}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-sm text-slate-500">{testimonial.role}</p>
              </div>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
