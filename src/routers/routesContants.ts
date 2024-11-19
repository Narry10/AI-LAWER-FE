/* eslint-disable @typescript-eslint/lines-between-class-members */
// DB rote path match to defauft path
export default class RouterPath {
	static readonly BASE_URL = '/';
	static readonly AUTH = '/auth';
	static readonly CHAT = '/chat';
	static readonly DOCUMENT = '/doc/:id';
	static readonly CHAT_Question = `${RouterPath.CHAT}/:category`;
	static readonly CHAT_Question_Land = `${RouterPath.CHAT}/land`;
	static readonly CHAT_Question_Marriage = `${RouterPath.CHAT}/marriage`;
	static readonly CHAT_HISTORY = `${RouterPath.CHAT}/history`;
	static readonly OFFICE = `/office/:ref_id`;
	static readonly getOffice = (ref_id: string) => `/office/${ref_id}`;

	// use sidebar db 
	static readonly CHAT_DB = 'chat';
	static readonly CHAT_HISTORY_DB = `${this.CHAT_DB}/history`;

	// admin control
	static readonly ADMIN = '/admin';
	static readonly ADMIN_BUSINESS= `${RouterPath.ADMIN}/create`;
	static readonly ADMIN_BUSINESS_LIST = `${RouterPath.ADMIN}/list`;
	static readonly ADMIN_BUSINESS_DETAIL = `${RouterPath.ADMIN}/doc/:ref_id`;
	static readonly ADMIN_VIEW = `${RouterPath.ADMIN}/view`;

	// use admin sidebar 
	static readonly ADMIN_DB = 'admin';
	static readonly ADMIN_BUSINESS_DB = `${RouterPath.ADMIN_DB}/create`;
	static readonly ADMIN_BUSINESS_LIST_DB = `${RouterPath.ADMIN_DB}/list`;
	static readonly ADMIN_BUSINESS_DETAIL_DB = `${RouterPath.ADMIN_DB}/doc/:ref_id`;
	static readonly ADMIN_VIEW_DB = `${RouterPath.ADMIN_DB}/view`;
  }
  