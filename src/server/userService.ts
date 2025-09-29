import { firestore } from "configs/firebaseCore";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  DocumentData,
  DocumentSnapshot,
} from "firebase/firestore";

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  role: string;         // e.g. "user" | "admin"
  sites: string[];      // list of site IDs/domains
  createdAt: string;
  updatedAt?: string;
}

class UserService {
  /**
   * Lấy user theo uid
   */
  static async getUser(uid: string): Promise<UserProfile | null> {
    const userRef = doc(firestore, "users", uid);
    const snapshot: DocumentSnapshot<DocumentData> = await getDoc(userRef);

    if (snapshot.exists()) {
      return snapshot.data() as UserProfile;
    }
    return null;
  }

  /**
   * Tạo user mới (nếu chưa tồn tại)
   */
  static async createUser(user: Partial<UserProfile>): Promise<void> {
    if (!user.uid) throw new Error("UID is required to create user");
    const userRef = doc(firestore, "users", user.uid);

    const now = new Date().toISOString();

    await setDoc(userRef, {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || null,
      photoURL: user.photoURL || null,
      role: user.role || "user",     // default role
      sites: user.sites || [],       // default empty array
      createdAt: now,
      updatedAt: now,
    });
  }

  /**
   * Cập nhật user
   */
  static async updateUser(uid: string, data: Partial<UserProfile>): Promise<void> {
    const userRef = doc(firestore, "users", uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  }
}

export default UserService;
