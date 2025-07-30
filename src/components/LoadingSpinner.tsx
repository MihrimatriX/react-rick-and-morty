import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = () => (
	<div
		className="flex flex-col items-center justify-center w-full h-40 animate-fadeIn"
		role="status"
		aria-label="Yükleniyor"
	>
		<FaSpinner className="animate-spin text-cyan-400 text-5xl mb-2" />
		<span className="text-cyan-500 font-semibold text-lg">
			Yükleniyor...
		</span>
	</div>
);

export default LoadingSpinner;
