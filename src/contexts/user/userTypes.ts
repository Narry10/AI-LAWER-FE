enum RoleType {
  ADMIN = "admin",
  USER = "user",
}

export interface IUser {
  providerId: string;
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  sites?: string[];
  role?: RoleType | string;
  updatedAt?: Date;
}

export type IUserMeta = Pick<IUser, 'role' | 'sites'>;
