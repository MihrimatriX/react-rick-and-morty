import type { FilterData } from "../types/filter";
import {
	FaSearch,
	FaFilter,
	FaSyncAlt,
	FaVenusMars,
	FaHeartbeat,
} from "react-icons/fa";
import { Button } from "./ui/Button";

interface FilterProps {
	handleFilter: (filterData: FilterData) => void;
	onResetFilters: () => void;
}

const statusOptions = [
	{ value: "all", label: "All" },
	{ value: "Alive", label: "Alive" },
	{ value: "Dead", label: "Dead" },
	{ value: "unknown", label: "Unknown" },
];
const genderOptions = [
	{ value: "all", label: "All" },
	{ value: "Male", label: "Male" },
	{ value: "Female", label: "Female" },
	{ value: "Genderless", label: "Genderless" },
	{ value: "unknown", label: "Unknown" },
];

const Filter = ({ handleFilter, onResetFilters }: FilterProps) => (
	<section className="w-full flex justify-center mt-8 mb-6 animate-slideDownAndFade">
		<form
			className="flex flex-col lg:flex-row items-center gap-6 bg-card-light/80 dark:bg-card-dark/80 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-accent-light/30 dark:border-accent-dark/30 px-8 py-6 max-w-4xl mx-auto transition-all duration-300 hover:shadow-3xl hover:border-accent-light/50 dark:hover:border-accent-dark/50"
			onSubmit={(e) => e.preventDefault()}
			aria-label="Character Filtering"
		>
			<div className="flex flex-col gap-2 w-full lg:w-auto">
				<label
					htmlFor="searchBox"
					className="flex items-center gap-2 text-accent-light dark:text-accent-dark font-bold text-lg transition-colors duration-200 hover:text-rick dark:hover:text-morty"
				>
					<FaSearch className="text-xl" /> Name
				</label>
				<input
					id="searchBox"
					type="text"
					placeholder="Search character..."
					className="px-5 py-3 rounded-xl border-2 border-accent-light/50 dark:border-accent-dark/50 focus:border-rick dark:focus:border-morty focus:ring-4 focus:ring-rick/20 dark:focus:ring-morty/20 bg-white/90 dark:bg-bg-dark/90 text-slate-900 dark:text-white shadow-lg transition-all duration-300 w-full lg:w-64 hover:border-accent-light dark:hover:border-accent-dark hover:shadow-xl hover:scale-[1.02] focus:scale-[1.02]"
					onChange={(e) =>
						handleFilter({
							key: "searchBox",
							value: e.target.value,
						})
					}
					aria-label="Search character name"
				/>
			</div>
			<div className="flex flex-col gap-2 w-full lg:w-auto">
				<label
					htmlFor="status"
					className="flex items-center gap-2 text-accent-light dark:text-accent-dark font-bold text-lg transition-colors duration-200 hover:text-rick dark:hover:text-morty"
				>
					<FaHeartbeat className="text-xl" /> Status
				</label>
				<select
					id="status"
					className="px-5 py-3 rounded-xl border-2 border-accent-light/50 dark:border-accent-dark/50 focus:border-rick dark:focus:border-morty focus:ring-4 focus:ring-rick/20 dark:focus:ring-morty/20 bg-white/90 dark:bg-bg-dark/90 text-slate-900 dark:text-white shadow-lg transition-all duration-300 w-full lg:w-40 hover:border-accent-light dark:hover:border-accent-dark hover:shadow-xl hover:scale-[1.02] focus:scale-[1.02] cursor-pointer"
					onChange={(e) =>
						handleFilter({ key: "status", value: e.target.value })
					}
					aria-label="Select status"
				>
					{statusOptions.map((opt) => (
						<option
							key={opt.value}
							value={opt.value}
							className="bg-white dark:bg-bg-dark text-slate-900 dark:text-white"
						>
							{opt.label}
						</option>
					))}
				</select>
			</div>
			<div className="flex flex-col gap-2 w-full lg:w-auto">
				<label
					htmlFor="gender"
					className="flex items-center gap-2 text-accent-light dark:text-accent-dark font-bold text-lg transition-colors duration-200 hover:text-rick dark:hover:text-morty"
				>
					<FaVenusMars className="text-xl" /> Gender
				</label>
				<select
					id="gender"
					className="px-5 py-3 rounded-xl border-2 border-accent-light/50 dark:border-accent-dark/50 focus:border-rick dark:focus:border-morty focus:ring-4 focus:ring-rick/20 dark:focus:ring-morty/20 bg-white/90 dark:bg-bg-dark/90 text-slate-900 dark:text-white shadow-lg transition-all duration-300 w-full lg:w-40 hover:border-accent-light dark:hover:border-accent-dark hover:shadow-xl hover:scale-[1.02] focus:scale-[1.02] cursor-pointer"
					onChange={(e) =>
						handleFilter({ key: "gender", value: e.target.value })
					}
					aria-label="Select gender"
				>
					{genderOptions.map((opt) => (
						<option
							key={opt.value}
							value={opt.value}
							className="bg-white dark:bg-bg-dark text-slate-900 dark:text-white"
						>
							{opt.label}
						</option>
					))}
				</select>
			</div>
			<Button
				type="button"
				className="mt-4 lg:mt-8 px-10 py-4 rounded-2xl bg-gradient-to-r from-rick to-morty dark:from-morty dark:to-rick text-white font-bold text-xl shadow-2xl hover:scale-110 hover:shadow-3xl focus:outline-none focus:ring-4 focus:ring-accent-light/50 dark:focus:ring-accent-dark/50 transition-all duration-300 relative overflow-hidden group"
				onClick={onResetFilters}
				aria-label="Clear filters"
			>
				<FaSyncAlt className="inline-block mr-3 text-2xl group-hover:animate-spin transition-transform duration-300" />
				Clear
			</Button>
		</form>
	</section>
);

export default Filter;
