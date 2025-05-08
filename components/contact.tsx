"use client"

import { useState, useRef } from "react"
import { motion, useAnimation } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const envelopeControls = useAnimation()
  const formRef = useRef(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Animate envelope
    await envelopeControls.start({
      rotateY: [0, 180],
      transition: { duration: 1 },
    })

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form
    setFormState({
      name: "",
      email: "",
      message: "",
    })

    // Reset animation after delay
    setTimeout(() => {
      envelopeControls.start({
        rotateY: 0,
        transition: { duration: 0.5 },
      })
      setIsSubmitted(false)
    }, 3000)
  }

  const faqs = [
    {
      question: "When does the app launch?",
      answer: "Keplix is scheduled to launch in Q4 2025, initially serving the Delhi region.",
    },
    {
      question: "How do I join the beta?",
      answer:
        "You can sign up for our beta program by clicking the 'Join Beta' button at the top of the page or filling out the contact form.",
    },
    {
      question: "What services will Keplix offer?",
      answer:
        "Keplix will connect you with providers for repairs, maintenance, modifications, and emergency services for all types of vehicles.",
    },
    {
      question: "Will Keplix be available outside Delhi?",
      answer:
        "Initially, Keplix will launch in Delhi, with plans to expand to other major Indian cities shortly after the successful Delhi launch.",
    },
  ]

  return (
    <section className="py-20 bg-black" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Let's <span className="text-red-600">Connect</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Have questions about Keplix? Want to join our beta program? We'd love to hear from you.
          </p>
          <div className="mt-6">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-2" asChild>
              <Link href="/join-beta">Join Beta Program</Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
              <div className="flex justify-center mb-6">
                <motion.div animate={envelopeControls} className="text-red-600">
                  <Mail size={48} />
                </motion.div>
              </div>

              {isSubmitted ? (
                <div className="text-center py-8">
                  <h3 className="text-xl font-bold mb-2">Thank You!</h3>
                  <p className="text-gray-400">Your message has been received. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="bg-gray-800 border-gray-700 focus:border-red-600 focus:ring-red-600/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                        className="bg-gray-800 border-gray-700 focus:border-red-600 focus:ring-red-600/20"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        rows={4}
                        required
                        className="bg-gray-800 border-gray-700 focus:border-red-600 focus:ring-red-600/20"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Send Message <Send size={16} className="ml-2" />
                        </span>
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          <motion.div
            className="flex-1"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
              <h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>

              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              <div className="mt-8 pt-6 border-t border-gray-800">
                <h4 className="font-bold mb-2">Contact Information</h4>
                <p className="text-gray-400 mb-1">Email: support@keplix.com</p>
                <p className="text-gray-400">Location: New Delhi, India</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
