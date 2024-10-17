import { db } from 'configs/firebase';
import { IUserVote } from 'contexts/vote';
import {
  collection,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";

// Dịch vụ người dùng và phiếu bầu, tách biệt giữa các hành vi
export class UserVoteService {

  // Gọi các thao tác liên quan đến người dùng và sản phẩm
  static async addUserVote(userVoteData: IUserVote, customId: string): Promise<void> {
    
    if (!customId) {
      throw new Error('Custom ID must be provided');
    }

    try {
      const votesCollection = collection(db, 'vote');
      const docRef = doc(votesCollection, customId); // Tạo reference với ID tùy chỉnh
      
      // Kiểm tra xem tài liệu có tồn tại không
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
  
        return; // Nếu tài liệu đã tồn tại, trả về mà không thêm dữ liệu mới
      }

      // Nếu tài liệu chưa tồn tại, thêm tài liệu mới
      await setDoc(docRef, userVoteData);

    } catch (error) {
      console.error('Error adding user vote:', error);
      throw new Error('Failed to add user vote');
    }
  }
}
