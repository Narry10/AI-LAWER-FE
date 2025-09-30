import { call, put, takeEvery } from 'redux-saga/effects';
import SiteService from 'server/siteService';
import {
  SITE_WORKSPACE_SELECT,
  SITE_WORKSPACE_LOAD_CONFIG,
  SITE_WORKSPACE_LOAD_SUCCESS,
  SITE_WORKSPACE_LOAD_ERROR,
  SiteWorkspaceSelect,
} from '../siteWorkspaceActions';

export function* loadSiteWorkspaceConfig(action: SiteWorkspaceSelect) {
  try {
    const config = yield call(SiteService.getSiteConfig, action.payload.siteId);
    if (!config) throw new Error('Site config not found');
    const app = SiteService.getOrInitFirebaseApp(config, action.payload.siteId);
    yield put({
      type: SITE_WORKSPACE_LOAD_SUCCESS,
      payload: { siteId: action.payload.siteId, config, app },
    });
  } catch (error: any) {
    yield put({
      type: SITE_WORKSPACE_LOAD_ERROR,
      payload: { error: error.message || 'Failed to load site workspace' },
    });
  }
}


