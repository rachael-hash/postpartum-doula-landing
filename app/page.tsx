"use client"

import type React from "react"
import { useState, useEffect } from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Download, Star } from "lucide-react"
import { EmailCapture } from "@/components/email-capture"

// Extend Window interface for tracking
declare global {
  interface Window {
    trackEvent: (eventName: string, eventData: any) => void
  }
}

export default function Home() {
  const [emailSubmitted, setEmailSubmitted] = useState(false)

  const safeTrackEvent = (eventName: string, eventData: any) => {
    try {
      if (typeof window !== "undefined" && window.trackEvent) {
        window.trackEvent(eventName, eventData)
      }
    } catch (error) {
      console.log("Tracking error (non-critical):", error)
    }
  }

  useEffect(() => {
    // Track page view
    safeTrackEvent("page_view", {
      page_title: "Natural Mom Wellness Landing Page",
      page_location: window.location.href,
      content_group1: "Landing Page",
    })
  }, [])

  const handlePurchase = async () => {
    // Track purchase intent
    safeTrackEvent("begin_checkout", {
      event_category: "E-commerce",
      event_label: "Pregnancy Postpartum Guide",
      value: 19,
      currency: "USD",
      items: [
        {
          item_id: "pregnancy-postpartum-guide",
          item_name: "Pregnancy and Postpartum Guide",
          category: "Digital Product",
          quantity: 1,
          price: 19,
        },
      ],
    })

      if (typeof window !== "undefined") {
      window.location.href = "https://buy.stripe.com/14AbJ141S1ht8kX2mp67S00"
      }

   
    }

  const handleEmailSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setEmailSubmitted(true)
  }

  const trackButtonClick = (buttonName: string, value?: number) => {
    safeTrackEvent("click", {
      event_category: "User Interaction",
      event_label: buttonName,
      value: value || 0,
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container flex h-14 md:h-16 items-center justify-between py-2 md:py-4 px-4">
          <Link href="/" className="flex items-center">
            <span className="text-lg md:text-xl font-semibold text-[#2C5F41]">Natural Mom Wellness</span>
          </Link>
          <Button
            onClick={() => {
              trackButtonClick("Header Buy Now", 19)
              handlePurchase()
            }}
            className="bg-[#4A9B5E] hover:bg-[#2C5F41] h-10 md:h-auto text-sm md:text-base px-3 md:px-4"
          >
            Buy Now - $19
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-[#F8FAF6] py-12 md:py-16 lg:py-24">
          <div className="container grid gap-6 md:gap-8 md:grid-cols-2 md:items-center">
            <div className="flex flex-col gap-3 md:gap-4 order-2 md:order-1">
              <Badge className="w-fit bg-[#E8F2EA] text-[#2C5F41] hover:bg-[#E8F2EA] text-xs md:text-sm">
                From a Certified Postpartum Doula
              </Badge>
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight text-[#2C5F41] leading-tight">
                Pregnancy and Postpartum Guide: Holistic Care for Mom and Baby
              </h1>
              <p className="text-lg md:text-xl text-[#4A9B5E] font-medium leading-relaxed">
                The 20 Questions Every Mom Asks (And the Real Answers That Actually Work)
              </p>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Written by Rachael Hernandez, a certified postpartum doula and lactation counselor who's supported
                hundreds of families through pregnancy, birth, and early parenthood.
              </p>
              <div className="flex flex-col gap-3 mt-2 md:mt-4">
                <Button
                  onClick={() => {
                    trackButtonClick("Hero CTA", 19)
                    handlePurchase()
                  }}
                  size="lg"
                  className="bg-[#4A9B5E] hover:bg-[#2C5F41] text-white h-12 md:h-14 text-base md:text-lg px-6 md:px-8"
                >
                  Get Instant Access - Just $19 <Download className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </div>
              <div className="flex items-center gap-2 mt-2 md:mt-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium">Real solutions that actually work</span>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden order-1 md:order-2">
              <Image
                src="/images/ebook-cover.png"
                alt="Pregnancy & Postpartum Guide: Holistic Care for Mom & Baby ebook cover"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </section>

        {/* Email Capture Section */}
        <EmailCapture
          emailSubmitted={emailSubmitted}
          handleEmailSignup={handleEmailSignup}
          handlePurchase={() => {
            trackButtonClick("Email Section CTA", 19)
            handlePurchase()
          }}
        />

        {/* What's Inside */}
        <section className="py-12 md:py-16 bg-[#F8FAF6]">
          <div className="container px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-[#2C5F41]">The 20 Most Asked Questions</h2>
              <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Real answers from a doula who's heard these questions hundreds of times - not theories from textbooks,
                but practical solutions that busy moms can actually use.
              </p>
            </div>

            <div className="grid gap-6 md:gap-8">
              <Card className="border-none shadow-sm">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-[#2C5F41]">
                    Postpartum Recovery (Questions 1-10)
                  </h3>
                  <ul className="space-y-2 md:space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#4A9B5E] mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">
                        How to heal from tears, episiotomy, or C-section naturally
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#4A9B5E] mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">
                        Natural remedies for postpartum bleeding (and when to worry)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#4A9B5E] mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">
                        How to increase milk supply without expensive supplements
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#4A9B5E] mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">
                        Solutions for cracked, sore nipples and breastfeeding pain
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#4A9B5E] mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">How to balance hormones and mood swings after birth</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#4A9B5E] mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">
                        Natural approaches for postpartum anxiety and baby blues
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-[#2C5F41]">
                    Pregnancy Wellness (Questions 11-17)
                  </h3>
                  <ul className="space-y-2 md:space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#4A9B5E] mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">
                        What to safely take for morning sickness that actually works
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#4A9B5E] mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">
                        How to get rid of pregnancy heartburn without antacids
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#4A9B5E] mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Essential oils that are safe during pregnancy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#4A9B5E] mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Natural ways to reduce pregnancy swelling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#4A9B5E] mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Remedies for pregnancy insomnia and restless sleep</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#4A9B5E] mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">How to boost energy during pregnancy fatigue</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardContent className="p-4 md:p-6">
                  <h3 className="text-lg md:text-xl font-semibold mb-3 md:mb-4 text-[#2C5F41]">
                    Birth Preparation & Breastfeeding (Questions 18-20)
                  </h3>
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#4A9B5E] mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">
                        The most important thing to know about preparing for birth
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#4A9B5E] mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">
                        The most common call postpartum doulas get about new babies
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-[#4A9B5E] mt-0.5 flex-shrink-0" />
                      <span className="text-sm md:text-base">Why breastfeeding is important for babies and moms</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About the Author */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container px-4">
            <div className="grid gap-6 md:gap-8 items-center">
              <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden mx-auto max-w-sm md:max-w-none">
                <img
                  src="/images/Hernandez-39.webp"
                  alt="Rachael Hernandez, Certified Postpartum Doula, with her daughter"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <Badge className="mb-2 bg-[#E8F2EA] text-[#2C5F41] hover:bg-[#E8F2EA] text-xs md:text-sm">
                  About the Author
                </Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-[#2C5F41] mb-3 md:mb-4">
                  Rachael Hernandez, Certified Postpartum Doula & Lactation Counselor
                </h2>
                <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed">
                  Rachael has supported families through pregnancy, birth, and early parenthood for over a decade. She
                  has provided overnight newborn care in families' homes, helped hundreds of mothers with breastfeeding
                  challenges, and currently manages a company offering comprehensive postpartum services.
                </p>
                <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 leading-relaxed">
                  As a mother of two, she has personally experienced both medicated hospital birth and natural birth
                  center delivery, and successfully breastfed both children for two years each.
                </p>
                <p className="text-sm md:text-base text-muted-foreground mb-4 md:mb-6 leading-relaxed">
                  Her approach combines professional training with real-world experience and a commitment to giving
                  families practical solutions that actually work in everyday life.
                </p>
                <Button
                  onClick={() => {
                    trackButtonClick("Author Section CTA", 19)
                    handlePurchase()
                  }}
                  className="bg-[#4A9B5E] hover:bg-[#2C5F41] h-12 text-base px-6"
                >
                  Get Your Copy - Just $19
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits */}
        <section className="py-16 bg-[#F8FAF6]">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-[#2C5F41]">Why This Guide Is Different</h2>
              <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">
                These aren't theories from textbooks - they're practical remedies that busy moms can actually use
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <Card className="border-none shadow-sm text-center">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-[#E8F2EA] p-3 w-fit mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-[#4A9B5E]"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Real Experience</h3>
                  <p className="text-muted-foreground">
                    Every answer comes from years of working with hundreds of families who've tried these methods
                    successfully
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm text-center">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-[#E8F2EA] p-3 w-fit mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-[#4A9B5E]"
                    >
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Practical Solutions</h3>
                  <p className="text-muted-foreground">
                    No complicated medical advice you can't follow - just simple remedies that busy moms can actually
                    use
                  </p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm text-center">
                <CardContent className="p-6">
                  <div className="mb-4 rounded-full bg-[#E8F2EA] p-3 w-fit mx-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6 text-[#4A9B5E]"
                    >
                      <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Honest Answers</h3>
                  <p className="text-muted-foreground">
                    Real talk about what works, what doesn't, and when to seek professional help - no sugar-coating
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-[#2C5F41] text-white">
          <div className="container text-center max-w-3xl px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
              Stop Struggling Through Pregnancy and Postpartum Alone
            </h2>
            <p className="mb-4 md:mb-6 text-base md:text-lg leading-relaxed">
              Get instant access to the real answers you need for just $19. These are the same solutions Rachael shares
              with families who pay hundreds for her in-person support.
            </p>
            <Button
              onClick={() => {
                trackButtonClick("Main CTA", 19)
                handlePurchase()
              }}
              size="lg"
              className="bg-white text-[#2C5F41] hover:bg-gray-100 h-12 md:h-14 text-base md:text-lg px-6 md:px-8"
            >
              Download Now - Just $19 <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <p className="mt-3 md:mt-4 text-xs md:text-sm text-white/80">
              Secure payment • Instant download • PDF format • 30-day money-back guarantee
            </p>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-12 bg-[#F8FAF6]">
          <div className="container text-center">
            <h2 className="text-2xl font-bold text-[#2C5F41] mb-4">Get the Real Answers You've Been Looking For</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of moms who have found relief, confidence, and practical support through this essential
              guide written by someone who truly understands your journey.
            </p>
            <Button
              onClick={() => {
                trackButtonClick("Final CTA", 19)
                handlePurchase()
              }}
              size="lg"
              className="bg-[#4A9B5E] hover:bg-[#2C5F41]"
            >
              Get Your Copy Now - $19
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-[#2C5F41] text-white py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <span className="text-lg font-semibold">Natural Mom Wellness</span>
            </div>
            <p className="text-sm text-white/80">
              &copy; {new Date().getFullYear()} Natural Mom Wellness. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
