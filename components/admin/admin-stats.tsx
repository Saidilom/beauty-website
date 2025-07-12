"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, MessageSquare, HelpCircle, TrendingUp, Star, Eye } from "lucide-react"
import { getProducts, getReviews, getFAQs } from "@/lib/firebase-admin"
import type { Product, Review, FAQ } from "@/lib/firebase-admin"

export function AdminStats() {
  const [products, setProducts] = useState<Product[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [faqs, setFAQs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, reviewsData, faqsData] = await Promise.all([getProducts(), getReviews(), getFAQs()])

        setProducts(productsData)
        setReviews(reviewsData)
        setFAQs(faqsData)
      } catch (error) {
        console.error("Ошибка загрузки данных:", error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const approvedReviews = reviews.filter((review) => review.approved)
  const averageRating =
    approvedReviews.length > 0
      ? approvedReviews.reduce((sum, review) => sum + review.rating, 0) / approvedReviews.length
      : 0

  const stats = [
    {
      title: "Всего товаров",
      value: products.length,
      icon: Package,
      color: "bg-blue-500",
      description: `${products.filter((p) => p.isMainProduct).length} основных, ${products.filter((p) => !p.isMainProduct).length} дополнительных`,
    },
    {
      title: "Отзывы",
      value: approvedReviews.length,
      icon: MessageSquare,
      color: "bg-green-500",
      description: `${reviews.length - approvedReviews.length} на модерации`,
    },
    {
      title: "FAQ вопросов",
      value: faqs.length,
      icon: HelpCircle,
      color: "bg-purple-500",
      description: "Активных вопросов",
    },
    {
      title: "Средний рейтинг",
      value: averageRating.toFixed(1),
      icon: Star,
      color: "bg-yellow-500",
      description: `Из ${approvedReviews.length} отзывов`,
    },
  ]

  const recentReviews = reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5)

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Последние отзывы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReviews.length > 0 ? (
                recentReviews.map((review) => (
                  <div key={review.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{review.name}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <Badge
                          className={review.approved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                        >
                          {review.approved ? "Одобрен" : "На модерации"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{review.text}</p>
                      <p className="text-xs text-gray-400 mt-1">{review.createdAt.toLocaleDateString("ru-RU")}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">Отзывов пока нет</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Быстрые действия
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Управление товарами</h4>
                <p className="text-sm text-gray-600 mb-3">Добавить новый товар или изменить существующие</p>
                <button className="text-sm bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700">
                  Перейти к товарам
                </button>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Модерация отзывов</h4>
                <p className="text-sm text-gray-600 mb-3">
                  {reviews.filter((r) => !r.approved).length} отзывов ожидают модерации
                </p>
                <button className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                  Модерировать
                </button>
              </div>

              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Обновить контент</h4>
                <p className="text-sm text-gray-600 mb-3">Изменить тексты секций сайта</p>
                <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                  Редактировать
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Статус системы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Firebase подключен</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Хранилище доступно</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">Сайт работает</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
