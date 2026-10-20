import { MotionConfig, motion } from "motion/react";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function RootLayout() {
	const { pathname } = useLocation();

	return (
		<MotionConfig reducedMotion="user">
			<a
				href="#main"
				className="fixed top-3 left-3 z-50 -translate-y-20 rounded-lg bg-portal px-4 py-2 font-semibold text-on-portal transition-transform focus:translate-y-0"
			>
				İçeriğe geç
			</a>
			<div className="flex min-h-dvh flex-col">
				<Header />
				<main
					id="main"
					className="mx-auto w-full max-w-7xl flex-1 px-4 sm:px-6 lg:px-8"
				>
					<motion.div
						key={pathname}
						initial={{ opacity: 0, y: 12 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3, ease: "easeOut" }}
					>
						<Outlet />
					</motion.div>
				</main>
				<Footer />
			</div>
			<ScrollRestoration />
		</MotionConfig>
	);
}
