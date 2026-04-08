import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackToListLink = () => (
	<div className="w-full flex items-start mb-4">
		<Link
			to="/"
			className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-lg font-bold shadow-lg hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-cyan-300 transition-all duration-200 animate-fadeIn"
			tabIndex={0}
			aria-label="Listeye geri dön"
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ")
					(e.target as HTMLElement).click();
			}}
		>
			<FaArrowLeft className="text-2xl" aria-hidden="true" />
			Listeye Dön
		</Link>
	</div>
);

export default BackToListLink;
