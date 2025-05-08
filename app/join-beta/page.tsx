"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Send, CheckCircle } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function JoinBeta() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    carModel: "",
    reason: "",
    agreeTerms: false,
  })

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formState.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formState.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else if (!/^\d{10}$/.test(formState.phone.replace(/[^0-9]/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number"
    }

    if (!formState.carModel.trim()) {
      newErrors.carModel = "Car model is required"
    }

    if (!formState.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form
    setFormState({
      name: "",
      email: "",
      phone: "",
      carModel: "",
      reason: "",
      agreeTerms: false,
    })
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>

          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Join the <span className="text-red-600">Keplix Beta</span>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Be among the first to experience the future of car care in Delhi. Fill out the form below to apply for
                our exclusive beta program.
              </p>
            </motion.div>

            <motion.div
              className="bg-gray-900 border border-gray-800 rounded-xl p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {isSubmitted ? (
                <div className="text-center py-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="flex justify-center mb-6 text-green-500"
                  >
                    <CheckCircle size={80} />
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-4">Application Submitted!</h2>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    Thank you for your interest in Keplix. We've received your application and will be in touch soon.
                  </p>
                  <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
                    <Link href="/">Return to Home</Link>
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="name" className="block text-sm font-medium mb-2">
                        Full Name <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`bg-gray-800 border-gray-700 focus:border-red-600 focus:ring-red-600/20 ${
                          errors.name ? "border-red-600" : ""
                        }`}
                      />
                      {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                      <Label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        className={`bg-gray-800 border-gray-700 focus:border-red-600 focus:ring-red-600/20 ${
                          errors.email ? "border-red-600" : ""
                        }`}
                      />
                      {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="block text-sm font-medium mb-2">
                        Phone Number <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formState.phone}
                        onChange={handleChange}
                        placeholder="Your phone number"
                        className={`bg-gray-800 border-gray-700 focus:border-red-600 focus:ring-red-600/20 ${
                          errors.phone ? "border-red-600" : ""
                        }`}
                      />
                      {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                    </div>

                    <div>
                      <Label htmlFor="carModel" className="block text-sm font-medium mb-2">
                        Car Make & Model <span className="text-red-600">*</span>
                      </Label>
                      <Input
                        id="carModel"
                        name="carModel"
                        value={formState.carModel}
                        onChange={handleChange}
                        placeholder="e.g., Honda City, Maruti Swift"
                        className={`bg-gray-800 border-gray-700 focus:border-red-600 focus:ring-red-600/20 ${
                          errors.carModel ? "border-red-600" : ""
                        }`}
                      />
                      {errors.carModel && <p className="mt-1 text-sm text-red-600">{errors.carModel}</p>}
                    </div>

                    <div>
                      <Label htmlFor="reason" className="block text-sm font-medium mb-2">
                        Why are you interested in Keplix? (Optional)
                      </Label>
                      <Textarea
                        id="reason"
                        name="reason"
                        value={formState.reason}
                        onChange={handleChange}
                        placeholder="Tell us why you're interested in joining our beta program"
                        rows={4}
                        className="bg-gray-800 border-gray-700 focus:border-red-600 focus:ring-red-600/20"
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeTerms"
                        name="agreeTerms"
                        checked={formState.agreeTerms}
                        onCheckedChange={(checked) =>
                          setFormState((prev) => ({ ...prev, agreeTerms: checked === true }))
                        }
                        className={errors.agreeTerms ? "border-red-600" : ""}
                      />
                      <div className="grid gap-1.5 leading-none">
                        <Label
                          htmlFor="agreeTerms"
                          className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${
                            errors.agreeTerms ? "text-red-600" : ""
                          }`}
                        >
                          I agree to the terms and conditions <span className="text-red-600">*</span>
                        </Label>
                        {errors.agreeTerms && <p className="text-sm text-red-600">{errors.agreeTerms}</p>}
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center">
                          Submit Application <Send size={18} className="ml-2" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </motion.div>

            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>
                By joining our beta program, you'll help shape the future of Keplix and get early access to exclusive
                features.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
