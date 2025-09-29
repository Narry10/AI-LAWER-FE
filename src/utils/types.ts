// src/utils/types.ts

export type Role = 'admin' | 'member';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  role?: Role;
  sites: string[];
}

export interface Site {
  siteId: string;
  name: string;
  firebaseConfig: Record<string, string>;
  members: string[];
  admins: string[];
  createdAt: number;
  updatedAt: number;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  authorUid: string;
  createdAt: number;
  updatedAt: number;
  status: 'draft' | 'published';
}

export interface PostDetails {
  slug: string;
  content: string;
  images?: string[];
  seoMeta?: Record<string, string>;
  updatedAt: number;
}
