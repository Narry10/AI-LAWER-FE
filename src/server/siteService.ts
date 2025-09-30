// server/siteService.ts
import { firestore } from "configs/firebaseCore";
import {
  doc,
  getDoc,
  DocumentData,
  DocumentSnapshot,
  Firestore,
} from "firebase/firestore";
import {
  initializeApp,
  getApps,
  getApp,
  FirebaseApp,
} from "firebase/app";
import { getFirestore } from "firebase/firestore";
// (tuỳ chọn) nếu cần auth/storage sau này:
// import { getAuth, Auth } from "firebase/auth";
// import { getStorage, FirebaseStorage } from "firebase/storage";

export interface SiteConfig {
  apiKey: string;
  appId: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  measurementId?: string;
  domain?: string;
  createdAt?: string; // sửa từ createAt -> createdAt (optional)
  // có thể có các field khác bạn lưu trong Core
}

/**
 * Quản lý cấu hình + app + firestore theo site, có cache nội bộ.
 * Mục tiêu: 1 nơi duy nhất để lấy Firestore/app từ siteId.
 */
class SiteService {
  private static configCache = new Map<string, SiteConfig>();
  private static appCache = new Map<string, FirebaseApp>();
  private static fsCache = new Map<string, Firestore>();
  // (tuỳ chọn)
  // private static authCache = new Map<string, Auth>();
  // private static storageCache = new Map<string, FirebaseStorage>();

  /** Lấy config site từ Core Firestore (cache lần sau) */
  static async getSiteConfig(siteId: string): Promise<SiteConfig | null> {
    // cache hit
    const cached = this.configCache.get(siteId);
    if (cached) return cached;

    const siteRef = doc(firestore, "sites", siteId);
    const snapshot: DocumentSnapshot<DocumentData> = await getDoc(siteRef);
    if (!snapshot.exists()) return null;

    const cfg = snapshot.data() as SiteConfig;
    // (optional) validate tối thiểu
    if (!cfg.apiKey || !cfg.appId || !cfg.authDomain || !cfg.projectId) {
      console.warn("[SiteService] Invalid site config for:", siteId);
      return null;
    }

    this.configCache.set(siteId, cfg);
    return cfg;
  }

  /** Cho phép nạp sẵn config (nếu bạn fetch từ nơi khác) */
  static setSiteConfig(siteId: string, cfg: SiteConfig) {
    this.configCache.set(siteId, cfg);
  }

  /** Xoá cache cho 1 site (khi đổi cấu hình) */
  static clearSite(siteId: string) {
    this.configCache.delete(siteId);
    this.appCache.delete(siteId);
    this.fsCache.delete(siteId);
    // this.authCache.delete(siteId);
    // this.storageCache.delete(siteId);
  }

  /** Tên app theo siteId để tránh trùng */
  private static appName(siteId: string) {
    return `site-${siteId}`;
  }

  /** Khởi tạo (hoặc lấy sẵn) FirebaseApp theo site */
  static getOrInitFirebaseApp(config: SiteConfig, siteId: string): FirebaseApp {
    const name = this.appName(siteId);
    // nếu đã cache thì trả về
    const cached = this.appCache.get(siteId);
    if (cached) return cached;

    // nếu đã tồn tại trong getApps()
    const existing = getApps().find((a) => a.name === name);
    const app = existing ?? initializeApp(config as any, name);

    this.appCache.set(siteId, app);
    return app;
  }

  /** Lấy Firestore cho site (có cache) */
  static getFirestoreForSite(config: SiteConfig, siteId: string): Firestore {
    const cached = this.fsCache.get(siteId);
    if (cached) return cached;
    const app = this.getOrInitFirebaseApp(config, siteId);
    const fs = getFirestore(app);
    this.fsCache.set(siteId, fs);
    return fs;
  }

  /** Helper gộp: chỉ cần siteId → Firestore (tự get config + cache) */
  static async ensureFirestore(siteId: string): Promise<Firestore> {
    const cfg = await this.getSiteConfig(siteId);
    if (!cfg) throw new Error("Site config not found");
    return this.getFirestoreForSite(cfg, siteId);
  }

  // (Tuỳ chọn) nếu cần:
  // static getAuthForSite(config: SiteConfig, siteId: string): Auth {
  //   const cached = this.authCache.get(siteId);
  //   if (cached) return cached;
  //   const app = this.getOrInitFirebaseApp(config, siteId);
  //   const auth = getAuth(app);
  //   this.authCache.set(siteId, auth);
  //   return auth;
  // }
  // static getStorageForSite(config: SiteConfig, siteId: string): FirebaseStorage {
  //   const cached = this.storageCache.get(siteId);
  //   if (cached) return cached;
  //   const app = this.getOrInitFirebaseApp(config, siteId);
  //   const storage = getStorage(app);
  //   this.storageCache.set(siteId, storage);
  //   return storage;
  // }
}

export default SiteService;
