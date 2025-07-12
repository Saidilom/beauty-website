// Скрипт для инициализации Firebase с начальными данными

import { initializeApp } from "firebase/app"
import { getFirestore, doc, setDoc } from "firebase/firestore"

const firebaseConfig = {
  // Ваши настройки Firebase
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

// Начальные данные для товаров
const initialProducts = [
  {
    id: "main-device",
    name: "RF/LED многофункциональный аппарат для омоложения кожи IntelliDerm Solutions®",
    shortName: "RF/LED устройство IntelliDerm",
    description:
      "Многофункциональный аппарат для профессионального ухода за кожей в домашних условиях. 5 технологий в одном устройстве.",
    image: "/images/device-info.png",
    category: "Устройство",
    benefits: ["RF технология", "LED терапия", "ЭМС стимуляция", "Ионофорез", "Охлаждение"],
    price: "45,000 ₽",
    isMainProduct: true,
    order: 0,
  },
  // Добавьте остальные товары...
]

// Начальные данные для контента
const initialContent = [
  {
    section: "hero",
    title: "Омоложение в домашних условиях как в салоне",
    subtitle: "RF/LED устройство IntelliDerm Solutions® + премиальная косметика Mary Kay",
    description: "Полный комплекс для профессионального ухода за кожей",
    buttonText: "Заказать набор",
  },
  // Добавьте остальные секции...
]

// Функция инициализации
async function initializeFirebase() {
  try {
    console.log("Инициализация Firebase...")

    // Добавляем товары
    for (const product of initialProducts) {
      await setDoc(doc(db, "products", product.id), product)
      console.log(`Товар ${product.shortName} добавлен`)
    }

    // Добавляем контент
    for (const content of initialContent) {
      await setDoc(doc(db, "siteContent", content.section), content)
      console.log(`Контент секции ${content.section} добавлен`)
    }

    console.log("Firebase успешно инициализирован!")
  } catch (error) {
    console.error("Ошибка инициализации:", error)
  }
}

// Запускаем инициализацию
initializeFirebase()
