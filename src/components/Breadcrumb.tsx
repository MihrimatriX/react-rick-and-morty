import { Link, useLocation } from "react-router-dom";
import { FaHome, FaUser, FaTv } from "react-icons/fa";

const routeMap = [
	{ path: "/", label: "Ana Sayfa", icon: <FaHome /> },
	{ path: "/character/:id", label: "Karakter Detayı", icon: <FaUser /> },
	{ path: "/char/:id", label: "Karakter Detayı", icon: <FaUser /> },
	{ path: "/episodes/:id", label: "Bölüm Detayı", icon: <FaTv /> },
];

function getBreadcrumbs(pathname: string) {
	const crumbs = [];
	if (pathname === "/") {
		crumbs.push(routeMap[0]);
		return crumbs;
	}
	crumbs.push(routeMap[0]);
	if (pathname.startsWith("/character/") || pathname.startsWith("/char/")) {
		crumbs.push(routeMap[1]);
	}
	if (pathname.startsWith("/episodes/")) {
		crumbs.push(routeMap[3]);
	}
	return crumbs;
}

const Breadcrumb = () => {
	const location = useLocation();
	const crumbs = getBreadcrumbs(location.pathname);

	return (
		<nav
			className="w-full flex justify-center mt-4"
			aria-label="Breadcrumb"
		>
			<div className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/20 dark:bg-gray-900/40 backdrop-blur-md border border-cyan-400/40 shadow-lg max-w-2xl w-full mx-auto overflow-x-auto whitespace-nowrap animate-fadeIn">
				{crumbs.map((crumb, idx) => {
					const isLast = idx === crumbs.length - 1;
					return (
						<span
							key={crumb.path}
							className="flex items-center gap-1"
						>
							{!isLast ? (
								<Link
									to={
										crumb.path === "/"
											? "/"
											: location.pathname
									}
									className="flex items-center gap-1 px-3 py-1 rounded bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-semibold shadow hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all text-sm"
									aria-label={crumb.label}
								>
									{crumb.icon} {crumb.label}
								</Link>
							) : (
								<span
									className="flex items-center gap-1 px-3 py-1 rounded bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-lg text-sm border-2 border-cyan-300 animate-fadeIn drop-shadow-lg"
									aria-current="page"
								>
									{crumb.icon} {crumb.label}
								</span>
							)}
							{!isLast && (
								<span className="mx-1 text-cyan-400 font-bold">
									/
								</span>
							)}
						</span>
					);
				})}
			</div>
		</nav>
	);
};

export default Breadcrumb;
