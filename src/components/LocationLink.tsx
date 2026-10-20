import { Link } from "react-router";
import { idFromUrl, type ResourceRef } from "../lib/api";
import { orUnknown } from "../lib/labels";

export default function LocationLink({ location }: { location: ResourceRef }) {
	const id = idFromUrl(location.url);
	if (!id) return <>{orUnknown(location.name)}</>;
	return (
		<Link
			to={`/locations/${id}`}
			className="text-fg underline decoration-portal/50 decoration-2 underline-offset-4 hover:text-portal-ink hover:decoration-portal"
		>
			{location.name}
		</Link>
	);
}
