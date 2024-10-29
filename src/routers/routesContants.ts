/* eslint-disable @typescript-eslint/lines-between-class-members */
export default class RouterPath {
	static readonly BASE_URL = '/';
	static readonly AUTH = '/auth';
	static readonly CHAT = '/chat';
	static readonly CHAT_Question = `${RouterPath.CHAT}/:category`;
	static readonly CHAT_Question_Land = `${RouterPath.CHAT}/land`;
	static readonly CHAT_Question_Marriage = `${RouterPath.CHAT}/marriage`;
	static readonly CHAT_HISTORY = `${RouterPath.CHAT}/history`;

	// use sidebar db 
	static readonly CHAT_DB = 'chat';
	static readonly CHAT_HISTORY_DB = `${this.CHAT_DB}/history`;
  }
  