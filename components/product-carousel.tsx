"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { Card } from "@/components/ui/card"

const carouselImages = [
  { src: "/images/device-info.png", alt: "RF/LED аппарат - информация", type: "vertical" },
  { src: "/images/device-usage.png", alt: "Использование аппарата", type: "horizontal" },
  { src: "/images/serum.png", alt: "Mary Kay сыворотки", type: "horizontal" },
  { src: "/images/moisturizer.png", alt: "Увлажняющий лосьон", type: "vertical" },
  { src: "/images/firming-cream.png", alt: "Укрепляющий крем", type: "horizontal" },
  { src: "/images/wrinkle-limiter.png", alt: "Средство от морщин", type: "vertical" },
]

export function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length)
  }

  const progress = ((currentIndex + 1) / carouselImages.length) * 100

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Галерея продукции
        </h2>

        <Card className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 shadow-2xl">
          <div className="relative h-[400px] md:h-[600px] lg:h-[700px]">
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent z-10"></div>

            <Image
              src={carouselImages[currentIndex].src || "/placeholder.svg"}
              alt={carouselImages[currentIndex].alt}
              fill
              className="object-contain p-4"
              quality={100}
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />

            {/* Navigation Buttons */}
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/90 hover:bg-white shadow-lg"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Play/Pause Button */}
            <Button
              variant="outline"
              size="icon"
              className="absolute top-4 right-4 z-20 bg-white/90 hover:bg-white shadow-lg"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>

            {/* Counter */}
            <div className="absolute top-4 left-4 z-20 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
              {currentIndex + 1} / {carouselImages.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-gray-200">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Thumbnails */}
          <div className="p-4 bg-white">
            <div className="flex gap-2 justify-center overflow-x-auto">
              {carouselImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                    index === currentIndex
                      ? "border-purple-500 shadow-lg scale-110"
                      : "border-gray-200 hover:border-purple-300"
                  }`}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    quality={80}
                  />
                </button>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
