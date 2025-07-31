import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  where,
  limit,
  Timestamp,
  writeBatch,
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { db, storage, auth } from "./firebase-config"

// ==================== TYPES ====================
export interface Product {
  id: string
  name: string
  shortName: string
  description: string
  image: string
  images?: string[]
  category: string
  benefits: string[]
  price: string
  originalPrice?: string
  discount?: number
  isMainProduct?: boolean
  isActive: boolean
  order: number
  stock?: number
  sku?: string
  seoTitle?: string
  seoDescription?: string
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  id: string
  name: string
  age: number
  city: string
  rating: number
  text: string
  image: string
  beforeAfterImages?: string[]
  beforeAfter: boolean
  approved: boolean
  featured: boolean
  productId?: string
  email?: string
  phone?: string
  createdAt: Date
  updatedAt: Date
}

export interface FAQ {
  id: string
  question: string
  answer: string
  category: string
  order: number
  isActive: boolean
  views: number
  helpful: number
  createdAt: Date
  updatedAt: Date
}

export interface SiteContent {
  id: string
  section: string
  title: string
  subtitle: string
  description: string
  buttonText?: string
  secondaryButtonText?: string // добавлено
  badge?: string // добавлено
  image?: string
  isActive: boolean
  seoTitle?: string
  seoDescription?: string
  benefits?: string[] | { title: string; description: string }[]
  features?: { icon: string; title: string; description: string }[] // уточнено для about-product
  resultsTitle?: string // добавлено
  resultsDescription?: string // добавлено
  results?: string[] // добавлено
  contacts?: { type: string; value: string; description: string }[]
  workTime?: string
  price?: string
  oldPrice?: string
  economy?: string
  includedTitle?: string // добавлено для блока 'Что входит в стоимость'
  includedList?: string[] // добавлено для блока 'Что входит в стоимость'
  createdAt: Date
  updatedAt: Date
}

export interface AdminUser {
  id: string
  email: string
  displayName: string
  role: "admin" | "moderator" | "editor"
  permissions: string[]
  isActive: boolean
  lastLogin: Date
  createdAt: Date
}

export interface Analytics {
  id: string
  date: string
  pageViews: number
  uniqueVisitors: number
  orders: number
  revenue: number
  topPages: { page: string; views: number }[]
  topProducts: { productId: string; views: number }[]
  conversionRate: number
  createdAt: Date
}

export interface Order {
  id: string
  customerName: string
  customerEmail: string
  customerPhone: string
  products: { productId: string; quantity: number; price: string }[]
  totalAmount: number
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "pending" | "paid" | "failed"
  shippingAddress: string
  notes?: string
  createdAt: Date
  updatedAt: Date
}

// ==================== PRODUCTS ====================
export const getProducts = async (activeOnly = false): Promise<Product[]> => {
  try {
    let q = query(collection(db, "products"), orderBy("order"))
    if (activeOnly) {
      q = query(collection(db, "products"), where("isActive", "==", true), orderBy("order"))
    }

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        }) as Product,
    )
  } catch (error) {
    console.error("Error getting products:", error)
    throw error
  }
}

export const getProduct = async (id: string): Promise<Product | null> => {
  try {
    const docRef = doc(db, "products", id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate() || new Date(),
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as Product
    }
    return null
  } catch (error) {
    console.error("Error getting product:", error)
    throw error
  }
}

export const createProduct = async (product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  try {
    const now = new Date()
    const docRef = await addDoc(collection(db, "products"), {
      ...product,
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now),
    })
    return docRef.id
  } catch (error) {
    console.error("Error creating product:", error)
    throw error
  }
}

export const updateProduct = async (id: string, product: Partial<Product>): Promise<void> => {
  try {
    const docRef = doc(db, "products", id)
    await updateDoc(docRef, {
      ...product,
      updatedAt: Timestamp.fromDate(new Date()),
    })
  } catch (error) {
    console.error("Error updating product:", error)
    throw error
  }
}

export const deleteProduct = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, "products", id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error deleting product:", error)
    throw error
  }
}

// ==================== REVIEWS ====================
export const getReviews = async (approvedOnly = false): Promise<Review[]> => {
  try {
    let q = query(collection(db, "reviews"), orderBy("createdAt", "desc"))
    if (approvedOnly) {
      q = query(collection(db, "reviews"), where("approved", "==", true), orderBy("createdAt", "desc"))
    }

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        }) as Review,
    )
  } catch (error) {
    console.error("Error getting reviews:", error)
    throw error
  }
}

export const createReview = async (review: Omit<Review, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  try {
    const now = new Date()
    const docRef = await addDoc(collection(db, "reviews"), {
      ...review,
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now),
    })
    return docRef.id
  } catch (error) {
    console.error("Error creating review:", error)
    throw error
  }
}

export const updateReview = async (id: string, review: Partial<Review>): Promise<void> => {
  try {
    const docRef = doc(db, "reviews", id)
    await updateDoc(docRef, {
      ...review,
      updatedAt: Timestamp.fromDate(new Date()),
    })
  } catch (error) {
    console.error("Error updating review:", error)
    throw error
  }
}

export const deleteReview = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, "reviews", id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error deleting review:", error)
    throw error
  }
}

// ==================== FAQ ====================
export const getFAQs = async (activeOnly = false): Promise<FAQ[]> => {
  try {
    let q = query(collection(db, "faqs"), orderBy("order"))
    if (activeOnly) {
      q = query(collection(db, "faqs"), where("isActive", "==", true), orderBy("order"))
    }

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        }) as FAQ,
    )
  } catch (error) {
    console.error("Error getting FAQs:", error)
    throw error
  }
}

export const createFAQ = async (faq: Omit<FAQ, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  try {
    const now = new Date()
    const docRef = await addDoc(collection(db, "faqs"), {
      ...faq,
      views: 0,
      helpful: 0,
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now),
    })
    return docRef.id
  } catch (error) {
    console.error("Error creating FAQ:", error)
    throw error
  }
}

export const updateFAQ = async (id: string, faq: Partial<FAQ>): Promise<void> => {
  try {
    const docRef = doc(db, "faqs", id)
    await updateDoc(docRef, {
      ...faq,
      updatedAt: Timestamp.fromDate(new Date()),
    })
  } catch (error) {
    console.error("Error updating FAQ:", error)
    throw error
  }
}

export const deleteFAQ = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, "faqs", id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error deleting FAQ:", error)
    throw error
  }
}

// ==================== SITE CONTENT ====================
export const getSiteContent = async (): Promise<SiteContent[]> => {
  try {
    console.log("Fetching site content from Firebase...")
    const querySnapshot = await getDocs(collection(db, "siteContent"))
    const content = querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        }) as SiteContent,
    )
    console.log("Site content loaded:", content.length, "items")
    return content
  } catch (error) {
    console.error("Error getting site content:", error)
    // Возвращаем пустой массив вместо выброса ошибки
    return []
  }
}

export const updateSiteContent = async (section: string, content: Partial<SiteContent>): Promise<void> => {
  try {
    const docRef = doc(db, "siteContent", section)
    const now = new Date()

    await setDoc(
      docRef,
      {
        ...content,
        section,
        updatedAt: Timestamp.fromDate(now),
        createdAt: content.createdAt ? Timestamp.fromDate(content.createdAt) : Timestamp.fromDate(now),
      },
      { merge: true },
    )
  } catch (error) {
    console.error("Error updating site content:", error)
    throw error
  }
}

// ==================== FILE UPLOAD ====================
export const uploadImage = async (
  file: File,
  path: string,
  onProgress?: (progress: number) => void,
): Promise<string> => {
  try {
    const storageRef = ref(storage, path)
    const snapshot = await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)

    // Сохраняем метаданные файла
    await setDoc(doc(db, "uploads", snapshot.ref.name), {
      name: file.name,
      size: file.size,
      type: file.type,
      path: path,
      url: downloadURL,
      uploadedAt: Timestamp.fromDate(new Date()),
    })

    return downloadURL
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}

export const uploadMultipleImages = async (
  files: File[],
  basePath: string,
  onProgress?: (progress: number) => void,
): Promise<string[]> => {
  try {
    const uploadPromises = files.map(async (file, index) => {
      const path = `${basePath}/${Date.now()}_${index}_${file.name}`
      return uploadImage(file, path)
    })

    const urls = await Promise.all(uploadPromises)
    return urls
  } catch (error) {
    console.error("Error uploading multiple images:", error)
    throw error
  }
}

export const deleteImage = async (path: string): Promise<void> => {
  try {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)

    // Удаляем метаданные
    const fileName = path.split("/").pop()
    if (fileName) {
      await deleteDoc(doc(db, "uploads", fileName))
    }
  } catch (error) {
    console.error("Error deleting image:", error)
    throw error
  }
}

export const getUploadedFiles = async (): Promise<any[]> => {
  try {
    const querySnapshot = await getDocs(query(collection(db, "uploads"), orderBy("uploadedAt", "desc")))
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      uploadedAt: doc.data().uploadedAt?.toDate() || new Date(),
    }))
  } catch (error) {
    console.error("Error getting uploaded files:", error)
    throw error
  }
}

// ==================== ANALYTICS ====================
export const getAnalytics = async (days = 30): Promise<Analytics[]> => {
  try {
    const endDate = new Date()
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    const q = query(
      collection(db, "analytics"),
      where("date", ">=", startDate.toISOString().split("T")[0]),
      where("date", "<=", endDate.toISOString().split("T")[0]),
      orderBy("date", "desc"),
    )

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        }) as Analytics,
    )
  } catch (error) {
    console.error("Error getting analytics:", error)
    throw error
  }
}

export const updateAnalytics = async (date: string, data: Partial<Analytics>): Promise<void> => {
  try {
    const docRef = doc(db, "analytics", date)
    await setDoc(
      docRef,
      {
        ...data,
        date,
        createdAt: Timestamp.fromDate(new Date()),
      },
      { merge: true },
    )
  } catch (error) {
    console.error("Error updating analytics:", error)
    throw error
  }
}

// ==================== ORDERS ====================
export const getOrders = async (): Promise<Order[]> => {
  try {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        }) as Order,
    )
  } catch (error) {
    console.error("Error getting orders:", error)
    throw error
  }
}

export const createOrder = async (order: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<string> => {
  try {
    const now = new Date()
    const docRef = await addDoc(collection(db, "orders"), {
      ...order,
      createdAt: Timestamp.fromDate(now),
      updatedAt: Timestamp.fromDate(now),
    })
    return docRef.id
  } catch (error) {
    console.error("Error creating order:", error)
    throw error
  }
}

export const updateOrder = async (id: string, order: Partial<Order>): Promise<void> => {
  try {
    const docRef = doc(db, "orders", id)
    await updateDoc(docRef, {
      ...order,
      updatedAt: Timestamp.fromDate(new Date()),
    })
  } catch (error) {
    console.error("Error updating order:", error)
    throw error
  }
}

// ==================== ADMIN USERS ====================
export const getAdminUsers = async (): Promise<AdminUser[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "adminUsers"))
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          lastLogin: doc.data().lastLogin?.toDate() || new Date(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        }) as AdminUser,
    )
  } catch (error) {
    console.error("Error getting admin users:", error)
    throw error
  }
}

export const createAdminUser = async (userData: {
  email: string
  password: string
  displayName: string
  role: "admin" | "moderator" | "editor"
  permissions: string[]
}): Promise<string> => {
  try {
    // Создаем пользователя в Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password)

    // Обновляем профиль
    await updateProfile(userCredential.user, {
      displayName: userData.displayName,
    })

    // Сохраняем данные в Firestore
    const now = new Date()
    await setDoc(doc(db, "adminUsers", userCredential.user.uid), {
      email: userData.email,
      displayName: userData.displayName,
      role: userData.role,
      permissions: userData.permissions,
      isActive: true,
      lastLogin: Timestamp.fromDate(now),
      createdAt: Timestamp.fromDate(now),
    })

    return userCredential.user.uid
  } catch (error) {
    console.error("Error creating admin user:", error)
    throw error
  }
}

// ==================== REAL-TIME LISTENERS ====================
export const subscribeToProducts = (callback: (products: Product[]) => void) => {
  const q = query(collection(db, "products"), orderBy("order"))
  return onSnapshot(q, (snapshot) => {
    const products = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        }) as Product,
    )
    callback(products)
  })
}

export const subscribeToReviews = (callback: (reviews: Review[]) => void) => {
  const q = query(collection(db, "reviews"), orderBy("createdAt", "desc"))
  return onSnapshot(q, (snapshot) => {
    const reviews = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        }) as Review,
    )
    callback(reviews)
  })
}

export const subscribeToOrders = (callback: (orders: Order[]) => void) => {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"))
  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        }) as Order,
    )
    callback(orders)
  })
}

// ==================== BATCH OPERATIONS ====================
export const batchUpdateProducts = async (updates: { id: string; data: Partial<Product> }[]): Promise<void> => {
  try {
    const batch = writeBatch(db)

    updates.forEach(({ id, data }) => {
      const docRef = doc(db, "products", id)
      batch.update(docRef, {
        ...data,
        updatedAt: Timestamp.fromDate(new Date()),
      })
    })

    await batch.commit()
  } catch (error) {
    console.error("Error batch updating products:", error)
    throw error
  }
}

// ==================== SEARCH ====================
export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  try {
    // Простой поиск по названию (для полноценного поиска нужен Algolia или аналог)
    const q = query(
      collection(db, "products"),
      where("name", ">=", searchTerm),
      where("name", "<=", searchTerm + "\uf8ff"),
      limit(10),
    )

    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        }) as Product,
    )
  } catch (error) {
    console.error("Error searching products:", error)
    throw error
  }
}

// ==================== STATISTICS ====================
export const getStatistics = async () => {
  try {
    const [products, reviews, orders, faqs] = await Promise.all([
      getDocs(collection(db, "products")),
      getDocs(collection(db, "reviews")),
      getDocs(collection(db, "orders")),
      getDocs(collection(db, "faqs")),
    ])

    const approvedReviews = reviews.docs.filter((doc) => doc.data().approved)
    const totalRating = approvedReviews.reduce((sum, doc) => sum + doc.data().rating, 0)
    const averageRating = approvedReviews.length > 0 ? totalRating / approvedReviews.length : 0

    const totalRevenue = orders.docs.reduce((sum, doc) => {
      const data = doc.data()
      return sum + (data.status === "delivered" ? data.totalAmount : 0)
    }, 0)

    return {
      totalProducts: products.size,
      activeProducts: products.docs.filter((doc) => doc.data().isActive).length,
      totalReviews: reviews.size,
      approvedReviews: approvedReviews.length,
      pendingReviews: reviews.size - approvedReviews.length,
      averageRating: Math.round(averageRating * 10) / 10,
      totalOrders: orders.size,
      completedOrders: orders.docs.filter((doc) => doc.data().status === "delivered").length,
      pendingOrders: orders.docs.filter((doc) => doc.data().status === "pending").length,
      totalRevenue,
      totalFAQs: faqs.size,
      activeFAQs: faqs.docs.filter((doc) => doc.data().isActive).length,
    }
  } catch (error) {
    console.error("Error getting statistics:", error)
    throw error
  }
}

// ==================== MEDIA FILES ====================
export const getMediaFiles = async (): Promise<any[]> => {
  try {
    const querySnapshot = await getDocs(query(collection(db, "uploads"), orderBy("uploadedAt", "desc")))
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      uploadedAt: doc.data().uploadedAt?.toDate() || new Date(),
    }))
  } catch (error) {
    console.error("Error getting media files:", error)
    throw error
  }
}

// ==================== SECURITY SETTINGS ====================
export interface SecuritySettings {
  id: string
  twoFactorEnabled: boolean
  sessionTimeout: number
  maxLoginAttempts: number
  passwordMinLength: number
  requireSpecialChars: boolean
  ipWhitelist: string[]
  allowedDomains: string[]
  backupEnabled: boolean
  auditLogEnabled: boolean
  updatedAt: Date
}

export const getSecuritySettings = async (): Promise<SecuritySettings | null> => {
  try {
    const docRef = doc(db, "settings", "security")
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        ...data,
        updatedAt: data.updatedAt?.toDate() || new Date(),
      } as SecuritySettings
    }

    // Return default settings if none exist
    return {
      id: "security",
      twoFactorEnabled: false,
      sessionTimeout: 3600,
      maxLoginAttempts: 5,
      passwordMinLength: 8,
      requireSpecialChars: true,
      ipWhitelist: [],
      allowedDomains: [],
      backupEnabled: true,
      auditLogEnabled: true,
      updatedAt: new Date(),
    }
  } catch (error) {
    console.error("Error getting security settings:", error)
    throw error
  }
}

export const updateSecuritySettings = async (settings: Partial<SecuritySettings>): Promise<void> => {
  try {
    const docRef = doc(db, "settings", "security")
    await setDoc(
      docRef,
      {
        ...settings,
        updatedAt: Timestamp.fromDate(new Date()),
      },
      { merge: true },
    )
  } catch (error) {
    console.error("Error updating security settings:", error)
    throw error
  }
}

// ==================== MISSING EXPORTS ====================
export const addFAQ = createFAQ // Alias for createFAQ
export const addReview = createReview // Alias for createReview

export const updateOrderStatus = async (id: string, status: Order["status"]): Promise<void> => {
  try {
    const docRef = doc(db, "orders", id)
    await updateDoc(docRef, {
      status,
      updatedAt: Timestamp.fromDate(new Date()),
    })
  } catch (error) {
    console.error("Error updating order status:", error)
    throw error
  }
}

export const addAdminUser = createAdminUser // Alias for createAdminUser

export const updateAdminUser = async (id: string, userData: Partial<AdminUser>): Promise<void> => {
  try {
    const docRef = doc(db, "adminUsers", id)
    await updateDoc(docRef, {
      ...userData,
      updatedAt: Timestamp.fromDate(new Date()),
    })
  } catch (error) {
    console.error("Error updating admin user:", error)
    throw error
  }
}

export const deleteAdminUser = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, "adminUsers", id)
    await deleteDoc(docRef)
  } catch (error) {
    console.error("Error deleting admin user:", error)
    throw error
  }
}
