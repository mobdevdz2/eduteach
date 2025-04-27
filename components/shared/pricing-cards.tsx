import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for individual teachers just getting started.",
    features: ["Up to 30 students", "Basic lesson templates", "Assignment creation", "Manual grading", "Email support"],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    description: "Ideal for teachers who want advanced features and more students.",
    features: [
      "Up to 150 students",
      "Advanced lesson templates",
      "Automated grading",
      "Student analytics",
      "Parent portal access",
      "Priority support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "School",
    price: "Custom",
    description: "For schools and educational institutions with multiple teachers.",
    features: [
      "Unlimited students",
      "All Pro features",
      "School-wide analytics",
      "Admin dashboard",
      "LMS integration",
      "API access",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    popular: false,
  },
]

export function PricingCards() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 py-8">
      {pricingPlans.map((plan, index) => (
        <Card key={index} className={`flex flex-col ${plan.popular ? "border-primary shadow-lg" : "border shadow"}`}>
          {plan.popular && (
            <div className="bg-primary text-primary-foreground text-center py-1 text-sm font-medium">Most Popular</div>
          )}
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <div className="flex items-baseline mt-2">
              <span className="text-3xl font-bold">{plan.price}</span>
              {plan.period && <span className="ml-1 text-slate-500">{plan.period}</span>}
            </div>
            <CardDescription className="mt-2">{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Link href={plan.name === "School" ? "/contact" : "/signup"} className="w-full">
              <Button variant={plan.popular ? "default" : "outline"} className="w-full">
                {plan.cta}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
