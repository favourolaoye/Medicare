"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"

// Sample slide data - replace with your actual content
const slides = [
  {
    image: "/auth.png",
    title: "Video consult top doctors from the comfort of your home.",
    description: "These are Specialists in their respective fields, which includes Brain & Nervous system",
  },
  {
    image: "/alarm.png",
    title: "Communicate in the best & effective way possible.",
    description: "Time and health are precious assets we don't compromise on",
  },

]

export default function Auth() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }, [])


  // Auto-slide functionality
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      nextSlide()
    }, 3000) 

    return () => clearInterval(interval)
  }, [isPaused, nextSlide])

  return (
    <div className="flex flex-col items-center justify-between min-h-screen px-6 py-12 bg-background">
      <div
        className="flex-1 flex flex-col items-center justify-center w-full"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative w-64 h-64 mb-8">
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-primary z-10"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-primary z-10"></div>

          {/* Slider navigation buttons */}

          {/* Slides container */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out h-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="flex-shrink-0 w-full h-full flex items-center justify-center">
                  <Image
                    src={slide.image || "/placeholder.svg"}
                    alt={`Slide ${index + 1}`}
                    width={180}
                    height={180}
                    className="z-10"
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex space-x-2 mb-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-primary" : "bg-primary/30"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Text content with animation */}
        <div className="relative overflow-hidden w-full" style={{ height: "150px" }}>
          <div
            className="absolute w-full transition-transform duration-500 ease-in-out"
            style={{ transform: `translateY(-${currentSlide * 150}px)` }}
          >
            {slides.map((slide, index) => (
              <div key={index} className="h-[200px] flex flex-col items-center">
                <h1 className="text-xl text-center md: font-bold mb-2 max-w-xs">{slide.title}</h1>
                <p className="text-muted-foreground text-center text-sm max-w-xs">{slide.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="w-full max-w-xs space-y-3 mb-4 mt-2">
        <Link
          href="/auth/login"
          className="block w-full text-center border border-input  bg-background text-foreground font-medium py-3.5 rounded-md hover:bg-accent transition"
        >
          Sign In
        </Link>

        <Link
          href="/auth/register"
          className="block w-full text-center border bg-primary text-primary-foreground font-medium py-3.5 rounded-md  hover:bg-primary/90 transition"
        >
          Create an account
        </Link>
      </div>
    </div>
  )
}

