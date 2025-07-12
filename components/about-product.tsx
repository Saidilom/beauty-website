'use client'

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Zap, Shield, Clock, Star, Heart } from "lucide-react"
import { useEffect, useState } from "react"
import { getSiteContent } from "@/lib/firebase-admin-service"

export function AboutProduct() {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSiteContent().then((data) => {
      const about = data.find((item: any) => item.section === "about-product")
      setContent(about)
      setLoading(false)
    })
  }, [])

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

  if (loading) return null

  return (
    <section id="about-product" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-lg">
            {content?.badge || "Главный продукт"}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            {content?.title || "RF/LED устройство IntelliDerm Solutions®"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {content?.description || "Многофункциональный аппарат для профессионального ухода за кожей в домашних условиях. 5 технологий в одном устройстве."}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Device Info Image */}
          <Card className="overflow-hidden shadow-2xl">
            <CardContent className="p-0">
              <div className="relative h-[600px]">
                <Image
                  src={content?.image || "/images/device-info.png"}
                  alt="Информация об RF/LED устройстве"
                  fill
                  className="object-contain p-4"
                  quality={100}
                />
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-8 text-gray-800">5 функций в одном устройстве</h3>
              <div className="grid gap-6">
                {features.map((feature, index) => (
                  <Card
                    key={index}
                    className="p-6 hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500"
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                        <feature.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h4>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-none">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4 text-gray-800">Результаты применения</h3>
            <p className="text-lg text-gray-600">Видимые изменения уже через 2 недели регулярного использования</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result, index) => (
              <div key={index} className="flex items-center gap-3 p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{result}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </section>
  )
}
