/** Page numbers to show, with `null` standing for a gap. */
export function pageWindow(page: number, pages: number): (number | null)[] {
	if (pages <= 7) return Array.from({ length: pages }, (_, i) => i + 1);
	const items = new Set([1, pages, page - 1, page, page + 1]);
	if (page <= 3) [2, 3, 4].forEach((n) => items.add(n));
	if (page >= pages - 2) [pages - 3, pages - 2, pages - 1].forEach((n) => items.add(n));
	const sorted = [...items].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
	return sorted.flatMap((n, i) => (i > 0 && n - sorted[i - 1] > 1 ? [null, n] : [n]));
}
