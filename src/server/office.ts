// officeService.ts
import { collection, addDoc, getDocs, doc, getDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from "configs/firebase";
import { Office } from 'contexts/business';

class OfficeService {
  private static collectionRef = collection(db, 'offices');

  static async createOffice(data: Office): Promise<Office> {
    const docRef = await addDoc(OfficeService.collectionRef, data);
    const createdDoc = await getDoc(docRef);
    return { ...createdDoc.data(), ref_id: docRef.id } as Office;
  }

  static async getOffices(): Promise<Office[]> {
    const querySnapshot = await getDocs(OfficeService.collectionRef);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), ref_id: doc.id } as Office));
  }

  static async getOfficeById(ref_id: string): Promise<Office> {
    const docRef = doc(db, 'offices', ref_id);
    const officeDoc = await getDoc(docRef);
    if (officeDoc.exists()) {
      return { ...officeDoc.data(), ref_id: officeDoc.id } as Office;
    } else {
      throw new Error('Office not found');
    }
  }

  static async deleteOffice(ref_id: string): Promise<void> {
    const docRef = doc(db, 'offices', ref_id);
    await deleteDoc(docRef);
  }

  static async updateOffice(ref_id: string, data: Partial<Office>): Promise<void> {
    const docRef = doc(db, 'offices', ref_id);
    await updateDoc(docRef, data);
  }
}

export default OfficeService;
