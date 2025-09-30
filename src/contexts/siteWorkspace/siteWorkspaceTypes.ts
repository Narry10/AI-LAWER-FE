import { SiteConfig } from 'server/siteService';
import { FirebaseApp } from 'firebase/app';

export interface SiteWorkspaceState {
  siteId: string | null;
  config: SiteConfig | null;
  app: FirebaseApp | null;
  loading: boolean;
  error: string | null;
}
