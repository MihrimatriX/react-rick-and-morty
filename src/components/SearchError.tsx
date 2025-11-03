import noResultImg from "../assets/no_results_img.png";

const SearchError = () => {
	return (
		<div className="flex flex-col items-center mt-9">
			<img
				src={noResultImg}
				alt="Rick and Morty looking anxious"
				className="w-3/5 max-w-xs mb-2"
			/>
			<p className="text-xl text-center font-semibold text-red-500">
				Sorry, your search did not match any character in our list.
			</p>
		</div>
	);
};

export default SearchError;
