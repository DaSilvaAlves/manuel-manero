'use client'

import React, { useState } from 'react'

export interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
  rating?: number
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[]
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="w-full space-y-6">
      {/* Testimonial Display */}
      <div className="relative rounded-lg border border-slate-200 dark:border-slate-700 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 sm:p-8 min-h-[280px] flex flex-col justify-between">
        {/* Stars */}
        {currentTestimonial.rating && (
          <div className="flex gap-1 mb-4">
            {[...Array(currentTestimonial.rating)].map((_, i) => (
              <span key={i} className="text-accent text-lg">
                ★
              </span>
            ))}
          </div>
        )}

        {/* Quote */}
        <blockquote className="text-lg sm:text-xl italic text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
          &quot;{currentTestimonial.quote}&quot;
        </blockquote>

        {/* Attribution */}
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">
            {currentTestimonial.author}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {currentTestimonial.role}
          </p>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          className="p-2 sm:p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Previous testimonial"
          title="Anterior"
        >
          <svg
            className="w-5 h-5 text-slate-600 dark:text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="flex gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-accent w-8'
                  : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === currentIndex}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          className="p-2 sm:p-3 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Next testimonial"
          title="Próximo"
        >
          <svg
            className="w-5 h-5 text-slate-600 dark:text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Counter */}
      <div className="text-center text-sm text-slate-600 dark:text-slate-400">
        {currentIndex + 1} de {testimonials.length}
      </div>
    </div>
  )
}
