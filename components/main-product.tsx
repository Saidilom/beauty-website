import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Shield, Clock, Star } from "lucide-react"

export function MainProduct() {
  const features = [
    { icon: Zap, title: "RF/LED технология", description: "Безоперационный лифтинг кожи" },
    { icon: Shield, title: "5 функций в 1", description: "Очищение, ионофорез, ЭМС, RF/LED, охлаждение" },
    { icon: Clock, title: "Быстрый результат", description: "Видимый эффект уже после первого применения" },
    { icon: Star, title: "Профессиональное качество", description: "Альтернатива визиту к косметологу" },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-lg">
            Главный продукт
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            RF/LED Аппарат для омоложения
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Многофункциональный аппарат IntelliDerm Solutions® - ваша персональная косметологическая студия дома
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Card className="overflow-hidden shadow-2xl bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-8">
              <div className="relative h-[500px] mb-6">
                <Image
                  src="/images/device-info.png"
                  alt="RF/LED аппарат для омоложения"
                  fill
                  className="object-contain"
                  quality={100}
                />
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold mb-2">IntelliDerm Solutions®</h3>
                <p className="text-gray-600">Профессиональный аппарат для домашнего использования</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold mb-6 text-gray-800">Преимущества аппарата</h3>
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

            <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <h4 className="text-2xl font-bold mb-4">Результат как в салоне</h4>
              <ul className="space-y-2 text-lg">
                <li>• Разглаженные морщины</li>
                <li>• Упругая и эластичная кожа</li>
                <li>• Четкий овал лица</li>
                <li>• Здоровое сияние кожи</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
