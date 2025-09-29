// Firebase Subsite config: Khởi tạo app cho từng site, cache theo projectId/appId
import { initializeApp, getApps, getApp, FirebaseApp, deleteApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { getStorage, FirebaseStorage } from 'firebase/storage';

interface SubsiteApp {
  app: FirebaseApp;
  db: Firestore;
  storage?: FirebaseStorage;
}

const subsiteApps: Record<string, SubsiteApp> = {};

export function getOrInitSubsiteApp(config: Record<string, string>): SubsiteApp {
  const key = config.projectId || config.appId;
  if (!key) throw new Error('Missing projectId/appId in subsite config');
  if (subsiteApps[key]) return subsiteApps[key];
  const app = initializeApp(config, key);
  const db = getFirestore(app);
  let storage: FirebaseStorage | undefined;
  if (config.storageBucket) storage = getStorage(app);
  const subsiteApp = { app, db, storage };
  subsiteApps[key] = subsiteApp;
  return subsiteApp;
}

export function clearSubsiteApps() {
  Object.keys(subsiteApps).forEach(async key => {
    try { await deleteApp(subsiteApps[key].app); } catch {}
    delete subsiteApps[key];
  });
}
