import { ChevronDown } from "lucide-react";
import { useId } from "react";
import { cn } from "../lib/cn";

export interface SelectOption {
	value: string;
	label: string;
}

interface SelectFieldProps {
	label: string;
	value: string;
	options: SelectOption[];
	onChange: (value: string) => void;
	className?: string;
}

export default function SelectField({
	label,
	value,
	options,
	onChange,
	className,
}: SelectFieldProps) {
	const id = useId();
	return (
		<div className={cn("flex flex-col gap-1.5", className)}>
			<label htmlFor={id} className="text-xs font-semibold text-muted">
				{label}
			</label>
			<div className="relative">
				<select
					id={id}
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className={cn(
						"h-11 w-full cursor-pointer appearance-none rounded-xl border bg-surface pr-8 pl-3 text-sm shadow-sm transition-colors outline-none hover:border-portal/50 focus:border-portal focus:ring-4 focus:ring-portal/15",
						value === "all"
							? "border-line text-fg"
							: "border-portal/60 font-medium text-portal-ink",
					)}
				>
					{options.map((option) => (
						<option
							key={option.value}
							value={option.value}
							className="bg-surface text-fg"
						>
							{option.label}
						</option>
					))}
				</select>
				<ChevronDown
					className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted"
					aria-hidden="true"
				/>
			</div>
		</div>
	);
}
