// Скрипт для инициализации Firebase с начальными данными
import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc, collection, addDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Начальные данные для товаров
const initialProducts = [
  {
    name: "RF/LED многофункциональный аппарат для омоложения кожи IntelliDerm Solutions®",
    shortName: "RF/LED устройство IntelliDerm",
    description:
      "Многофункциональный аппарат для профессионального ухода за кожей в домашних условиях. 5 технологий в одном устройстве: RF лифтинг, LED терапия, ЭМС стимуляция, ионофорез и охлаждение.",
    image: "/images/device-info.png",
    images: ["/images/device-usage.png"],
    category: "Устройство",
    benefits: ["RF технология", "LED терапия", "ЭМС стимуляция", "Ионофорез", "Охлаждение"],
    price: "45,000 ₽",
    originalPrice: "55,000 ₽",
    discount: 18,
    isMainProduct: true,
    isActive: true,
    order: 0,
    stock: 50,
    sku: "RF-LED-001",
    seoTitle: "Купить RF/LED устройство IntelliDerm Solutions для омоложения",
    seoDescription:
      "Профессиональное RF/LED устройство для домашнего омоложения. 5 функций в одном аппарате. Гарантия результата.",
  },
  {
    name: "TimeWise® Moisture Renewing Softener",
    shortName: "Увлажняющий тоник",
    description: "Восстанавливает баланс кожи и подготавливает к дальнейшему уходу. Обогащен витаминами и минералами.",
    image: "/placeholder.svg?height=300&width=300",
    category: "Тоник",
    benefits: ["Увлажнение", "Подготовка кожи", "Восстановление баланса"],
    price: "2,500 ₽",
    isMainProduct: false,
    isActive: true,
    order: 1,
    stock: 100,
    sku: "TW-SOFT-001",
  },
  {
    name: "TimeWise Plus Advanced Replenishing Serum C",
    shortName: "Сыворотка с витамином C",
    description: "Антиоксидантная защита и сияние кожи с витамином C. Борется с признаками старения.",
    image: "/images/serum.png",
    category: "Сыворотка",
    benefits: ["Витамин C", "Антиоксиданты", "Сияние кожи"],
    price: "3,800 ₽",
    isMainProduct: false,
    isActive: true,
    order: 2,
    stock: 75,
    sku: "TW-SER-C-001",
  },
  {
    name: "LumiVie Moisturizing Lotion",
    shortName: "Увлажняющий лосьон",
    description: "Легкая текстура для ежедневного глубокого увлажнения. Подходит для всех типов кожи.",
    image: "/images/moisturizer.png",
    category: "Увлажнение",
    benefits: ["Ежедневный уход", "Легкая текстура", "Глубокое увлажнение"],
    price: "3,200 ₽",
    isMainProduct: false,
    isActive: true,
    order: 3,
    stock: 80,
    sku: "LV-MOIST-001",
  },
  {
    name: "TimeWise Plus Bio-Active Firming Cream",
    shortName: "Укрепляющий крем",
    description: "Повышает упругость и эластичность кожи. Содержит биоактивные компоненты.",
    image: "/images/firming-cream.png",
    category: "Крем",
    benefits: ["Укрепление", "Упругость", "Эластичность"],
    price: "4,500 ₽",
    isMainProduct: false,
    isActive: true,
    order: 4,
    stock: 60,
    sku: "TW-FIRM-001",
  },
  {
    name: "Dynamic Wrinkle Limiter IntelliDerm Solutions",
    shortName: "Коррекция морщин",
    description: "Мгновенный и долгосрочный эффект разглаживания морщин. Инновационная формула.",
    image: "/images/wrinkle-limiter.png",
    category: "Коррекция",
    benefits: ["Коррекция морщин", "Мгновенный эффект", "Долгосрочный результат"],
    price: "3,900 ₽",
    isMainProduct: false,
    isActive: true,
    order: 5,
    stock: 90,
    sku: "DWL-001",
  },
]

// Начальные данные для контента
const initialContent = [
  {
    section: "hero",
    title: "Омоложение в домашних условиях как в салоне",
    subtitle: "Эксклюзивное предложение",
    description:
      "RF/LED устройство IntelliDerm Solutions® + премиальная косметика Mary Kay. Полный комплекс для профессионального ухода за кожей.",
    buttonText: "Заказать набор",
    isActive: true,
    seoTitle: "Омоложение дома - RF/LED устройство + косметика Mary Kay",
    seoDescription:
      "Профессиональное омоложение в домашних условиях. RF/LED технологии + премиальная косметика Mary Kay.",
  },
  {
    section: "about-product",
    title: "RF/LED устройство IntelliDerm Solutions®",
    subtitle: "Главный продукт",
    description:
      "Многофункциональный аппарат для профессионального ухода за кожей в домашних условиях. 5 технологий в одном устройстве.",
    isActive: true,
  },
  {
    section: "products",
    title: "Премиальная косметика Mary Kay",
    subtitle: "Сопутствующие продукты",
    description: "Дополните эффект от RF/LED устройства профессиональной косметикой для максимального результата",
    isActive: true,
  },
  {
    section: "bundle",
    title: "Полный набор для омоложения",
    subtitle: "Специальное предложение",
    description: "RF/LED устройство + 6 продуктов Mary Kay + подарки по фиксированной цене",
    buttonText: "Заказать набор за 52,000 ₽",
    isActive: true,
  },
  {
    section: "reviews",
    title: "Что говорят наши клиенты",
    subtitle: "Отзывы клиентов",
    description: "Реальные отзывы от женщин, которые уже попробовали наш набор для омоложения",
    isActive: true,
  },
  {
    section: "faq",
    title: "Ответы на ваши вопросы",
    subtitle: "Частые вопросы",
    description: "Собрали самые популярные вопросы о RF/LED устройстве и косметике Mary Kay",
    isActive: true,
  },
  {
    section: "contact",
    title: "Готовы начать преображение?",
    subtitle: "Оформить заказ",
    description: "Свяжитесь с нами любым удобным способом для оформления заказа и получения консультации",
    isActive: true,
  },
]

// Начальные FAQ
const initialFAQs = [
  {
    question: "Как пользоваться RF/LED устройством?",
    answer:
      "Устройство очень простое в использовании. Включите прибор, выберите нужную функцию, нанесите проводящий гель и проводите процедуру согласно инструкции. Рекомендуется использовать 2-3 раза в неделю по 10-15 минут.",
    category: "Использование",
    order: 0,
    isActive: true,
    views: 0,
    helpful: 0,
  },
  {
    question: "Подходит ли устройство для чувствительной кожи?",
    answer:
      "Да, устройство имеет 5 режимов интенсивности, что позволяет подобрать комфортный уровень для любого типа кожи. Начинайте с минимального режима и постепенно увеличивайте интенсивность.",
    category: "Безопасность",
    order: 1,
    isActive: true,
    views: 0,
    helpful: 0,
  },
  {
    question: "Какая гарантия на устройство?",
    answer:
      "На RF/LED устройство предоставляется гарантия 12 месяцев. В случае поломки мы бесплатно отремонтируем или заменим прибор. Также предоставляется техническая поддержка.",
    category: "Гарантия",
    order: 2,
    isActive: true,
    views: 0,
    helpful: 0,
  },
  {
    question: "Как быстро будет доставка?",
    answer:
      "Доставка по Москве - 1-2 дня, по России - 3-7 дней. Доставка бесплатная при заказе полного набора. Отправляем транспортными компаниями СДЭК, Boxberry или Почтой России.",
    category: "Доставка",
    order: 3,
    isActive: true,
    views: 0,
    helpful: 0,
  },
]

// Начальные отзывы
const initialReviews = [
  {
    name: "Анна Петрова",
    age: 35,
    city: "Москва",
    rating: 5,
    text: "Невероятный результат! Уже через 2 недели использования RF/LED устройства кожа стала более упругой, морщинки разгладились. Косметика Mary Kay идеально дополняет процедуры.",
    image: "/placeholder.svg?height=80&width=80",
    beforeAfter: true,
    approved: true,
    featured: true,
    email: "anna@example.com",
    phone: "+7 (999) 123-45-67",
  },
  {
    name: "Елена Смирнова",
    age: 42,
    city: "Санкт-Петербург",
    rating: 5,
    text: "Покупала набор для мамы на день рождения. Она в восторге! Говорит, что кожа стала как в молодости. Устройство простое в использовании, а косметика очень качественная.",
    image: "/placeholder.svg?height=80&width=80",
    beforeAfter: false,
    approved: true,
    featured: false,
  },
  {
    name: "Мария Козлова",
    age: 28,
    city: "Екатеринбург",
    rating: 5,
    text: "Долго сомневалась, стоит ли покупать. Но результат превзошел все ожидания! Кожа сияет, поры сузились, овал лица подтянулся. Рекомендую всем!",
    image: "/placeholder.svg?height=80&width=80",
    beforeAfter: true,
    approved: true,
    featured: true,
  },
]

// Функция инициализации
async function initializeFirebase() {
  try {
    console.log("🚀 Начинаем инициализацию Firebase...")

    // Добавляем товары
    console.log("📦 Добавляем товары...")
    for (const product of initialProducts) {
      const docRef = await addDoc(collection(db, "products"), {
        ...product,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      console.log(`✅ Товар "${product.shortName}" добавлен с ID: ${docRef.id}`)
    }

    // Добавляем контент
    console.log("📝 Добавляем контент секций...")
    for (const content of initialContent) {
      await setDoc(doc(db, "siteContent", content.section), {
        ...content,
        id: content.section,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      console.log(`✅ Контент секции "${content.section}" добавлен`)
    }

    // Добавляем FAQ
    console.log("❓ Добавляем FAQ...")
    for (const faq of initialFAQs) {
      const docRef = await addDoc(collection(db, "faqs"), {
        ...faq,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      console.log(`✅ FAQ "${faq.question}" добавлен с ID: ${docRef.id}`)
    }

    // Добавляем отзывы
    console.log("💬 Добавляем отзывы...")
    for (const review of initialReviews) {
      const docRef = await addDoc(collection(db, "reviews"), {
        ...review,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      console.log(`✅ Отзыв от "${review.name}" добавлен с ID: ${docRef.id}`)
    }

    // Создаем начальную аналитику
    console.log("📊 Создаем начальную аналитику...")
    const today = new Date().toISOString().split("T")[0]
    await setDoc(doc(db, "analytics", today), {
      date: today,
      pageViews: 150,
      uniqueVisitors: 89,
      orders: 3,
      revenue: 156000,
      topPages: [
        { page: "/", views: 89 },
        { page: "/admin", views: 25 },
        { page: "/products", views: 36 },
      ],
      topProducts: [
        { productId: "main-device", views: 67 },
        { productId: "serum", views: 23 },
      ],
      conversionRate: 2.1,
      createdAt: new Date(),
    })
    console.log(`✅ Аналитика за ${today} создана`)

    console.log("🎉 Firebase успешно инициализирован!")
    console.log("📋 Что было создано:")
    console.log(`   • ${initialProducts.length} товаров`)
    console.log(`   • ${initialContent.length} секций контента`)
    console.log(`   • ${initialFAQs.length} FAQ`)
    console.log(`   • ${initialReviews.length} отзывов`)
    console.log("   • Начальная аналитика")
    console.log("")
    console.log("🔐 Для входа в админ панель:")
    console.log("   1. Создайте пользователя в Firebase Console")
    console.log("   2. Email: admin@yoursite.com")
    console.log("   3. Password: admin123456")
    console.log("   4. Перейдите на /admin")
  } catch (error) {
    console.error("❌ Ошибка инициализации:", error)
  }
}

// Запускаем инициализацию
initializeFirebase()
