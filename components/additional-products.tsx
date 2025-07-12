"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Check } from "lucide-react"
import { useEffect } from "react"
import { getProducts, type Product } from "@/lib/firebase-admin"
import { getSiteContent } from "@/lib/firebase-admin-service"

export function AdditionalProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [sectionTitle, setSectionTitle] = useState<string>("")
  const [sectionDescription, setSectionDescription] = useState<string>("")

  useEffect(() => {
    getProducts().then(setProducts)
    getSiteContent().then((data) => {
      const section = data.find((item: any) => item.section === "products")
      setSectionTitle(section?.title || "Премиальная косметика Mary Kay")
      setSectionDescription(section?.description || "Дополните эффект от RF/LED устройства профессиональной косметикой для максимального результата")
    })
  }, [])

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    )
  }

  return (
    <section id="products" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 text-lg">
            Сопутствующие продукты
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            {sectionTitle}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {sectionDescription}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product) => {
            const isSelected = selectedProducts.includes(product.id)

            return (
              <Card
                key={product.id}
                className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden ${
                  isSelected ? "ring-2 ring-purple-500 bg-purple-50" : "bg-white"
                }`}
                onClick={() => toggleProduct(product.id)}
              >
                <CardHeader className="pb-4">
                  <div className="relative h-64 mb-4 bg-white rounded-lg overflow-hidden shadow-inner">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      quality={100}
                    />

                    {/* Selection Indicator */}
                    <div
                      className={`absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isSelected ? "bg-purple-500 text-white" : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      {isSelected ? <Check className="h-5 w-5" /> : <Plus className="h-5 w-5" />}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      {product.category}
                    </Badge>
                    <span className="text-lg font-bold text-purple-600">{product.price}</span>
                  </div>

                  <CardTitle className="text-lg font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                    {product.shortName}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 text-sm">Преимущества:</h4>
                    <div className="flex flex-wrap gap-1">
                      {product.benefits.map((benefit, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Selected Products Summary */}
        {selectedProducts.length > 0 && (
          <Card className="p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Выбрано продуктов: {selectedProducts.length}</h3>
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {selectedProducts.map((id) => {
                  const product = products.find((p) => p.id === id)
                  return (
                    <Badge key={id} className="bg-white text-purple-600">
                      {product?.shortName}
                    </Badge>
                  )
                })}
              </div>
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => window.open("https://wa.me/79898024352", "_blank")}
              >
                Добавить в набор
              </Button>
            </div>
          </Card>
        )}
      </div>
    </section>
  )
}
