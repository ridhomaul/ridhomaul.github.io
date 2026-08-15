"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ArrowUpRight } from "lucide-react"

export interface ShowcaseItem {
  title: string
  description: string
  year: string
  link?: string
  image: string
}

interface ProjectShowcaseProps {
  title?: string;
  items: ShowcaseItem[];
}

export function ProjectShowcase({ title = "Selected Work", items }: ProjectShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [containerRect, setContainerRect] = useState({ left: 0, top: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setContainerRect({ left: rect.left, top: rect.top })
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setIsVisible(false)
  }

  return (
    <section ref={containerRef} onMouseMove={handleMouseMove} className="relative w-full max-w-4xl mx-auto py-8">
      <h2 className="text-muted-foreground text-sm font-medium tracking-wide uppercase mb-12">{title}</h2>

      {/* Floating Image Container */}
      <div
        className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl hidden md:block"
        style={{
          left: containerRect.left,
          top: containerRect.top,
          transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative w-[320px] h-[200px] bg-secondary rounded-xl overflow-hidden">
          {items.map((item, index) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={item.title + index}
              src={item.image || "/placeholder.svg"}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                scale: hoveredIndex === index ? 1 : 1.1,
                filter: hoveredIndex === index ? "none" : "blur(10px)",
              }}
            />
          ))}
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </div>
      </div>

      <div className="space-y-0 relative z-10">
        {items.map((item, index) => {
          const Wrapper = item.link ? "a" : "div";
          const wrapperProps = item.link ? { href: item.link } : {};
          
          return (
            <Wrapper
              key={item.title + index}
              {...wrapperProps}
              className="group block cursor-pointer"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative py-6 md:py-8 border-t border-border transition-all duration-300 ease-out">
                {/* Background highlight on hover */}
                <div
                  className={`
                    absolute inset-0 -mx-4 px-4 bg-secondary/30 dark:bg-secondary/10 rounded-lg
                    transition-all duration-300 ease-out
                    ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-95"}
                  `}
                />

                <div className="relative flex flex-col md:flex-row items-start justify-between gap-4 md:gap-8">
                  <div className="flex-1 min-w-0">
                    {/* Title with animated underline */}
                    <div className="inline-flex items-center gap-2">
                      <h3 className="text-foreground font-semibold text-xl md:text-2xl tracking-tight">
                        <span className="relative">
                          {item.title}
                          {/* Animated underline */}
                          <span
                            className={`
                              absolute left-0 -bottom-0.5 h-px bg-foreground
                              transition-all duration-300 ease-out
                              ${hoveredIndex === index ? "w-full" : "w-0"}
                            `}
                          />
                        </span>
                      </h3>

                      {/* Arrow that slides in */}
                      {item.link && (
                        <ArrowUpRight
                          className={`
                            w-5 h-5 text-muted-foreground
                            transition-all duration-300 ease-out
                            ${
                              hoveredIndex === index
                                ? "opacity-100 translate-x-0 translate-y-0 text-foreground"
                                : "opacity-0 -translate-x-2 translate-y-2"
                            }
                          `}
                        />
                      )}
                    </div>

                    {/* Description with fade effect */}
                    <p
                      className={`
                        text-muted-foreground text-sm md:text-base mt-3 leading-relaxed max-w-2xl
                        transition-all duration-300 ease-out
                        ${hoveredIndex === index ? "text-foreground/90" : "text-muted-foreground"}
                      `}
                    >
                      {item.description}
                    </p>
                  </div>

                  {/* Year badge */}
                  <span
                    className={`
                      text-sm md:text-base font-mono text-muted-foreground tabular-nums whitespace-nowrap mt-2 md:mt-0
                      transition-all duration-300 ease-out
                      ${hoveredIndex === index ? "text-foreground/90 font-medium" : ""}
                    `}
                  >
                    {item.year}
                  </span>
                </div>
              </div>
            </Wrapper>
          )
        })}

        {/* Bottom border for last item */}
        <div className="border-t border-border" />
      </div>
    </section>
  )
}
