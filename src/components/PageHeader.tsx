import type { ReactNode } from "react";

interface PageHeaderProps {
	eyebrow?: string;
	title: ReactNode;
	description?: ReactNode;
	children?: ReactNode;
}

export default function PageHeader({
	eyebrow,
	title,
	description,
	children,
}: PageHeaderProps) {
	return (
		<div className="flex flex-col gap-6 pt-10 pb-8 sm:pt-14 lg:flex-row lg:items-end lg:justify-between">
			<div className="max-w-2xl">
				{eyebrow && (
					<p className="mb-2 text-sm font-semibold tracking-wide text-portal-ink uppercase">
						{eyebrow}
					</p>
				)}
				<h1 className="text-3xl font-bold sm:text-4xl">{title}</h1>
				{description && (
					<p className="mt-3 text-base text-muted">{description}</p>
				)}
			</div>
			{children}
		</div>
	);
}
