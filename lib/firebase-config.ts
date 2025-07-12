import { initializeApp, getApps } from "firebase/app"
import { getAuth, connectAuthEmulator } from "firebase/auth"
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore"
import { getStorage, connectStorageEmulator } from "firebase/storage"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// Инициализация Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Инициализация сервисов
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

// Analytics только в браузере
export const analytics = typeof window !== "undefined" ? getAnalytics(app) : null

// Подключение к эмуляторам в development
// if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
//   try {
//     // Подключаем эмуляторы только один раз
//     if (!auth.config.emulator) {
//       connectAuthEmulator(auth, "http://localhost:9099")
//     }
//     if (!(db as any)._delegate._databaseId.projectId.includes("demo-")) {
//       connectFirestoreEmulator(db, "localhost", 8080)
//     }
//     if (!storage.app.options.storageBucket?.includes("demo-")) {
//       connectStorageEmulator(storage, "localhost", 9199)
//     }
//   } catch (error) {
//     console.log("Emulators already connected or not available")
//   }
// }

export default app
