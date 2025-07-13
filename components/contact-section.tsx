"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MessageCircle, Send, Phone } from "lucide-react"

export function ContactSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-700">
      <div className="max-w-4xl mx-auto text-center text-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Свяжитесь с нами</h2>
        <p className="text-xl mb-12 opacity-90">Получите консультацию и оформите заказ прямо сейчас</p>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-12">
          <CardContent className="p-8">
            {/* Удалён блок с номером телефона */}

            <div className="grid md:grid-cols-2 gap-6">
              <Button
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg h-auto"
                onClick={() => window.open("https://wa.me/79898024352", "_blank")}
              >
                <MessageCircle className="mr-3 h-6 w-6" />
                <div className="text-left">
                  <div className="font-bold">WhatsApp</div>
                  <div className="text-sm opacity-90">Быстрая связь</div>
                </div>
              </Button>

              <Button
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-6 text-lg h-auto"
                onClick={() => window.open("https://t.me/79898024352", "_blank")}
              >
                <Send className="mr-3 h-6 w-6" />
                <div className="text-left">
                  <div className="font-bold">Telegram</div>
                  <div className="text-sm opacity-90">Удобное общение</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-bold mb-2">Быстрый ответ</h3>
            <p className="opacity-90">Отвечаем в течение 5 минут</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Консультация</h3>
            <p className="opacity-90">Подберем идеальный уход</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">Доставка</h3>
            <p className="opacity-90">Быстрая доставка по всей России</p>
          </div>
        </div>
      </div>
    </section>
  )
}
