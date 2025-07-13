"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ChevronUp } from "lucide-react"

const faqData = [
  {
    question: "Как пользоваться RF/LED устройством?",
    answer:
      "Устройство очень простое в использовании. Включите прибор, выберите нужную функцию, нанесите проводящий гель и проводите процедуру согласно инструкции. Рекомендуется использовать 2-3 раза в неделю по 10-15 минут.",
  },
  {
    question: "Подходит ли устройство для чувствительной кожи?",
    answer:
      "Да, устройство имеет 5 режимов интенсивности, что позволяет подобрать комфортный уровень для любого типа кожи. Начинайте с минимального режима и постепенно увеличивайте интенсивность.",
  },
  {
    question: "Какая гарантия на устройство?",
    answer:
      "На RF/LED устройство предоставляется гарантия 12 месяцев. В случае поломки мы бесплатно отремонтируем или заменим прибор. Также предоставляется техническая поддержка.",
  },
  {
    question: "Как быстро будет доставка?",
    answer:
      "Доставка по Москве - 1-2 дня, по России - 3-7 дней. Доставка бесплатная при заказе полного набора. Отправляем транспортными компаниями СДЭК, Boxberry или Почтой России.",
  },
  {
    question: "Можно ли использовать устройство с другой косметикой?",
    answer:
      "Рекомендуется использовать с косметикой Mary Kay из нашего набора для максимального эффекта. Однако устройство совместимо с большинством профессиональных средств для ухода за кожей.",
  },
  {
    question: "Есть ли противопоказания к использованию?",
    answer:
      "Не рекомендуется использовать при беременности, наличии кардиостимулятора, металлических имплантов в области лица, онкологических заболеваниях. Перед использованием проконсультируйтесь с врачом.",
  },
  {
    question: "Можно ли вернуть товар, если не подойдет?",
    answer:
      "Да, в течение 14 дней с момента получения вы можете вернуть товар, если он не подошел. Устройство должно быть в оригинальной упаковке и без следов использования.",
  },
  {
    question: "Сколько времени нужно для видимого результата?",
    answer:
      "Первые результаты заметны уже через 1-2 недели регулярного использования. Максимальный эффект достигается через 4-6 недель. Для поддержания результата рекомендуется продолжать процедуры.",
  },
]

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  return (
    <section id="faq" className="animate-fade-in py-10 sm:py-20 px-2 sm:px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 sm:px-6 py-2 text-base sm:text-lg">
            Частые вопросы
          </Badge>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Ответы на ваши вопросы
          </h2>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Собрали самые популярные вопросы о RF/LED устройстве и косметике Mary Kay
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openItems.includes(index)

            return (
              <Card
                key={index}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer w-full max-w-full"
                onClick={() => toggleItem(index)}
              >
                <CardContent className="p-0">
                  <div className="p-4 sm:p-6 flex items-center justify-between">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 pr-2 sm:pr-4">{item.question}</h3>
                    <div className="flex-shrink-0">
                      {isOpen ? (
                        <ChevronUp className="h-5 w-5 text-purple-600" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-purple-600" />
                      )}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t bg-gray-50">
                      <p className="text-gray-600 leading-relaxed pt-2 sm:pt-4 text-sm sm:text-base">{item.answer}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="mt-8 sm:mt-12 p-4 sm:p-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center w-full max-w-full">
          <h3 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-4">Остались вопросы?</h3>
          <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90">Свяжитесь с нами для персональной консультации</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <button
              className="bg-white text-purple-600 hover:bg-gray-100 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-base sm:text-lg"
              onClick={() => window.open("https://wa.me/79898024352", "_blank")}
            >
              WhatsApp консультация
            </button>
            <button
              className="bg-white text-purple-600 hover:bg-gray-100 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors text-base sm:text-lg"
              onClick={() => window.open("https://t.me/79898024352", "_blank")}
            >
              Telegram чат
            </button>
          </div>
        </Card>
      </div>
    </section>
  )
}
