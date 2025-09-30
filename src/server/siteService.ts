import { firestore } from "configs/firebaseCore";
import { doc, getDoc, DocumentData, DocumentSnapshot } from "firebase/firestore";
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";

export interface SiteConfig {
  apiKey: string;
  appId: string;
  authDomain: string;
  createAt: string;
  domain: string;
  measurementId: string;
  messagingSenderId: string;
  projectId: string;
  storageBucket: string;
}

class SiteService {
  static async getSiteConfig(siteId: string): Promise<SiteConfig | null> {
    const siteRef = doc(firestore, "sites", siteId);
    const snapshot: DocumentSnapshot<DocumentData> = await getDoc(siteRef);
    if (snapshot.exists()) {
      return snapshot.data() as SiteConfig;
    }
    return null;
  }

  static getOrInitFirebaseApp(config: SiteConfig, name: string): FirebaseApp {
    // Avoid duplicate app initialization
    const existing = getApps().find(app => app.name === name);
    if (existing) return getApp(name);
    return initializeApp(config, name);
  }
}

export default SiteService;
