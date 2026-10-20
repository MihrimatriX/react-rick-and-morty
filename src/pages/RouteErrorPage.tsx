import { isRouteErrorResponse, useRouteError } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";
import NotFound from "../components/NotFound";
import { ErrorState } from "../components/States";

/** Last-resort boundary for errors thrown while rendering a route. */
export default function RouteErrorPage() {
	const error = useRouteError();
	const notFound = isRouteErrorResponse(error) && error.status === 404;

	return (
		<div className="flex min-h-dvh flex-col">
			<Header />
			<main className="mx-auto w-full max-w-7xl flex-1 px-4 py-12 sm:px-6 lg:px-8">
				{notFound ? (
					<NotFound />
				) : (
					<ErrorState
						title="Bir şeyler ters gitti"
						error={error}
						onRetry={() => window.location.reload()}
					/>
				)}
			</main>
			<Footer />
		</div>
	);
}
