import { SiteConfig } from 'server/siteService';
import { FirebaseApp } from 'firebase/app';

export interface SiteWorkspaceState {
  siteId: string | null;
  config: SiteConfig | null;
  app: FirebaseApp | null;
  loading: boolean;
  error: string | null;
}


export enum Category {
  ALL = "",
  MOVIE = "movie",
  SPORTS = "sports",
  LIFESTYLE = "lifestyle",
  FASHION = "fashion",
  BUSINESS = "business",
  NEWS = "news",
}

export interface PostMeta {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  featuredImageUrl?: string;
  category?: string;
  status: "draft" | "published" | "archived";
  isFeatured?: boolean;
  publishAt?: string;
  unpublishAt?: string;
  lastVersionId?: string;
  createdBy: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt: string;
  content?: string;
}

