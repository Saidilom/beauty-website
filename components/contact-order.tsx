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
    <section id="order" className="animate-fade-in py-10 sm:py-20 px-2 sm:px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 text-gray-800">
          <Badge className="mb-4 bg-purple-600 text-white px-4 sm:px-6 py-2 text-base sm:text-lg font-semibold">Оформить заказ</Badge>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-800">Готовы начать преображение?</h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Свяжитесь с нами любым удобным способом для оформления заказа и получения консультации
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12">
          {/* Contact Methods */}
          <Card className="p-4 sm:p-8 bg-gray-50 border-gray-200">
            <CardContent className="p-0">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-8 text-center">Способы связи</h3>

              {/* Удалён блок с номером телефона */}

              <div className="space-y-2 sm:space-y-4">
                <Button
                  size="lg"
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg h-auto"
                  onClick={() => window.open("https://wa.me/79898024352", "_blank")}
                >
                  <MessageCircle className="mr-2 sm:mr-4 h-6 w-6 sm:h-8 sm:w-8" />
                  <div className="text-left">
                    <div className="font-bold text-base sm:text-lg">WhatsApp</div>
                    <div className="text-xs sm:text-sm opacity-90">Быстрое оформление заказа</div>
                  </div>
                </Button>

                <Button
                  size="lg"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg h-auto"
                  onClick={() => window.open("https://t.me/79898024352", "_blank")}
                >
                  <Send className="mr-2 sm:mr-4 h-6 w-6 sm:h-8 sm:w-8" />
                  <div className="text-left">
                    <div className="font-bold text-base sm:text-lg">Telegram</div>
                    <div className="text-xs sm:text-sm opacity-90">Удобное общение и консультации</div>
                  </div>
                </Button>
              </div>

              <div className="mt-4 sm:mt-8 p-2 sm:p-4 bg-white rounded-lg text-gray-800 text-center">
                <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Работаем ежедневно</p>
                <p className="font-semibold text-xs sm:text-base">с 9:00 до 21:00 (МСК)</p>
              </div>
            </CardContent>
          </Card>

          {/* Advantages */}
          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-lg sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-8 text-center">Почему выбирают нас</h3>

            {advantages.map((advantage, index) => (
              <Card key={index} className="p-4 sm:p-6 bg-gray-50 border-gray-200">
                <div className="flex items-start gap-2 sm:gap-4">
                  <div className="p-2 sm:p-3 bg-white rounded-lg">
                    <advantage.icon className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
                  </div>
                  <div className="text-gray-800">
                    <h4 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{advantage.title}</h4>
                    <p className="text-gray-600 text-xs sm:text-base">{advantage.description}</p>
                  </div>
                </div>
              </Card>
            ))}

            <Card className="p-4 sm:p-6 bg-white text-center border-gray-200">
              <h4 className="text-base sm:text-xl font-bold text-gray-800 mb-2 sm:mb-4">Специальная цена действует ограниченное время!</h4>
              <div className="text-xl sm:text-3xl font-bold text-purple-600 mb-1 sm:mb-2">52,000 ₽</div>
              <div className="text-gray-500 line-through mb-2 sm:mb-4">вместо 67,100 ₽</div>
              <Badge className="bg-red-500 text-white px-3 sm:px-4 py-1 sm:py-2">Экономия 15,100 ₽</Badge>
            </Card>
          </div>
        </div>

        <div className="mt-8 sm:mt-16 text-center">
          <Card className="p-4 sm:p-8 bg-gray-50 border-gray-200">
            <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4 text-gray-800">Что входит в стоимость:</h3>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-700">
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
