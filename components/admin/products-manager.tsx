"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Edit, Trash2, Save, X, Package, Star, ImageIcon } from "lucide-react"
import Image from "next/image"
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  type Product,
  getSiteContent,
  updateSiteContent,
} from "@/lib/firebase-admin"

export function ProductsManager() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  // Состояния для заголовка и описания секции
  const [sectionTitle, setSectionTitle] = useState("")
  const [sectionDescription, setSectionDescription] = useState("")
  const [sectionLoading, setSectionLoading] = useState(true)
  const [sectionMessage, setSectionMessage] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    shortName: "",
    description: "",
    image: "",
    category: "",
    benefits: [""],
    price: "",
    isMainProduct: false,
    order: 0,
  })

  useEffect(() => {
    loadProducts()
    loadSectionContent()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await getProducts()
      setProducts(data)
    } catch (error) {
      showMessage("error", "Ошибка загрузки товаров")
    } finally {
      setLoading(false)
    }
  }

  const loadSectionContent = async () => {
    setSectionLoading(true)
    try {
      const content = await getSiteContent()
      const productsSection = content.find(c => c.section === "products")
      setSectionTitle(productsSection?.title || "")
      setSectionDescription(productsSection?.description || "")
    } catch (e) {
      //
    } finally {
      setSectionLoading(false)
    }
  }

  const handleSaveSection = async () => {
    setSectionLoading(true)
    try {
      await updateSiteContent("products", {
        section: "products",
        title: sectionTitle,
        description: sectionDescription,
      })
      setSectionMessage("Сохранено!")
    } catch (e) {
      setSectionMessage("Ошибка при сохранении")
    } finally {
      setSectionLoading(false)
      setTimeout(() => setSectionMessage(null), 2000)
    }
  }

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text })
    setTimeout(() => setMessage(null), 3000)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      shortName: "",
      description: "",
      image: "",
      category: "",
      benefits: [""],
      price: "",
      isMainProduct: false,
      order: 0,
    })
    setEditingProduct(null)
  }

  const openEditDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        shortName: product.shortName,
        description: product.description,
        image: product.image,
        category: product.category,
        benefits: product.benefits,
        price: product.price,
        isMainProduct: product.isMainProduct || false,
        order: product.order || 0,
      })
    } else {
      resetForm()
    }
    setIsDialogOpen(true)
  }

  const handleImageUpload = async (file: File) => {
    setUploading(true)
    try {
      const imagePath = `products/${Date.now()}_${file.name}`
      const imageUrl = await uploadImage(file, imagePath)
      setFormData((prev) => ({ ...prev, image: imageUrl }))
      showMessage("success", "Изображение загружено")
    } catch (error) {
      showMessage("error", "Ошибка загрузки изображения")
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    try {
      const productData = {
        ...formData,
        benefits: formData.benefits.filter((b) => b.trim() !== ""),
      }

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData)
        showMessage("success", "Товар обновлен")
      } else {
        await createProduct(productData)
        showMessage("success", "Товар создан")
      }

      setIsDialogOpen(false)
      resetForm()
      loadProducts()
    } catch (error) {
      showMessage("error", "Ошибка сохранения товара")
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm("Удалить товар?")) {
      try {
        await deleteProduct(id)
        showMessage("success", "Товар удален")
        loadProducts()
      } catch (error) {
        showMessage("error", "Ошибка удаления товара")
      }
    }
  }

  const addBenefit = () => {
    setFormData((prev) => ({
      ...prev,
      benefits: [...prev.benefits, ""],
    }))
  }

  const updateBenefit = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.map((benefit, i) => (i === index ? value : benefit)),
    }))
  }

  const removeBenefit = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }))
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Загрузка товаров...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Блок редактирования заголовка и описания секции */}
      <Card>
        <CardHeader>
          <CardTitle>Секция "Продукты" — заголовок и описание</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="section-title">Заголовок секции</Label>
            <Input
              id="section-title"
              value={sectionTitle}
              onChange={e => setSectionTitle(e.target.value)}
              placeholder="Заголовок секции"
              disabled={sectionLoading}
            />
          </div>
          <div>
            <Label htmlFor="section-description">Описание секции</Label>
            <Textarea
              id="section-description"
              value={sectionDescription}
              onChange={e => setSectionDescription(e.target.value)}
              placeholder="Описание секции"
              rows={3}
              disabled={sectionLoading}
            />
          </div>
          <Button onClick={handleSaveSection} disabled={sectionLoading} className="bg-gradient-to-r from-purple-600 to-pink-600">
            <Save className="h-4 w-4 mr-2" />
            {sectionLoading ? "Сохраняю..." : "Сохранить"}
          </Button>
          {sectionMessage && (
            <div className={`mt-2 p-2 rounded text-center ${sectionMessage === "Сохранено!" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{sectionMessage}</div>
          )}
        </CardContent>
      </Card>
      {message && (
        <Alert className={message.type === "success" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
          <AlertDescription className={message.type === "success" ? "text-green-600" : "text-red-600"}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Управление товарами ({products.length})
            </CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => openEditDialog()} className="bg-gradient-to-r from-purple-600 to-pink-600">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить товар
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{editingProduct ? "Редактировать товар" : "Добавить товар"}</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Полное название</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="TimeWise® Moisture Renewing Softener"
                      />
                    </div>
                    <div>
                      <Label htmlFor="shortName">Короткое название</Label>
                      <Input
                        id="shortName"
                        value={formData.shortName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, shortName: e.target.value }))}
                        placeholder="Увлажняющий тоник"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Описание</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Подробное описание товара..."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Категория</Label>
                      <Input
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                        placeholder="Тоник, Сыворотка, Крем..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Цена</Label>
                      <Input
                        id="price"
                        value={formData.price}
                        onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                        placeholder="2,500 ₽"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Изображение</Label>
                    <div className="space-y-2">
                      {formData.image && (
                        <div className="relative w-32 h-32 border rounded-lg overflow-hidden">
                          <Image
                            src={formData.image || "/placeholder.svg"}
                            alt="Предварительный просмотр"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleImageUpload(file)
                          }}
                          disabled={uploading}
                        />
                        {uploading && (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Преимущества</Label>
                    <div className="space-y-2">
                      {formData.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input
                            value={benefit}
                            onChange={(e) => updateBenefit(index, e.target.value)}
                            placeholder="Преимущество товара"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => removeBenefit(index)}
                            disabled={formData.benefits.length === 1}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={addBenefit}>
                        <Plus className="h-4 w-4 mr-2" />
                        Добавить преимущество
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="isMainProduct"
                        checked={formData.isMainProduct}
                        onChange={(e) => setFormData((prev) => ({ ...prev, isMainProduct: e.target.checked }))}
                      />
                      <Label htmlFor="isMainProduct">Основной товар</Label>
                    </div>
                    <div>
                      <Label htmlFor="order">Порядок</Label>
                      <Input
                        id="order"
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData((prev) => ({ ...prev, order: Number(e.target.value) }))}
                        className="w-20"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                      Отмена
                    </Button>
                    <Button onClick={handleSave} className="bg-gradient-to-r from-purple-600 to-pink-600">
                      <Save className="h-4 w-4 mr-2" />
                      Сохранить
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {products.map((product) => (
              <Card key={product.id} className="p-3 sm:p-4 w-full">
                <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 w-full">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {product.image ? (
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full">
                      <div className="w-full">
                        <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                          <h3 className="font-semibold text-sm sm:text-base">{product.shortName}</h3>
                          {product.isMainProduct && (
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs sm:text-sm">
                              <Star className="h-3 w-3 mr-1" />
                              Основной
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs sm:text-sm">{product.category}</Badge>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2 break-words max-w-full overflow-x-auto">{product.description}</p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm">
                          <span className="font-medium text-purple-600">{product.price}</span>
                          <span className="text-gray-500">Порядок: {product.order}</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-1 sm:mt-2 overflow-x-auto">
                          {product.benefits.map((benefit, index) => (
                            <Badge key={index} variant="secondary" className="text-[10px] sm:text-xs">
                              {benefit}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-1 sm:gap-2 mt-2 sm:mt-0">
                        <Button variant="outline" size="sm" onClick={() => openEditDialog(product)} className="px-2 py-1">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-700 px-2 py-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}

            {products.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Товаров пока нет</p>
                <p className="text-sm">Добавьте первый товар, чтобы начать</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
