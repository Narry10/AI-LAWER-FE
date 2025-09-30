import { SiteWorkspaceState } from './siteWorkspaceTypes';
import {
  SITE_WORKSPACE_LOAD_SUCCESS,
  SITE_WORKSPACE_LOAD_ERROR,
  SiteWorkspaceActions,
} from './siteWorkspaceActions';

const initialState: SiteWorkspaceState = {
  siteId: null,
  config: null,
  app: null,
  loading: false,
  error: null,
};

export function siteWorkspaceReducer(
  state = initialState,
  action: SiteWorkspaceActions
): SiteWorkspaceState {
  switch (action.type) {
    case SITE_WORKSPACE_LOAD_SUCCESS:
      return {
        ...state,
        siteId: action.payload.siteId,
        config: action.payload.config,
        app: action.payload.app,
        loading: false,
        error: null,
      };
    case SITE_WORKSPACE_LOAD_ERROR:
      return {
        ...state,
        error: action.payload.error,
        loading: false,
      };
    default:
      return state;
  }
}
