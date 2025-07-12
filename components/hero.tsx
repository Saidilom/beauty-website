"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Zap, Shield, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { getSiteContent } from "@/lib/firebase-admin-service"

export function Hero() {
  const [content, setContent] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSiteContent().then((data) => {
      const hero = data.find((item: any) => item.section === "hero")
      setContent(hero)
      setLoading(false)
    })
  }, [])

  const benefits = content?.benefits && Array.isArray(content.benefits) && content.benefits.length > 0
    ? content.benefits.map((text: string, i: number) => ({ icon: [Sparkles, Zap, Shield, Clock][i % 4], text }))
    : [
        { icon: Sparkles, text: "Профессиональный результат дома" },
        { icon: Zap, text: "RF/LED технология нового поколения" },
        { icon: Shield, text: "Безопасно и эффективно" },
        { icon: Clock, text: "Видимый эффект за 2 недели" },
      ]

  if (loading) return null

  return (
    <section id="home" className="pt-16 min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2">
                {content?.badge || "Эксклюзивное предложение"}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                  {content?.title?.split("\n")[0] || "Омоложение"}
                </span>
                <br />{content?.title?.split("\n")[1] || "в домашних условиях"}
                <br />
                <span className="text-gray-800">{content?.title?.split("\n")[2] || "как в салоне"}</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {content?.description || "RF/LED устройство IntelliDerm Solutions® + премиальная косметика Mary Kay. Полный комплекс для профессионального ухода за кожей."}
              </p>
            </div>

            {/* Benefits */}
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                  <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg text-white">
                    <benefit.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{benefit.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                onClick={() => window.open("https://wa.me/79898024352", "_blank")}
              >
                {content?.buttonText || "Заказать набор"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-pink-600 text-pink-600 hover:bg-pink-50 px-8 py-4 text-lg bg-transparent"
                onClick={() => document.getElementById("about-product")?.scrollIntoView({ behavior: "smooth" })}
              >
                Узнать больше
              </Button>
            </div>
          </div>

          {/* Right Content - Device Image */}
          <div className="relative">
            <div className="relative h-[600px] bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-pink-100/50 to-transparent"></div>
              <Image
                src={content?.image || "/images/device-usage.png"}
                alt="RF/LED устройство для омоложения"
                fill
                className="object-contain p-8"
                quality={100}
                priority
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg animate-bounce">
              <Sparkles className="h-8 w-8 text-pink-500" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full p-4 shadow-lg">
              <Zap className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
