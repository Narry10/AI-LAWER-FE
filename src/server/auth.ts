import { auth } from "configs/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword as signInWithEmailAndPasswordFirebase,
  signOut as signOutFirebase,
  sendPasswordResetEmail,
  sendEmailVerification,
  UserCredential,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  email: string;
  password: string;
}

class AuthService {
  static signInWithEmailAndPassword = ({
    email,
    password,
  }: SignInCredentials): Promise<UserCredential> => {
    return signInWithEmailAndPasswordFirebase(auth, email, password);
  };

  static signUpWithEmailAndPassword = async ({
    email,
    password,
  }: SignUpCredentials): Promise<UserCredential> => {
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  static signOut = async (): Promise<void> => {
    return signOutFirebase(auth);
  };

  static sendPasswordResetEmail = async (email: string): Promise<void> => {
    return sendPasswordResetEmail(auth, email);
  };

  static sendEmailVerification = async (): Promise<void> => {
    const user = auth.currentUser;
      if (user) {
        await sendEmailVerification(user);
      }
  };
  
  static signInWithGoogle = async (): Promise<UserCredential> => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
}

export default AuthService;
