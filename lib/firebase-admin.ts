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
} from "firebase/firestore"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage } from "./firebase"

// Types
export interface Product {
  id: string
  name: string
  shortName: string
  description: string
  image: string
  category: string
  benefits: string[]
  price: string
  isMainProduct?: boolean
  order?: number
}

export interface Review {
  id: string
  name: string
  age: number
  city: string
  rating: number
  text: string
  image: string
  beforeAfter: boolean
  approved: boolean
  createdAt: Date
}

export interface FAQ {
  id: string
  question: string
  answer: string
  order: number
}

export interface SiteContent {
  id: string
  section: string
  title: string
  subtitle: string
  description: string
  buttonText?: string
  image?: string
  benefits?: string[]
}

// Products CRUD
export const getProducts = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(query(collection(db, "products"), orderBy("order")))
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Product)
}

export const getProduct = async (id: string): Promise<Product | null> => {
  const docRef = doc(db, "products", id)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? ({ id: docSnap.id, ...docSnap.data() } as Product) : null
}

export const createProduct = async (product: Omit<Product, "id">): Promise<string> => {
  const docRef = await addDoc(collection(db, "products"), product)
  return docRef.id
}

export const updateProduct = async (id: string, product: Partial<Product>): Promise<void> => {
  const docRef = doc(db, "products", id)
  await updateDoc(docRef, product)
}

export const deleteProduct = async (id: string): Promise<void> => {
  const docRef = doc(db, "products", id)
  await deleteDoc(docRef)
}

// Reviews CRUD
export const getReviews = async (): Promise<Review[]> => {
  const querySnapshot = await getDocs(collection(db, "reviews"))
  return querySnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      }) as Review,
  )
}

export const createReview = async (review: Omit<Review, "id">): Promise<string> => {
  const docRef = await addDoc(collection(db, "reviews"), {
    ...review,
    createdAt: new Date(),
  })
  return docRef.id
}

export const updateReview = async (id: string, review: Partial<Review>): Promise<void> => {
  const docRef = doc(db, "reviews", id)
  await updateDoc(docRef, review)
}

export const deleteReview = async (id: string): Promise<void> => {
  const docRef = doc(db, "reviews", id)
  await deleteDoc(docRef)
}

// FAQ CRUD
export const getFAQs = async (): Promise<FAQ[]> => {
  const querySnapshot = await getDocs(query(collection(db, "faqs"), orderBy("order")))
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as FAQ)
}

export const createFAQ = async (faq: Omit<FAQ, "id">): Promise<string> => {
  const docRef = await addDoc(collection(db, "faqs"), faq)
  return docRef.id
}

export const updateFAQ = async (id: string, faq: Partial<FAQ>): Promise<void> => {
  const docRef = doc(db, "faqs", id)
  await updateDoc(docRef, faq)
}

export const deleteFAQ = async (id: string): Promise<void> => {
  const docRef = doc(db, "faqs", id)
  await deleteDoc(docRef)
}

// Site Content CRUD
export const getSiteContent = async (): Promise<SiteContent[]> => {
  const querySnapshot = await getDocs(collection(db, "siteContent"))
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as SiteContent)
}

export const updateSiteContent = async (section: string, content: Partial<SiteContent>): Promise<void> => {
  const docRef = doc(db, "siteContent", section)
  await setDoc(docRef, { ...content, section }, { merge: true })
}

// File Upload
export const uploadImage = async (file: File, path: string): Promise<string> => {
  const storageRef = ref(storage, path)
  const snapshot = await uploadBytes(storageRef, file)
  return await getDownloadURL(snapshot.ref)
}

export const deleteImage = async (path: string): Promise<void> => {
  const storageRef = ref(storage, path)
  await deleteObject(storageRef)
}

// Real-time listeners
export const subscribeToProducts = (callback: (products: Product[]) => void) => {
  return onSnapshot(query(collection(db, "products"), orderBy("order")), (snapshot) => {
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as Product)
    callback(products)
  })
}

export const subscribeToReviews = (callback: (reviews: Review[]) => void) => {
  return onSnapshot(collection(db, "reviews"), (snapshot) => {
    const reviews = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        }) as Review,
    )
    callback(reviews)
  })
}
