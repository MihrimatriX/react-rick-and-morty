import type { Character } from "../types/character";
import alive_icon from "../assets/alive_icon.png";
import dead_icon from "../assets/dead_icon.png";
import unknown_icon from "../assets/unknown_icon.png";

interface StatusIconProps {
	char: Character;
}

const StatusIcon = ({ char }: StatusIconProps) => {
	if (char.status === "Alive")
		return (
			<img
				src={alive_icon}
				alt="Happy face emoji"
				className="w-5 inline-block align-middle"
			/>
		);
	if (char.status === "Dead")
		return (
			<img
				src={dead_icon}
				alt="Dead face emoji"
				className="w-5 inline-block align-middle"
			/>
		);
	return (
		<img
			src={unknown_icon}
			alt="Question mark emoji"
			className="w-5 inline-block align-middle opacity-70"
		/>
	);
};

export default StatusIcon;
