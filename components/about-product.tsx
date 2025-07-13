'use client'

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Zap, Shield, Clock, Star, Heart, Volume2, VolumeX } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import { getSiteContent } from "@/lib/firebase-admin-service"

export function AboutProduct() {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    getSiteContent().then((data) => {
      const about = data.find((item: any) => item.section === "about-product")
      setContent(about)
      setLoading(false)
    })
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  const features = [
    {
      icon: Zap,
      title: "RF технология",
      description: "Радиочастотный лифтинг для подтяжки кожи без операций",
    },
    {
      icon: Star,
      title: "LED терапия",
      description: "Светодиодная терапия для стимуляции регенерации клеток",
    },
    {
      icon: Shield,
      title: "ЭМС стимуляция",
      description: "Электромиостимуляция для тонуса лицевых мышц",
    },
    {
      icon: Heart,
      title: "Ионофорез",
      description: "Глубокое проникновение активных компонентов",
    },
    {
      icon: Clock,
      title: "Охлаждение",
      description: "Успокаивающий эффект после процедур",
    },
    {
      icon: CheckCircle,
      title: "Очищение",
      description: "Глубокая очистка пор от загрязнений",
    },
  ]

  const results = [
    "Разглаживание морщин и мимических линий",
    "Подтяжка овала лица",
    "Улучшение тонуса и эластичности кожи",
    "Сужение пор",
    "Выравнивание цвета лица",
    "Устранение отеков и темных кругов",
  ]

  if (loading) return (
    <section id="about-product" className="animate-fade-in py-10 sm:py-20 px-2 sm:px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-2 text-base sm:text-lg">
            {"Главный продукт"}
          </Badge>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {"RF/LED устройство IntelliDerm Solutions®"}
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {"Многофункциональный аппарат для профессионального ухода за кожей в домашних условиях. 5 технологий в одном устройстве."}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center mb-10 sm:mb-20">
          {/* Device Info Video */}
          <div className="relative w-full max-w-[98vw] aspect-[9/16] sm:h-[700px] md:h-[900px] mx-auto rounded-[32px] sm:rounded-3xl overflow-hidden border-2 border-white shadow-2xl">
            <video
              ref={videoRef}
              src="/images/instruction.mp4"
              autoPlay
              muted={true}
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-contain sm:object-cover"
              controls={false}
            />
            {/* Sound Control Button */}
            <button
              onClick={toggleMute}
              className="absolute top-4 right-4 z-30 bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200"
              aria-label={isMuted ? "Включить звук" : "Выключить звук"}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
              ) : (
                <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
              )}
            </button>
          </div>
          {/* Features */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-8 text-gray-800">5 функций в одном устройстве</h3>
              <div className="grid gap-4 sm:gap-6">
                {[
                  { icon: Zap, title: "RF технология", description: "Радиочастотный лифтинг для подтяжки кожи без операций" },
                  { icon: Star, title: "LED терапия", description: "Светодиодная терапия для стимуляции регенерации клеток" },
                  { icon: Shield, title: "ЭМС стимуляция", description: "Электромиостимуляция для тонуса лицевых мышц" },
                  { icon: Heart, title: "Ионофорез", description: "Глубокое проникновение активных компонентов" },
                  { icon: Clock, title: "Охлаждение", description: "Успокаивающий эффект после процедур" },
                  { icon: CheckCircle, title: "Очищение", description: "Глубокая очистка пор от загрязнений" },
                ].map((feature, index) => (
                  <Card
                    key={index}
                    className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                        <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-800">{feature.title}</h4>
                        <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  return (
    <section id="about-product" className="animate-fade-in py-10 sm:py-20 px-2 sm:px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-2 text-base sm:text-lg">
            {content?.badge || "Главный продукт"}
          </Badge>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {content?.title || "RF/LED устройство IntelliDerm Solutions®"}
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {content?.description || "Многофункциональный аппарат для профессионального ухода за кожей в домашних условиях. 5 технологий в одном устройстве."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 items-center mb-10 sm:mb-20">
          {/* Device Info Video */}
          <div className="relative w-full max-w-[98vw] aspect-[9/16] sm:h-[700px] md:h-[900px] mx-auto rounded-[32px] sm:rounded-3xl overflow-hidden border-2 border-white shadow-2xl">
            <video
              ref={videoRef}
              src={content?.video || "/images/instruction.mp4"}
              autoPlay
              muted={true}
              loop
              playsInline
              preload="auto"
              className="absolute inset-0 w-full h-full object-contain sm:object-cover"
              controls={false}
            />
            {/* Sound Control Button */}
            <button
              onClick={toggleMute}
              className="absolute top-4 right-4 z-30 bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-full p-2 sm:p-3 shadow-lg transition-all duration-200"
              aria-label={isMuted ? "Включить звук" : "Выключить звук"}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
              ) : (
                <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-gray-700" />
              )}
            </button>
          </div>

          {/* Features */}
          <div className="space-y-6 sm:space-y-8">
            <div>
              <h3 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-8 text-gray-800">5 функций в одном устройстве</h3>
              <div className="grid gap-4 sm:gap-6">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className="p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500"
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="p-2 sm:p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                        <feature.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div>
                        <h4 className="text-base sm:text-xl font-semibold mb-1 sm:mb-2 text-gray-800">{feature.title}</h4>
                        <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <Card className="p-4 sm:p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-none">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-3xl font-bold mb-2 sm:mb-4 text-gray-800">Результаты применения</h3>
            <p className="text-base sm:text-lg text-gray-600">
              Видимые изменения уже через 2 недели регулярного использования
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
            {results.map((result, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium text-xs sm:text-base">{result}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
