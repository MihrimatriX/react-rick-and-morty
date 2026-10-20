/** localStorage access that never throws (private mode, blocked storage, …). */
export function readStorage(key: string): string | null {
	try {
		return window.localStorage.getItem(key);
	} catch {
		return null;
	}
}

export function writeStorage(key: string, value: string) {
	try {
		window.localStorage.setItem(key, value);
	} catch {
		// Persisting is a convenience; the in-memory state still updates.
	}
}
