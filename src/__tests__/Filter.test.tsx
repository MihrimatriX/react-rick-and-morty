import { render, screen, fireEvent } from '@testing-library/react';
import Filter from '../components/Filter';

describe('Filter', () => {
	const handleFilter = jest.fn();
	const onResetFilters = jest.fn();

	test('renders all filter inputs', () => {
		render(<Filter handleFilter={handleFilter} onResetFilters={onResetFilters} />);
		expect(screen.getByLabelText('Search character name')).toBeInTheDocument();
		expect(screen.getByLabelText('Select status')).toBeInTheDocument();
		expect(screen.getByLabelText('Select gender')).toBeInTheDocument();
		expect(screen.getByLabelText('Clear filters')).toBeInTheDocument();
	});

	test('calls handleFilter on input change', () => {
		render(<Filter handleFilter={handleFilter} onResetFilters={onResetFilters} />);
		fireEvent.change(screen.getByLabelText('Search character name'), { target: { value: 'Rick' } });
		expect(handleFilter).toHaveBeenCalledWith({ key: 'searchBox', value: 'Rick' });
		fireEvent.change(screen.getByLabelText('Select status'), { target: { value: 'Alive' } });
		expect(handleFilter).toHaveBeenCalledWith({ key: 'status', value: 'Alive' });
		fireEvent.change(screen.getByLabelText('Select gender'), { target: { value: 'Male' } });
		expect(handleFilter).toHaveBeenCalledWith({ key: 'gender', value: 'Male' });
	});

	test('calls onResetFilters when clear button is clicked', () => {
		render(<Filter handleFilter={handleFilter} onResetFilters={onResetFilters} />);
		fireEvent.click(screen.getByLabelText('Clear filters'));
		expect(onResetFilters).toHaveBeenCalled();
	});
});