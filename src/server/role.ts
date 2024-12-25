import { db } from "configs/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  where,
  query,
} from "firebase/firestore";

interface Role {
  uid: string;
  state: 'admin' | 'user' | 'supperadmin';
  create_at?: Date;
}

class RoleService {
  private static collectionRef = collection(db, "roles");

  static async createRole(data: Role): Promise<Role> {
    const docRef = await addDoc(RoleService.collectionRef, data);
    const createdDoc = await getDoc(docRef);
    return { ...createdDoc.data(), ref_id: docRef.id } as unknown as Role;
  }

  static async getRoles(): Promise<Role[]> {
    const querySnapshot = await getDocs(RoleService.collectionRef);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), ref_id: doc.id } as unknown as Role));
  }

  static async getRoleByUid(uid: string): Promise<Role | null> {
    const q = query(RoleService.collectionRef, where("uid", "==", uid));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { ...doc.data(), ref_id: doc.id } as unknown as Role;
    } else {
      return null;
    }
  }

  static async updateRole(uid: string, data: Partial<Role>): Promise<void> {
    const docRef = doc(RoleService.collectionRef, uid);
    await updateDoc(docRef, data);
  }

  static async deleteRole(uid: string): Promise<void> {
    const docRef = doc(RoleService.collectionRef, uid);
    await deleteDoc(docRef);
  }

  static async deleteRoleByRefId(ref_id: string): Promise<void> {
    const docRef = doc(RoleService.collectionRef, ref_id);
    await deleteDoc(docRef);
  }

  static async getAdminUids(): Promise<string[]> {
    const q = query(RoleService.collectionRef);
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => doc.data().uid as string);
  }
}

export default RoleService;
