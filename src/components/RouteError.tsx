import { Link } from "react-router-dom";
import noResultsImg from "../assets/no_results_img.png";

const RouteError = () => (
	<div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center animate-fadeIn">
		<img
			src={noResultsImg}
			alt="404 Portal"
			className="w-48 h-48 mb-6 animate-wiggle drop-shadow-lg select-none"
			aria-hidden="true"
		/>
		<h1 className="text-5xl font-extrabold text-cyan-600 dark:text-cyan-400 mb-2">
			404
		</h1>
		<h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-100">
			You're Lost in Another Universe!
		</h2>
		<p className="mb-6 text-gray-600 dark:text-gray-300 max-w-md">
			The page you're looking for doesn't exist in this universe. Use the
			portal to return to the home page!
		</p>
		<Link
			to="/"
			className="px-6 py-3 rounded-lg bg-cyan-600 text-white font-semibold shadow hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition text-lg animate-fadeIn"
			tabIndex={0}
			aria-label="Return to home page"
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ")
					(e.target as HTMLElement).click();
			}}
		>
			Return to Home Page
		</Link>
	</div>
);

export default RouteError;
