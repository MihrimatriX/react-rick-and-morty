import { RotateCcw, TriangleAlert } from "lucide-react";
import type { ReactNode } from "react";
import portalFaces from "../assets/portal-faces.webp";
import { cn } from "../lib/cn";
import { Button } from "./ui/Button";

interface EmptyStateProps {
	title: string;
	description?: ReactNode;
	action?: ReactNode;
	className?: string;
}

export function EmptyState({ title, description, action, className }: EmptyStateProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center rounded-3xl border border-dashed border-line px-6 py-14 text-center",
				className,
			)}
		>
			<img
				src={portalFaces}
				alt=""
				aria-hidden="true"
				width={560}
				height={425}
				className="w-48 animate-float select-none sm:w-56"
				draggable={false}
			/>
			<h2 className="mt-4 text-xl font-semibold">{title}</h2>
			{description && (
				<p className="mt-2 max-w-md text-sm text-muted">{description}</p>
			)}
			{action && <div className="mt-6">{action}</div>}
		</div>
	);
}

interface ErrorStateProps {
	title?: string;
	error?: unknown;
	onRetry?: () => void;
}

export function ErrorState({
	title = "Portal açılamadı",
	error,
	onRetry,
}: ErrorStateProps) {
	return (
		<div
			role="alert"
			className="flex flex-col items-center rounded-3xl border border-danger/30 bg-danger/5 px-6 py-14 text-center"
		>
			<div className="grid size-12 place-items-center rounded-2xl bg-danger/15 text-danger">
				<TriangleAlert className="size-6" aria-hidden="true" />
			</div>
			<h2 className="mt-4 text-xl font-semibold">{title}</h2>
			<p className="mt-2 max-w-md text-sm text-muted">
				Veriler yüklenirken bir sorun oluştu.
				{error instanceof Error && ` (${error.message})`} Bağlantını kontrol edip
				tekrar dene.
			</p>
			{onRetry && (
				<Button className="mt-6" onClick={onRetry}>
					<RotateCcw className="size-4" aria-hidden="true" />
					Tekrar dene
				</Button>
			)}
		</div>
	);
}

export function Spinner({ label = "Yükleniyor" }: { label?: string }) {
	return (
		<div role="status" className="flex flex-col items-center gap-3 py-16 text-muted">
			<span className="relative size-12">
				<span className="absolute inset-0 animate-portal-spin rounded-full border-4 border-portal/20 border-t-portal" />
				<span className="absolute inset-2 animate-portal-spin rounded-full border-4 border-rick/20 border-b-rick [animation-direction:reverse]" />
			</span>
			<span className="text-sm font-medium">{label}…</span>
		</div>
	);
}
