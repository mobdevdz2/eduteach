"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Loader2, CreditCard, CheckCircle, AlertCircle, Download, Calendar } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ProfileBillingProps {
  user: any
}

// Mock subscription data
const subscriptionData = {
  plan: "Professional",
  status: "active",
  price: "$12.00",
  billingCycle: "monthly",
  nextBillingDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString(),
  paymentMethod: {
    type: "credit_card",
    last4: "4242",
    expiryMonth: "12",
    expiryYear: "2025",
    brand: "Visa",
  },
}

// Mock invoice data
const invoices = [
  {
    id: "INV-001",
    date: new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleDateString(),
    amount: "$12.00",
    status: "paid",
  },
  {
    id: "INV-002",
    date: new Date(new Date().setMonth(new Date().getMonth() - 2)).toLocaleDateString(),
    amount: "$12.00",
    status: "paid",
  },
  {
    id: "INV-003",
    date: new Date(new Date().setMonth(new Date().getMonth() - 3)).toLocaleDateString(),
    amount: "$12.00",
    status: "paid",
  },
]

export function ProfileBilling({ user }: ProfileBillingProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isChangePlanDialogOpen, setIsChangePlanDialogOpen] = useState(false)
  const [isPaymentMethodDialogOpen, setIsPaymentMethodDialogOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState(subscriptionData.plan.toLowerCase())

  const handleChangePlan = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would update the subscription via API
      // const response = await fetch('/api/subscription', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ plan: selectedPlan }),
      // });

      toast.success(`Subscription updated to ${selectedPlan} plan`)
      setIsChangePlanDialogOpen(false)
    } catch (error) {
      toast.error("Failed to update subscription")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleUpdatePaymentMethod = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would update the payment method via API
      // const response = await fetch('/api/payment-method', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      toast.success("Payment method updated successfully")
      setIsPaymentMethodDialogOpen(false)
    } catch (error) {
      toast.error("Failed to update payment method")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelSubscription = async () => {
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // In a real app, you would cancel the subscription via API
      // const response = await fetch('/api/subscription', {
      //   method: 'DELETE',
      // });

      toast.success("Subscription cancelled successfully")
    } catch (error) {
      toast.error("Failed to cancel subscription")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Subscription Plan</CardTitle>
              <CardDescription>Manage your subscription and billing</CardDescription>
            </div>
            <Badge variant={subscriptionData.status === "active" ? "default" : "destructive"}>
              {subscriptionData.status === "active" ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-medium">{subscriptionData.plan} Plan</h3>
              <p className="text-muted-foreground">
                {subscriptionData.price} / {subscriptionData.billingCycle}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Next billing date</span>
              </div>
              <p>{subscriptionData.nextBillingDate}</p>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-medium mb-2">Plan Features</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Up to 150 students</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Advanced lesson templates</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Automated grading</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Student analytics</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Parent portal access</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-primary" />
                <span>Priority support</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-2">
          <Dialog open={isChangePlanDialogOpen} onOpenChange={setIsChangePlanDialogOpen}>
            <DialogTrigger asChild>
              <Button>Change Plan</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Change Subscription Plan</DialogTitle>
                <DialogDescription>Choose a new plan that better fits your needs.</DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="free" id="free" />
                    <Label htmlFor="free" className="flex flex-col">
                      <span className="font-medium">Free</span>
                      <span className="text-sm text-muted-foreground">$0 / month</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="professional" id="professional" />
                    <Label htmlFor="professional" className="flex flex-col">
                      <span className="font-medium">Professional</span>
                      <span className="text-sm text-muted-foreground">$12 / month</span>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="school" id="school" />
                    <Label htmlFor="school" className="flex flex-col">
                      <span className="font-medium">School</span>
                      <span className="text-sm text-muted-foreground">Custom pricing</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsChangePlanDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleChangePlan} disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Confirm Change
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Button variant="outline" onClick={handleCancelSubscription} disabled={isLoading}>
            Cancel Subscription
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payment Method</CardTitle>
          <CardDescription>Manage your payment information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="bg-muted p-2 rounded-md">
              <CreditCard className="h-6 w-6" />
            </div>
            <div>
              <p className="font-medium">
                {subscriptionData.paymentMethod.brand} ending in {subscriptionData.paymentMethod.last4}
              </p>
              <p className="text-sm text-muted-foreground">
                Expires {subscriptionData.paymentMethod.expiryMonth}/{subscriptionData.paymentMethod.expiryYear}
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Dialog open={isPaymentMethodDialogOpen} onOpenChange={setIsPaymentMethodDialogOpen}>
            <DialogTrigger asChild>
              <Button>Update Payment Method</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Update Payment Method</DialogTitle>
                <DialogDescription>Enter your new payment information.</DialogDescription>
              </DialogHeader>
              <form onSubmit={handleUpdatePaymentMethod} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input id="expiryDate" placeholder="MM/YY" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input id="cvc" placeholder="123" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input id="cardName" placeholder="John Doe" required />
                </div>

                <DialogFooter>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Update Payment Method
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
          <CardDescription>View and download your past invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {invoices.length > 0 ? (
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-4 font-medium">
                  <div>Invoice</div>
                  <div>Date</div>
                  <div>Amount</div>
                  <div>Status</div>
                </div>
                <Separator />
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="grid grid-cols-4 p-4 items-center">
                    <div>{invoice.id}</div>
                    <div>{invoice.date}</div>
                    <div>{invoice.amount}</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {invoice.status === "paid" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                        <span className="capitalize">{invoice.status}</span>
                      </div>
                      <Button variant="ghost" size="icon" title="Download Invoice">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-4">No invoices found</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
