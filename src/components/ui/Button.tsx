import type { ButtonHTMLAttributes } from "react";
import { cn } from "../../lib/cn";
import { buttonClasses, type Size, type Variant } from "./button-classes";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: Variant;
	size?: Size;
}

export function Button({
	variant = "secondary",
	size = "md",
	className,
	type = "button",
	...props
}: ButtonProps) {
	return (
		<button
			type={type}
			className={cn(buttonClasses(variant, size), className)}
			{...props}
		/>
	);
}
