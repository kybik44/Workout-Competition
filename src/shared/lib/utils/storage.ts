import Cookie, { CookieAttributes } from 'js-cookie';

class Storage {
	public set(name: string, value: {} | string, options?: CookieAttributes) {
		const val =
			typeof value === 'object' ? JSON.stringify(value) : String(value);
		Cookie.set(name, val, options);
	}

	public get(key: string): string {
		const result = Cookie.get(key);
		return result === undefined || result === null ? null : result;
	}

	public remove(name: string, options?: CookieAttributes) {
		Cookie.remove(name, options);
	}
}

export default new Storage();
