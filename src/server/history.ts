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
    const docRef = await addDoc(historyService.collectionRef, data);
    const createdDoc = await getDoc(docRef);
    return { ...createdDoc.data(), ref_id: docRef.id } as CreateHistory;
  }

  static async getHistoryByUid(uid: string): Promise<History[]> {
    const q = query(
      historyService.collectionRef,
      where("uid", "==", uid),
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        ...data,
        ref_id: doc.id,
        create_at: data.create_at.toDate(), 
      } as UserHistory;
    }).sort((a, b) => (b?.create_at?.getTime?.() ?? 0) - (a?.create_at?.getTime?.() ?? 0));
  }

  static async updateHistory(
    uid: string,
    data: Partial<History>
  ): Promise<void> {
    const docRef = doc(historyService.collectionRef, uid);
    await updateDoc(docRef, data);
  }

  static async deleteHistory(uid: string): Promise<void> {
    const docRef = doc(historyService.collectionRef, uid);
    await deleteDoc(docRef);
  }

  static async deleteHistoryByRefId(ref_id: string): Promise<void> {
    const docRef = doc(historyService.collectionRef, ref_id);
    await deleteDoc(docRef);
  }
}

export default historyService;
