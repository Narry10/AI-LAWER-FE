import { db } from "configs/firebase";
import { CreateHistory, History, UserHistory } from "contexts/history";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

class historyService {
  private static collectionRef = collection(db, "histories");

  static async createHistory(data: History): Promise<CreateHistory> {
    const docRef = await addDoc(this.collectionRef, data);
    const createdDoc = await getDoc(docRef);
    return { ...createdDoc.data(), ref_id: docRef.id } as CreateHistory;
  }

  static async getHistoryByUid(uid: string): Promise<History[]> {
    const q = query(
      this.collectionRef,
      where("uid", "==", uid),
      orderBy("create_at", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map(
      (doc) => ({ ...doc.data(), ref_id: doc.id }) as UserHistory
    );
  }

  static async updateHistory(
    uid: string,
    data: Partial<History>
  ): Promise<void> {
    const docRef = doc(this.collectionRef, uid);
    await updateDoc(docRef, data);
  }

  static async deleteHistory(uid: string): Promise<void> {
    const docRef = doc(this.collectionRef, uid);
    await deleteDoc(docRef);
  }

  static async deleteHistoryByRefId(ref_id: string): Promise<void> {
    const docRef = doc(this.collectionRef, ref_id);
    await deleteDoc(docRef);
  }
}

export default historyService;
