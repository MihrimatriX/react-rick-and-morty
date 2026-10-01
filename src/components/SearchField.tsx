import { Search, X } from "lucide-react";
import { useEffect, useEffectEvent, useId, useState } from "react";
import { useDebouncedValue } from "../hooks/useDebouncedValue";
import { cn } from "../lib/cn";

interface SearchFieldProps {
	label: string;
	placeholder?: string;
	/** Committed value, usually read from the URL. */
	value: string;
	onChange: (value: string) => void;
	className?: string;
}

/** A text input that commits its value after the user pauses typing. */
export default function SearchField({
	label,
	placeholder,
	value,
	onChange,
	className,
}: SearchFieldProps) {
	const id = useId();
	const [draft, setDraft] = useState(value);
	const [lastValue, setLastValue] = useState(value);
	if (value !== lastValue) {
		// The committed value changed elsewhere (reset, back button…).
		setLastValue(value);
		setDraft(value);
	}

	const debounced = useDebouncedValue(draft);
	const commit = useEffectEvent((next: string) => {
		if (next.trim() !== value) onChange(next.trim());
	});
	useEffect(() => {
		commit(debounced);
	}, [debounced]);

	return (
		<div className={cn("flex flex-col gap-1.5", className)}>
			<label htmlFor={id} className="text-xs font-semibold text-muted">
				{label}
			</label>
			<div className="relative">
				<Search
					className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted"
					aria-hidden="true"
				/>
				<input
					id={id}
					type="search"
					value={draft}
					placeholder={placeholder}
					autoComplete="off"
					spellCheck={false}
					onChange={(e) => setDraft(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") onChange(draft.trim());
					}}
					className="h-11 w-full rounded-xl border border-line bg-surface pr-10 pl-10 text-sm text-fg shadow-sm transition-colors outline-none placeholder:text-muted/70 hover:border-portal/50 focus:border-portal focus:ring-4 focus:ring-portal/15 [&::-webkit-search-cancel-button]:hidden"
				/>
				{draft && (
					<button
						type="button"
						onClick={() => {
							setDraft("");
							onChange("");
						}}
						className="absolute top-1/2 right-2 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-lg text-muted hover:bg-surface-2 hover:text-fg"
						aria-label="Aramayı temizle"
					>
						<X className="size-4" aria-hidden="true" />
					</button>
				)}
			</div>
		</div>
	);
}
