class LocalStorage {
	public set(name: string, value: {} | string) {
		const val =
			typeof value === 'object' ? JSON.stringify(value) : String(value);
		typeof window !== 'undefined' && window.localStorage.setItem(name, val);
	}

	public get(key: string): string {
		const result =
			typeof window !== 'undefined' && window.localStorage.getItem(key);
		return result === undefined || result === null ? null : result;
	}

	public remove(name: string) {
		typeof window !== 'undefined' && window.localStorage.removeItem(name);
	}
}

export default new LocalStorage();
