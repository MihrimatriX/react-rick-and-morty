import { useEffect, useState } from "react";
import {
	BrowserRouter,
	Routes,
	Route,
	useLocation,
	useParams,
} from "react-router-dom";
import type { Character } from "./types/character";
import type { FilterData } from "./types/filter";
import getDataFromAPI from "./services/getDataFromAPI";
import Header from "./components/Header";
import Filter from "./components/Filter";
import CharacterList from "./components/CharacterList";
import CharacterDetail from "./components/CharacterDetail";
import EpisodeDetail from "./components/EpisodeDetail";
import RouteError from "./components/RouteError";
import LoadingSpinner from "./components/LoadingSpinner";
import { AnimatePresence, motion } from "framer-motion";
import type { FC } from "react";

const App = () => {
	const [chars, setChars] = useState<Character[]>([]);
	const [nameFilter, setNameFilter] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [genderFilter, setGenderFilter] = useState("all");

	useEffect(() => {
		getDataFromAPI().then((data) => {
			setChars(data);
		});
	}, []);

	const handleFilter = (filterData: FilterData) => {
		if (filterData.key === "searchBox") setNameFilter(filterData.value);
		else if (filterData.key === "status") setStatusFilter(filterData.value);
		else if (filterData.key === "gender") setGenderFilter(filterData.value);
	};

	const renderUnfilteredList = () => {
		setNameFilter("");
		setStatusFilter("all");
		setGenderFilter("all");
	};

	const filteredChars = chars
		.filter((char) =>
			char.name.toUpperCase().includes(nameFilter.toUpperCase())
		)
		.filter((char) =>
			statusFilter === "all" ? true : char.status === statusFilter
		)
		.filter((char) =>
			genderFilter === "all" ? true : char.gender === genderFilter
		)
		.sort((a, b) => a.name.localeCompare(b.name));

	if (!chars.length) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
				<LoadingSpinner />
			</div>
		);
	}

	return (
		<div className="min-h-screen flex flex-col items-center bg-gray-900 text-white">
			<BrowserRouter>
				<Header />
				<main className="w-full flex-1 flex flex-col items-center">
					<RoutesWrapper
						handleFilter={handleFilter}
						renderUnfilteredList={renderUnfilteredList}
						filteredChars={filteredChars}
						chars={chars}
					/>
				</main>
			</BrowserRouter>
		</div>
	);
};

function CharacterDetailWrapper({ chars }: { chars: Character[] }) {
	const { id } = useParams<{ id: string }>();
	const foundChar = chars.find((char) => char.id === Number(id));
	return <CharacterDetail char={foundChar} />;
}

// Route geçiş animasyonları için ayrı bir wrapper component
const pageVariants = {
	initial: { opacity: 0, y: 30 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -30 },
};
interface RoutesWrapperProps {
	handleFilter: (filterData: FilterData) => void;
	renderUnfilteredList: () => void;
	filteredChars: Character[];
	chars: Character[];
}
const RoutesWrapper: FC<RoutesWrapperProps> = ({
	handleFilter,
	renderUnfilteredList,
	filteredChars,
	chars,
}) => {
	const location = useLocation();
	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={location.pathname}
				initial="initial"
				animate="animate"
				exit="exit"
				variants={pageVariants}
				transition={{ duration: 0.35, ease: "easeInOut" }}
				className="w-full flex flex-col items-center"
			>
				<Routes location={location}>
					<Route
						path="/"
						element={
							<>
								<Filter
									handleFilter={handleFilter}
									onResetFilters={renderUnfilteredList}
								/>
								<CharacterList filteredChars={filteredChars} />
							</>
						}
					/>
					<Route
						path="/char/:id"
						element={<CharacterDetailWrapper chars={chars} />}
					/>
					<Route
						path="/character/:id"
						element={<CharacterDetailWrapper chars={chars} />}
					/>
					<Route path="/episodes/:id" element={<EpisodeDetail />} />
					<Route path="*" element={<RouteError />} />
				</Routes>
			</motion.div>
		</AnimatePresence>
	);
};

export default App;
