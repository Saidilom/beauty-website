"use client"

import { FC } from "react";
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Droplets, Zap, Activity, Thermometer } from "lucide-react"
import { Product } from "@/lib/firebase-admin";

interface DeviceFunction {
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface AdditionalProductsProps {
  section: { title?: string; description?: string; deviceFunctions?: DeviceFunction[] };
  products: Product[];
}

const defaultProducts = [
  {
    id: "1",
    image: "/images/moisturizer.png",
    category: "Увлажнение",
    price: "3,200 ₽",
    shortName: "Увлажняющий лосьон",
    description: "Легкая текстура для ежедневного глубокого увлажнения",
    benefits: ["Ежедневный уход", "Легкая текстура", "Глубокое увлажнение"],
    order: 1,
  },
  {
    id: "2",
    image: "/images/firming-cream.png",
    category: "Крем",
    price: "4,500 ₽",
    shortName: "Укрепляющий крем",
    description: "Повышает упругость и эластичность кожи",
    benefits: ["Укрепление", "Упругость", "Эластичность"],
    order: 2,
  },
  {
    id: "3",
    image: "/images/wrinkle-limiter.png",
    category: "Коррекция",
    price: "3,900 ₽",
    shortName: "Коррекция морщин",
    description: "Мгновенный и долгосрочный эффект разглаживания морщин",
    benefits: ["Коррекция морщин", "Мгновенный эффект", "Долгосрочный результат"],
    order: 3,
  },
  {
    id: "4",
    image: "/images/serum.png",
    category: "Сыворотка",
    price: "4,200 ₽",
    shortName: "Сыворотка для сияния кожи",
    description: "Антиоксидантная защита и сияние кожи с витаминами и пептидами",
    benefits: ["Сияние кожи", "Антиоксиданты", "Питание"],
    order: 4,
  },
  {
    id: "5",
    image: "/images/timewise-moisture-renewing-softener-100730.png",
    category: "Тоник",
    price: "2,500 ₽",
    shortName: "Увлажняющий тоник",
    description: "Восстанавливает баланс кожи и подготавливает к дальнейшему уходу",
    benefits: ["Увлажнение", "Подготовка кожи", "Восстановление баланса"],
    order: 5,
  },
  {
    id: "6",
    image: "/images/INTELLIDERM-AMPOULE-WRINKLE-DEFENSE (2).png",
    category: "Ампула",
    price: "4,800 ₽",
    shortName: "Сыворотка-концентрат для сокращения морщин",
    description: "Интенсивное воздействие на признаки старения с матричными пептидами",
    benefits: ["Против морщин", "Матричные пептиды", "Интенсивный уход"],
    order: 6,
  },
];

export const AdditionalProducts: FC<AdditionalProductsProps> = ({ section, products }) => {
  const displayProducts = (products && products.length > 0)
    ? [...products].sort((a, b) => (a.order || 0) - (b.order || 0))
    : defaultProducts;

  // Дефолтные функции устройства
  const defaultDeviceFunctions = [
    {
      title: "Очищение",
      description: "Гальванический ток удаляет загрязнения с мицеллярной водой/тоником Mary Kay®",
      icon: "Droplets",
      color: "blue"
    },
    {
      title: "Ионофорез",
      description: "Усиливает проникновение сывороток/крема Mary Kay® гальваническим током",
      icon: "Zap",
      color: "purple"
    },
    {
      title: "ЭМС",
      description: "Электромиостимуляция укрепляет мышцы, подтягивает кожу и разглаживает морщины (с сывороткой/кремом Mary Kay®)",
      icon: "Activity",
      color: "green"
    },
    {
      title: "RF/LED",
      description: "Радиочастотный лифтинг и LED-терапия (красный свет) стимулируют коллаген, подтягивают кожу и улучшают тургор (с сывороткой/кремом Mary Kay®)",
      icon: "Zap",
      color: "pink"
    },
    {
      title: "Охлаждение",
      description: "Охлаждение и синий свет успокаивают кожу и сужают поры (с/без крема Mary Kay®)",
      icon: "Thermometer",
      color: "cyan"
    }
  ];

  const deviceFunctions = section?.deviceFunctions || defaultDeviceFunctions;

  if (!section && displayProducts.length === 0) return null;

  return (
    <section id="products" className="animate-fade-in py-10 sm:py-20 px-2 sm:px-4 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10 sm:mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 sm:px-6 py-2 text-base sm:text-lg">
            Сопутствующие продукты
          </Badge>
          {section?.title && (
            <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              {section.title}
            </h2>
          )}
          {section?.description && (
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              {section.description}
            </p>
          )}
        </div>

        {/* Функции устройства */}
        <div className="mb-10 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-gray-800 text-center">Функции устройства</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {deviceFunctions.map((func, index) => {
              const Icon = func.icon === "Droplets" ? Droplets : 
                          func.icon === "Zap" ? Zap : 
                          func.icon === "Activity" ? Activity : 
                          func.icon === "Thermometer" ? Thermometer : Zap;
              
              return (
                <div key={index} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
                  <div className="p-6">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                        <Icon className="h-8 w-8 text-gray-700" />
                      </div>
                      <h4 className="font-bold text-gray-900 text-lg mb-3">{func.title}</h4>
                      <p className="text-gray-600 text-sm leading-6">{func.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
          {displayProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden bg-white">
              <CardHeader className="pb-2 sm:pb-4">
                <div className="relative h-[40vw] min-h-[140px] max-h-[220px] sm:h-64 mb-2 sm:mb-4 bg-white rounded-lg overflow-hidden shadow-inner">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.shortName || "Продукт"}
                    fill
                    className="object-contain p-2 sm:p-4 group-hover:scale-105 sm:group-hover:scale-110 transition-transform duration-500"
                    quality={100}
                  />
                </div>
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs sm:text-base">
                    {product.category}
                  </Badge>
                  <span className="text-base sm:text-lg font-bold text-purple-600">{product.price}</span>
                </div>
                <CardTitle className="text-base sm:text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                  {product.shortName}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2 sm:mb-4 leading-relaxed text-sm sm:text-base">{product.description}</p>
                <div className="space-y-1 sm:space-y-2">
                  <h4 className="font-semibold text-gray-800 text-xs sm:text-sm">Преимущества:</h4>
                  <div className="flex flex-wrap gap-1">
                    {(product.benefits || []).map((benefit, idx) => (
                      <Badge key={idx} variant="outline" className="text-[10px] sm:text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
