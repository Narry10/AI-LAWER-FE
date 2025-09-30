export const SITE_WORKSPACE_SELECT = 'SITE_WORKSPACE/SELECT';
export const SITE_WORKSPACE_LOAD_CONFIG = 'SITE_WORKSPACE/LOAD_CONFIG';
export const SITE_WORKSPACE_LOAD_SUCCESS = 'SITE_WORKSPACE/LOAD_SUCCESS';
export const SITE_WORKSPACE_LOAD_ERROR = 'SITE_WORKSPACE/LOAD_ERROR';

export interface SiteWorkspaceSelect {
  type: typeof SITE_WORKSPACE_SELECT;
  payload: { siteId: string };
}

export interface SiteWorkspaceLoadConfig {
  type: typeof SITE_WORKSPACE_LOAD_CONFIG;
  payload: { siteId: string };
}

export interface SiteWorkspaceLoadSuccess {
  type: typeof SITE_WORKSPACE_LOAD_SUCCESS;
  payload: { siteId: string; config: any; app: any };
}

export interface SiteWorkspaceLoadError {
  type: typeof SITE_WORKSPACE_LOAD_ERROR;
  payload: { error: string };
}

export type SiteWorkspaceActions =
  | SiteWorkspaceSelect
  | SiteWorkspaceLoadConfig
  | SiteWorkspaceLoadSuccess
  | SiteWorkspaceLoadError;
