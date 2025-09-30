import { takeEvery } from "redux-saga/effects";
import { SITE_WORKSPACE_SELECT } from "../siteWorkspaceActions";
import { loadSiteWorkspaceConfig } from "./siteWorkspaceSaga";

export function* siteWorkspaceSaga() {
  yield takeEvery(SITE_WORKSPACE_SELECT, loadSiteWorkspaceConfig);
}
