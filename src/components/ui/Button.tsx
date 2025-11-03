import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode;
	className?: string;
}

export function Button({ children, className = "", ...props }: ButtonProps) {
	return (
		<button
			className={`px-4 py-2 rounded bg-cyan-600 text-white font-semibold shadow hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition ${className}`}
			{...props}
		>
			{children}
		</button>
	);
}
