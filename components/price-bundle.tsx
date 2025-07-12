"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Gift, Award, Percent, ShoppingBag } from "lucide-react"

export function PriceBundle() {
  const bundleItems = [
    { name: "RF/LED устройство IntelliDerm Solutions®", price: "45,000 ₽", included: true },
    { name: "Увлажняющий тоник TimeWise®", price: "2,500 ₽", included: true },
    { name: "Сыворотка с витамином C", price: "3,800 ₽", included: true },
    { name: "Увлажняющий лосьон LumiVie", price: "3,200 ₽", included: true },
    { name: "Укрепляющий крем TimeWise Plus", price: "4,500 ₽", included: true },
    { name: "Коррекция морщин IntelliDerm", price: "3,900 ₽", included: true },
    { name: "Ампула против морщин", price: "4,200 ₽", included: true },
  ]

  const bonuses = [
    { icon: Gift, title: "Подарок", description: "Косметичка Mary Kay + мини-пробники" },
    { icon: Award, title: "Сертификат", description: "Подарочный сертификат на 3,000 ₽" },
    { icon: Percent, title: "Скидка", description: "Экономия 15,000 ₽ при покупке набора" },
  ]

  const totalPrice = bundleItems.reduce((sum, item) => sum + Number.parseInt(item.price.replace(/[^\d]/g, "")), 0)
  const bundlePrice = 52000
  const savings = totalPrice - bundlePrice

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 text-lg">
            Специальное предложение
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Полный набор для омоложения
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            RF/LED устройство + 6 продуктов Mary Kay + подарки по фиксированной цене
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Bundle Contents */}
          <Card className="p-8 bg-white shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-purple-600" />
              Состав набора
            </h3>

            <div className="space-y-4 mb-8">
              {bundleItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-700 font-medium">{item.name}</span>
                  <span className="text-purple-600 font-bold">{item.price}</span>
                </div>
              ))}
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center justify-between text-lg mb-2">
                <span className="text-gray-600">Общая стоимость:</span>
                <span className="text-gray-400 line-through">{totalPrice.toLocaleString()} ₽</span>
              </div>
              <div className="flex items-center justify-between text-2xl font-bold">
                <span className="text-gray-800">Цена набора:</span>
                <span className="text-green-600">{bundlePrice.toLocaleString()} ₽</span>
              </div>
              <div className="text-center mt-4">
                <Badge className="bg-red-500 text-white px-4 py-2 text-lg">
                  Экономия: {savings.toLocaleString()} ₽
                </Badge>
              </div>
            </div>
          </Card>

          {/* Bonuses and CTA */}
          <div className="space-y-8">
            <Card className="p-8 bg-gradient-to-br from-white to-gray-50">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Дополнительные бонусы</h3>

              <div className="space-y-6 mb-8">
                {bonuses.map((bonus, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white">
                      <bonus.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800 mb-1">{bonus.title}</h4>
                      <p className="text-gray-600">{bonus.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center">
              <h3 className="text-3xl font-bold mb-4">Готовы начать преображение?</h3>
              <p className="text-xl mb-6 opacity-90">Полный комплекс для профессионального ухода за кожей</p>

              <div className="space-y-4">
                <Button
                  size="lg"
                  className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-4 text-xl font-bold w-full"
                  onClick={() => window.open("https://wa.me/79898024352", "_blank")}
                >
                  Заказать набор за {bundlePrice.toLocaleString()} ₽
                </Button>

                <div className="flex items-center justify-center gap-4 text-sm opacity-90">
                  <span>✓ Бесплатная доставка</span>
                  <span>✓ Гарантия качества</span>
                  <span>✓ Консультация включена</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
