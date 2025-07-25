import type { FilterData } from "../types/filter";
import { Button } from "./ui/Button";

interface FilterProps {
  handleFilter: (filterData: FilterData) => void;
  onResetFilters: () => void;
}

const Filter = ({ handleFilter, onResetFilters }: FilterProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    handleFilter({
      value: event.target.value,
      key: event.target.id,
    });
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className="flex flex-col items-center gap-4 my-4" onSubmit={handleFormSubmit}>
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
        <label className="text-gray-700 font-medium" htmlFor="status">
          Status
        </label>
        <select
          className="px-3 py-2 rounded border border-cyan-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          name="status"
          id="status"
          onChange={handleInputChange}
        >
          <option value="all">All</option>
          <option value="Alive">Alive</option>
          <option value="Dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <label className="text-gray-700 font-medium" htmlFor="gender">
          Gender
        </label>
        <select
          className="px-3 py-2 rounded border border-cyan-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
          name="gender"
          id="gender"
          onChange={handleInputChange}
        >
          <option value="all">All</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>
      <Button type="button" onClick={onResetFilters} className="mt-2 w-32">Temizle</Button>
    </form>
  );
};

export default Filter; 