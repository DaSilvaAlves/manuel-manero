'use client'

import React, { useState } from 'react'

export interface TimelineEvent {
  id: string
  year: string
  title: string
  description: string
  details: string
  icon: string
}

interface TimelineItemProps {
  event: TimelineEvent
  isOpen: boolean
  onToggle: (id: string) => void
}

function TimelineItem({ event, isOpen, onToggle }: TimelineItemProps) {
  return (
    <div className="mb-8">
      <button
        onClick={() => onToggle(event.id)}
        className="w-full text-left group"
        aria-expanded={isOpen}
      >
        {/* Timeline connector */}
        <div className="relative pl-8 sm:pl-16 hover:pl-18 transition-all">
          {/* Timeline dot */}
          <div className="absolute left-0 top-1 w-4 h-4 rounded-full bg-accent ring-4 ring-background group-hover:scale-125 transition-transform" />

          {/* Content */}
          <div className="rounded-lg border border-slate-200 dark:border-slate-700 p-4 sm:p-6 hover:border-accent hover:shadow-md transition-all">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{event.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-accent">{event.year}</p>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {event.title}
                    </h3>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Expand indicator */}
              <div className="ml-4 flex-shrink-0">
                <svg
                  className={`w-5 h-5 text-slate-400 transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
            </div>

            {/* Expandable details */}
            {isOpen && (
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                  {event.details}
                </p>
              </div>
            )}
          </div>
        </div>
      </button>
    </div>
  )
}

interface TimelineProps {
  events: TimelineEvent[]
  defaultOpenId?: string
}

export function Timeline({ events, defaultOpenId }: TimelineProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId || null)

  const toggleTimeline = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="max-w-3xl mx-auto">
      {events.map((event) => (
        <TimelineItem
          key={event.id}
          event={event}
          isOpen={openId === event.id}
          onToggle={toggleTimeline}
        />
      ))}
    </div>
  )
}
