import { Navigate, useParams } from "react-router";

/** Keeps links from the previous version of the app (`/char/:id`) working. */
export default function LegacyCharacterRedirect() {
	const { id } = useParams();
	return <Navigate to={`/character/${id}`} replace />;
}
