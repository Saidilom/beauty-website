"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, Phone, Clock, Shield, Truck } from "lucide-react"

export function ContactOrder() {
  const advantages = [
    { icon: Clock, title: "Быстрый ответ", description: "Отвечаем в течение 5 минут" },
    { icon: Shield, title: "Гарантия качества", description: "100% оригинальная продукция" },
    { icon: Truck, title: "Бесплатная доставка", description: "По всей России при заказе набора" },
  ]

  return (
    <section id="order" className="py-20 px-4 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 text-white">
          <Badge className="mb-4 bg-white text-purple-600 px-6 py-2 text-lg font-semibold">Оформить заказ</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Готовы начать преображение?</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto">
            Свяжитесь с нами любым удобным способом для оформления заказа и получения консультации
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Methods */}
          <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-0">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Способы связи</h3>

              <div className="flex items-center justify-center gap-4 mb-8 text-white">
                <Phone className="h-8 w-8" />
                <span className="text-2xl font-bold">+7 (989) 802-43-52</span>
              </div>

              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg h-auto"
                  onClick={() => window.open("https://wa.me/79898024352", "_blank")}
                >
                  <MessageCircle className="mr-4 h-8 w-8" />
                  <div className="text-left">
                    <div className="font-bold text-lg">WhatsApp</div>
                    <div className="text-sm opacity-90">Быстрое оформление заказа</div>
                  </div>
                </Button>

                <Button
                  size="lg"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg h-auto"
                  onClick={() => window.open("https://t.me/79898024352", "_blank")}
                >
                  <Send className="mr-4 h-8 w-8" />
                  <div className="text-left">
                    <div className="font-bold text-lg">Telegram</div>
                    <div className="text-sm opacity-90">Удобное общение и консультации</div>
                  </div>
                </Button>
              </div>

              <div className="mt-8 p-4 bg-white/10 rounded-lg text-white text-center">
                <p className="text-sm opacity-90 mb-2">Работаем ежедневно</p>
                <p className="font-semibold">с 9:00 до 21:00 (МСК)</p>
              </div>
            </CardContent>
          </Card>

          {/* Advantages */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-8 text-center">Почему выбирают нас</h3>

            {advantages.map((advantage, index) => (
              <Card key={index} className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-lg">
                    <advantage.icon className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-white">
                    <h4 className="text-lg font-semibold mb-2">{advantage.title}</h4>
                    <p className="opacity-90">{advantage.description}</p>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-6 bg-white text-center">
              <h4 className="text-xl font-bold text-gray-800 mb-4">Специальная цена действует ограниченное время!</h4>
              <div className="text-3xl font-bold text-purple-600 mb-2">52,000 ₽</div>
              <div className="text-gray-500 line-through mb-4">вместо 67,100 ₽</div>
              <Badge className="bg-red-500 text-white px-4 py-2">Экономия 15,100 ₽</Badge>
            </Card>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Card className="p-8 bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <h3 className="text-2xl font-bold mb-4">Что входит в стоимость:</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>✓ RF/LED устройство</div>
              <div>✓ 6 продуктов Mary Kay</div>
              <div>✓ Подарочная косметичка</div>
              <div>✓ Сертификат на 3,000 ₽</div>
              <div>✓ Бесплатная доставка</div>
              <div>✓ Гарантия 12 месяцев</div>
              <div>✓ Техподдержка</div>
              <div>✓ Инструкция на русском</div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
