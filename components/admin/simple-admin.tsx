"use client"

import { useState, useEffect } from "react"
import { onAuthStateChanged, signOut, type User } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AdminLogin } from "./admin-login"
import {
  LayoutDashboard,
  Package,
  MessageSquare,
  HelpCircle,
  FileText,
  LogOut,
  BarChart3,
  Save,
  Plus,
  Edit,
  Trash2,
  Star,
  ShoppingBag,
  ListOrdered,
  Home,
  Send,
} from "lucide-react"
import { updateSiteContent, uploadImage, getSiteContent, getFAQs, createFAQ, updateFAQ, deleteFAQ, type FAQ } from "@/lib/firebase-admin-service"
import { ProductsManager } from "./products-manager"

// Простая структура данных для демонстрации
// УДАЛЕНО: mockProducts, mockReviews

const initialFaqData = [
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

export function SimpleAdmin() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'content'>("content")
  const [activeSection, setActiveSection] = useState<'hero' | 'about-product' | 'products' | 'faq' | 'order'>("hero")
  // Состояния для текста и фото
  const [heroTitle, setHeroTitle] = useState("Омоложение в домашних условиях как в салоне")
  const [heroDescription, setHeroDescription] = useState("RF/LED устройство IntelliDerm Solutions® + премиальная косметика Mary Kay")
  const [aboutTitle, setAboutTitle] = useState("RF/LED устройство IntelliDerm Solutions®")
  const [aboutDescription, setAboutDescription] = useState("Многофункциональный аппарат для профессионального ухода за кожей в домашних условиях")
  const [heroImage, setHeroImage] = useState<string | null>(null)
  const [aboutImage, setAboutImage] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [heroBenefits, setHeroBenefits] = useState([
    "Профессиональный результат дома",
    "RF/LED технология нового поколения",
    "Безопасно и эффективно",
    "Видимый эффект за 2 недели",
  ])
  const [aboutFeatures, setAboutFeatures] = useState([
    "RF технология — Радиочастотный лифтинг для подтяжки кожи без операций",
    "LED терапия — Светодиодная терапия для стимуляции регенерации клеток",
    "ЭМС стимуляция — Электромиостимуляция для тонуса лицевых мышц",
    "Ионофорез — Глубокое проникновение активных компонентов",
    "Охлаждение — Успокаивающий эффект после процедур",
    "Очищение — Глубокая очистка пор от загрязнений",
  ])

  const [faqTitle, setFaqTitle] = useState("")
  const [faqDescription, setFaqDescription] = useState("")
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [faqLoading, setFaqLoading] = useState(true)
  const [faqMessage, setFaqMessage] = useState<string | null>(null)
  const [faqEdit, setFaqEdit] = useState<{question: string, answer: string, id?: string} | null>(null)

  const [orderTitle, setOrderTitle] = useState("")
  const [orderSubtitle, setOrderSubtitle] = useState("")
  const [orderDescription, setOrderDescription] = useState("")
  const [orderButtonText, setOrderButtonText] = useState("")
  const [orderContacts, setOrderContacts] = useState([
    { type: "phone", value: "+7 (989) 802-43-52", description: "" },
    { type: "whatsapp", value: "WhatsApp", description: "Быстрое оформление заказа" },
    { type: "telegram", value: "Telegram", description: "Удобное общение и консультации" },
  ])
  const [orderWorkTime, setOrderWorkTime] = useState("Работаем ежедневно\nс 9:00 до 21:00 (МСК)")
  const [orderBenefits, setOrderBenefits] = useState([
    { title: "Быстрый ответ", description: "Отвечаем в течение 5 минут" },
    { title: "Гарантия качества", description: "100% оригинальная продукция" },
    { title: "Бесплатная доставка", description: "По всей России при заказе набора" },
  ])
  const [orderPrice, setOrderPrice] = useState("52,000 ₽")
  const [orderOldPrice, setOrderOldPrice] = useState("67,100 ₽")
  const [orderEconomy, setOrderEconomy] = useState("Экономия 15,100 ₽")
  const [orderLoading, setOrderLoading] = useState(true)
  const [orderMessage, setOrderMessage] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (activeSection === "faq") {
      loadFaqContent()
      loadFaqs()
    }
    if (activeSection === "order") {
      loadOrderContent()
    }
  }, [activeSection])

  const handleLogout = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error("Ошибка выхода:", error)
    }
  }

  // Загрузка фото
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, setImage: (url: string) => void) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setImage(ev.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  // Удаление фото
  const handleImageDelete = (setImage: (url: string | null) => void) => {
    setImage(null)
  }

  // Сохранение главной секции
  const handleSaveHero = async () => {
    setSaving(true)
    try {
      let imageUrl = heroImage
      // Если heroImage — это base64, загружаем в storage
      if (heroImage && heroImage.startsWith("data:")) {
        const file = dataURLtoFile(heroImage, "hero-image.png")
        imageUrl = await uploadImage(file, `siteContent/hero-image-${Date.now()}.png`)
      }
      await updateSiteContent("hero", {
        section: "hero",
        title: heroTitle,
        description: heroDescription,
        image: imageUrl || "",
        benefits: heroBenefits,
      })
      setMessage("Сохранено!")
    } catch (e) {
      setMessage("Ошибка при сохранении")
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 2000)
    }
  }

  // Сохранение секции О продукте
  const handleSaveAbout = async () => {
    setSaving(true)
    try {
      let imageUrl = aboutImage
      if (aboutImage && aboutImage.startsWith("data:")) {
        const file = dataURLtoFile(aboutImage, "about-image.png")
        imageUrl = await uploadImage(file, `siteContent/about-image-${Date.now()}.png`)
      }
      await updateSiteContent("about-product", {
        section: "about-product",
        title: aboutTitle,
        description: aboutDescription,
        image: imageUrl || "",
        features: aboutFeatures,
      })
      setMessage("Сохранено!")
    } catch (e) {
      setMessage("Ошибка при сохранении")
    } finally {
      setSaving(false)
      setTimeout(() => setMessage(null), 2000)
    }
  }

  const loadFaqContent = async () => {
    setFaqLoading(true)
    try {
      const content = await getSiteContent()
      const faqSection = content.find(c => c.section === "faq")
      setFaqTitle(faqSection?.title || "Ответы на ваши вопросы")
      setFaqDescription(faqSection?.description || "Собрали самые популярные вопросы о RF/LED устройстве и косметике Mary Kay")
    } finally {
      setFaqLoading(false)
    }
  }

  const handleSaveFaqSection = async () => {
    setFaqLoading(true)
    try {
      await updateSiteContent("faq", {
        section: "faq",
        title: faqTitle,
        description: faqDescription,
      })
      setFaqMessage("Сохранено!")
    } catch {
      setFaqMessage("Ошибка при сохранении")
    } finally {
      setFaqLoading(false)
      setTimeout(() => setFaqMessage(null), 2000)
    }
  }

  const loadFaqs = async () => {
    setFaqLoading(true)
    try {
      const loadedFaqs = await getFAQs()
      if (loadedFaqs.length === 0) {
        // Если в базе нет FAQ, импортируем из initialFaqData
        for (let i = 0; i < initialFaqData.length; i++) {
          await createFAQ({
            question: initialFaqData[i].question,
            answer: initialFaqData[i].answer,
            order: i,
            isActive: true,
            category: "",
            views: 0,
            helpful: 0,
          })
        }
        setFaqs(await getFAQs())
      } else {
        setFaqs(loadedFaqs)
      }
    } finally {
      setFaqLoading(false)
    }
  }

  const handleFaqEdit = (faq?: FAQ) => {
    setFaqEdit(faq ? { question: faq.question, answer: faq.answer, id: faq.id } : { question: "", answer: "" })
  }

  const handleFaqSave = async () => {
    setFaqLoading(true)
    try {
      if (faqEdit?.id) {
        await updateFAQ(faqEdit.id, { question: faqEdit.question, answer: faqEdit.answer })
      } else {
        await createFAQ({ question: faqEdit?.question || "", answer: faqEdit?.answer || "", order: faqs.length, isActive: true })
      }
      setFaqEdit(null)
      await loadFaqs()
    } finally {
      setFaqLoading(false)
    }
  }

  const handleFaqDelete = async (id: string) => {
    if (!confirm("Удалить вопрос?")) return
    setFaqLoading(true)
    try {
      await deleteFAQ(id)
      await loadFaqs()
    } finally {
      setFaqLoading(false)
    }
  }

  const loadOrderContent = async () => {
    setOrderLoading(true)
    try {
      const content = await getSiteContent()
      const orderSection = content.find(c => c.section === "order")
      setOrderTitle(orderSection?.title || "Оформить заказ")
      setOrderSubtitle(orderSection?.subtitle || "Готовы начать преображение?")
      setOrderDescription(orderSection?.description || "Свяжитесь с нами любым удобным способом для оформления заказа и получения консультации")
      setOrderButtonText(orderSection?.buttonText || "Способы связи")
      setOrderContacts(orderSection?.contacts || [
        { type: "phone", value: "+7 (989) 802-43-52", description: "" },
        { type: "whatsapp", value: "WhatsApp", description: "Быстрое оформление заказа" },
        { type: "telegram", value: "Telegram", description: "Удобное общение и консультации" },
      ])
      setOrderWorkTime(orderSection?.workTime || "Работаем ежедневно\nс 9:00 до 21:00 (МСК)")
      setOrderBenefits(orderSection?.benefits || [
        { title: "Быстрый ответ", description: "Отвечаем в течение 5 минут" },
        { title: "Гарантия качества", description: "100% оригинальная продукция" },
        { title: "Бесплатная доставка", description: "По всей России при заказе набора" },
      ])
      setOrderPrice(orderSection?.price || "52,000 ₽")
      setOrderOldPrice(orderSection?.oldPrice || "67,100 ₽")
      setOrderEconomy(orderSection?.economy || "Экономия 15,100 ₽")
    } finally {
      setOrderLoading(false)
    }
  }

  const handleSaveOrderSection = async () => {
    setOrderLoading(true)
    try {
      await updateSiteContent("order", {
        section: "order",
        title: orderTitle,
        subtitle: orderSubtitle,
        description: orderDescription,
        buttonText: orderButtonText,
        contacts: orderContacts,
        workTime: orderWorkTime,
        benefits: orderBenefits,
        price: orderPrice,
        oldPrice: orderOldPrice,
        economy: orderEconomy,
      })
      setOrderMessage("Сохранено!")
    } catch {
      setOrderMessage("Ошибка при сохранении")
    } finally {
      setOrderLoading(false)
      setTimeout(() => setOrderMessage(null), 2000)
    }
  }

  // Вспомогательная функция для преобразования base64 в File
  function dataURLtoFile(dataurl: string, filename: string) {
    const arr = dataurl.split(",")
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png"
    const bstr = arr[1] ? atob(arr[1]) : ""
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
  }

  // Рендер формы для выбранной секции
  const renderSectionForm = () => {
    switch (activeSection) {
      case "hero":
        return (
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Главная секция</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="hero-title">Заголовок</Label>
                <Input
                  id="hero-title"
                  value={heroTitle}
                  onChange={e => setHeroTitle(e.target.value)}
                  placeholder="Основной заголовок"
                />
              </div>
              <div>
                <Label htmlFor="hero-description">Описание</Label>
                <Textarea
                  id="hero-description"
                  value={heroDescription}
                  onChange={e => setHeroDescription(e.target.value)}
                  placeholder="Описание секции"
                  rows={3}
                />
              </div>
              <div>
                <Label>Фото</Label>
                {heroImage ? (
                  <div className="mb-2">
                    <img src={heroImage} alt="Hero" className="max-h-40 rounded-lg" />
                    <Button variant="outline" size="sm" onClick={() => handleImageDelete(setHeroImage)} className="mt-2 text-red-600">Удалить фото</Button>
                  </div>
                ) : null}
                <Input type="file" accept="image/*" onChange={e => handleImageChange(e, setHeroImage)} />
              </div>
              <div>
                <Label>Преимущества</Label>
                <div className="space-y-2">
                  {heroBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <Input
                        value={benefit}
                        onChange={e => {
                          const updated = [...heroBenefits]
                          updated[idx] = e.target.value
                          setHeroBenefits(updated)
                        }}
                        placeholder={`Преимущество ${idx + 1}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setHeroBenefits(heroBenefits.filter((_, i) => i !== idx))}
                        disabled={heroBenefits.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setHeroBenefits([...heroBenefits, ""])}
                  >
                    <Plus className="h-4 w-4 mr-2" />Добавить преимущество
                  </Button>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600" onClick={handleSaveHero} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Сохраняю..." : "Сохранить"}
              </Button>
            </div>
          </Card>
        )
      case "about-product":
        return (
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Секция "О продукте"</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="about-title">Заголовок</Label>
                <Input
                  id="about-title"
                  value={aboutTitle}
                  onChange={e => setAboutTitle(e.target.value)}
                  placeholder="Заголовок секции"
                />
              </div>
              <div>
                <Label htmlFor="about-description">Описание</Label>
                <Textarea
                  id="about-description"
                  value={aboutDescription}
                  onChange={e => setAboutDescription(e.target.value)}
                  placeholder="Описание секции"
                  rows={3}
                />
              </div>
              <div>
                <Label>Фото</Label>
                {aboutImage ? (
                  <div className="mb-2">
                    <img src={aboutImage} alt="About" className="max-h-40 rounded-lg" />
                    <Button variant="outline" size="sm" onClick={() => handleImageDelete(setAboutImage)} className="mt-2 text-red-600">Удалить фото</Button>
                  </div>
                ) : null}
                <Input type="file" accept="image/*" onChange={e => handleImageChange(e, setAboutImage)} />
              </div>
              <div>
                <Label>5-6 функций устройства</Label>
                <div className="space-y-2">
                  {aboutFeatures.map((feature, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <Input
                        value={feature}
                        onChange={e => {
                          const updated = [...aboutFeatures]
                          updated[idx] = e.target.value
                          setAboutFeatures(updated)
                        }}
                        placeholder={`Функция ${idx + 1}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => setAboutFeatures(aboutFeatures.filter((_, i) => i !== idx))}
                        disabled={aboutFeatures.length === 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setAboutFeatures([...aboutFeatures, ""])}
                  >
                    <Plus className="h-4 w-4 mr-2" />Добавить функцию
                  </Button>
                </div>
              </div>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600" onClick={handleSaveAbout} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Сохраняю..." : "Сохранить"}
              </Button>
            </div>
    </Card>
  )
      case "products":
        return <ProductsManager />
      case "faq":
        return (
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Секция FAQ</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="faq-title">Заголовок секции</Label>
                <Input
                  id="faq-title"
                  value={faqTitle}
                  onChange={e => setFaqTitle(e.target.value)}
                  placeholder="Заголовок секции"
                  disabled={faqLoading}
                />
              </div>
              <div>
                <Label htmlFor="faq-description">Описание секции</Label>
                <Textarea
                  id="faq-description"
                  value={faqDescription}
                  onChange={e => setFaqDescription(e.target.value)}
                  placeholder="Описание секции"
                  rows={3}
                  disabled={faqLoading}
                />
              </div>
              <Button onClick={handleSaveFaqSection} disabled={faqLoading} className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Save className="h-4 w-4 mr-2" />
                {faqLoading ? "Сохраняю..." : "Сохранить"}
              </Button>
              {faqMessage && (
                <div className={`mt-2 p-2 rounded text-center ${faqMessage === "Сохранено!" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{faqMessage}</div>
              )}
              <hr className="my-6" />
              <h4 className="font-semibold mb-2">Вопросы и ответы</h4>
              {faqs.map((faq, idx) => (
                <Card key={faq.id} className="mb-2 p-4 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <div className="font-medium text-gray-800">{faq.question}</div>
                    <div className="text-gray-600 mt-1">{faq.answer}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleFaqEdit(faq)}><Edit className="h-4 w-4" /></Button>
                    <Button size="sm" variant="outline" className="text-red-600" onClick={() => handleFaqDelete(faq.id)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </Card>
              ))}
              <Button variant="outline" onClick={() => handleFaqEdit()} className="mt-2"><Plus className="h-4 w-4 mr-2" />Добавить вопрос</Button>
              {faqEdit && (
                <Card className="p-4 mt-4">
                  <div className="space-y-2">
                    <Label>Вопрос</Label>
                    <Input value={faqEdit.question} onChange={e => setFaqEdit({ ...faqEdit, question: e.target.value })} />
                    <Label>Ответ</Label>
                    <Textarea value={faqEdit.answer} onChange={e => setFaqEdit({ ...faqEdit, answer: e.target.value })} rows={3} />
                    <div className="flex gap-2 mt-2">
                      <Button onClick={handleFaqSave} className="bg-gradient-to-r from-blue-600 to-purple-600">Сохранить</Button>
                      <Button variant="outline" onClick={() => setFaqEdit(null)}>Отмена</Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </Card>
        )
      case "order":
        return (
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Секция "Заказать"</h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="order-title">Заголовок секции</Label>
                <Input
                  id="order-title"
                  value={orderTitle}
                  onChange={e => setOrderTitle(e.target.value)}
                  placeholder="Заголовок секции"
                  disabled={orderLoading}
                />
              </div>
              <div>
                <Label htmlFor="order-subtitle">Подзаголовок</Label>
                <Input
                  id="order-subtitle"
                  value={orderSubtitle}
                  onChange={e => setOrderSubtitle(e.target.value)}
                  placeholder="Подзаголовок секции"
                  disabled={orderLoading}
                />
              </div>
              <div>
                <Label htmlFor="order-description">Описание секции</Label>
                <Textarea
                  id="order-description"
                  value={orderDescription}
                  onChange={e => setOrderDescription(e.target.value)}
                  placeholder="Описание секции"
                  rows={3}
                  disabled={orderLoading}
                />
              </div>
              <div>
                <Label htmlFor="order-button">Текст кнопки</Label>
                <Input
                  id="order-button"
                  value={orderButtonText}
                  onChange={e => setOrderButtonText(e.target.value)}
                  placeholder="Текст кнопки заказа"
                  disabled={orderLoading}
                />
              </div>
              <div>
                <Label>Способы связи</Label>
                <div className="space-y-2">
                  {orderContacts.map((contact, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <Input
                        value={contact.value}
                        onChange={e => {
                          const updated = [...orderContacts]
                          updated[idx].value = e.target.value
                          setOrderContacts(updated)
                        }}
                        placeholder="Контакт (например, WhatsApp, телефон)"
                        className="w-1/3"
                        disabled={orderLoading}
                      />
                      <Input
                        value={contact.description}
                        onChange={e => {
                          const updated = [...orderContacts]
                          updated[idx].description = e.target.value
                          setOrderContacts(updated)
                        }}
                        placeholder="Описание (например, Быстрое оформление заказа)"
                        className="w-1/2"
                        disabled={orderLoading}
                      />
                      <Button type="button" variant="outline" size="icon" onClick={() => setOrderContacts(orderContacts.filter((_, i) => i !== idx))} disabled={orderContacts.length === 1}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={() => setOrderContacts([...orderContacts, { type: "", value: "", description: "" }])}><Plus className="h-4 w-4 mr-2" />Добавить способ</Button>
                </div>
              </div>
              <div>
                <Label htmlFor="order-worktime">Время работы</Label>
                <Textarea
                  id="order-worktime"
                  value={orderWorkTime}
                  onChange={e => setOrderWorkTime(e.target.value)}
                  placeholder="Время работы"
                  rows={2}
                  disabled={orderLoading}
                />
              </div>
              <div>
                <Label>Почему выбирают нас</Label>
                <div className="space-y-2">
                  {orderBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <Input
                        value={benefit.title}
                        onChange={e => {
                          const updated = [...orderBenefits]
                          updated[idx].title = e.target.value
                          setOrderBenefits(updated)
                        }}
                        placeholder="Заголовок преимущества"
                        className="w-1/3"
                        disabled={orderLoading}
                      />
                      <Input
                        value={benefit.description}
                        onChange={e => {
                          const updated = [...orderBenefits]
                          updated[idx].description = e.target.value
                          setOrderBenefits(updated)
                        }}
                        placeholder="Описание преимущества"
                        className="w-1/2"
                        disabled={orderLoading}
                      />
                      <Button type="button" variant="outline" size="icon" onClick={() => setOrderBenefits(orderBenefits.filter((_, i) => i !== idx))} disabled={orderBenefits.length === 1}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={() => setOrderBenefits([...orderBenefits, { title: "", description: "" }])}><Plus className="h-4 w-4 mr-2" />Добавить преимущество</Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="order-price">Цена</Label>
                  <Input
                    id="order-price"
                    value={orderPrice}
                    onChange={e => setOrderPrice(e.target.value)}
                    placeholder="Текущая цена"
                    disabled={orderLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="order-oldprice">Старая цена</Label>
                  <Input
                    id="order-oldprice"
                    value={orderOldPrice}
                    onChange={e => setOrderOldPrice(e.target.value)}
                    placeholder="Старая цена"
                    disabled={orderLoading}
                  />
                </div>
                <div>
                  <Label htmlFor="order-economy">Экономия</Label>
                  <Input
                    id="order-economy"
                    value={orderEconomy}
                    onChange={e => setOrderEconomy(e.target.value)}
                    placeholder="Экономия"
                    disabled={orderLoading}
                  />
                </div>
              </div>
              <Button onClick={handleSaveOrderSection} disabled={orderLoading} className="bg-gradient-to-r from-green-600 to-blue-600">
                <Save className="h-4 w-4 mr-2" />
                {orderLoading ? "Сохраняю..." : "Сохранить"}
              </Button>
              {orderMessage && (
                <div className={`mt-2 p-2 rounded text-center ${orderMessage === "Сохранено!" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{orderMessage}</div>
              )}
            </div>
          </Card>
        )
      default:
        return null
    }
  }

  const sections = [
    { id: "hero", name: "Главная", icon: Home },
    { id: "about-product", name: "О товаре", icon: FileText },
    { id: "products", name: "Продукты", icon: ListOrdered },
    { id: "faq", name: "FAQ", icon: HelpCircle },
    { id: "order", name: "Заказать", icon: Send },
  ]

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!user) {
    return <AdminLogin />
  }

  // Только одна вкладка "Контент"
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center h-auto sm:h-16 gap-2 sm:gap-0 py-2 sm:py-0">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Админ панель Beauty Store
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Badge className="bg-green-100 text-green-800">Онлайн</Badge>
              <span className="text-xs sm:text-sm text-gray-600">{user?.email}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2 bg-transparent"
              >
                <LogOut className="h-4 w-4" />
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="max-w-5xl mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8 flex flex-col sm:flex-row gap-4 sm:gap-8 w-full">
          {/* Sidebar */}
        <div className="w-full sm:w-64 flex-shrink-0 mb-4 sm:mb-0">
          <Card className="p-2 sm:p-4 w-full">
            <nav className="space-y-1 sm:space-y-2">
              {sections.map((section) => (
                  <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id as any)}
                  className={`w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-4 py-2 sm:py-3 rounded-xl text-left transition-all duration-200 text-xs sm:text-base ${
                    activeSection === section.id
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg transform scale-105"
                      : "text-gray-700 hover:bg-gray-100 hover:scale-102"
                  }`}
                >
                  <section.icon className={`h-5 w-5 ${activeSection === section.id ? "text-white" : "text-purple-500"}`} />
                  <span className="font-medium">{section.name}</span>
                  </button>
                ))}
              </nav>
            </Card>
          </div>
          {/* Main Content */}
        <div className="flex-1 w-full">
          {message && (
            <div className={`mb-2 sm:mb-4 p-2 rounded text-center text-xs sm:text-base ${message === "Сохранено!" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>{message}</div>
          )}
          <div className="overflow-x-auto w-full">
            {renderSectionForm()}
          </div>
        </div>
      </div>
    </div>
  )
}
