import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterList from '../components/CharacterList';
import type { Character } from '../types/character';

describe('CharacterList', () => {
	const mockChars: Character[] = [
		{
			id: 1,
			name: 'Rick',
			img: 'img.png',
			status: 'Alive',
			species: 'Human',
			gender: 'Male',
			origin: 'Earth',
			originUrl: '',
			location: 'Earth',
			locationUrl: '',
			episodes: 10,
			episodeUrls: [],
		},
	];

	test('renders character list', () => {
		render(
			<MemoryRouter>
				<CharacterList filteredChars={mockChars} />
			</MemoryRouter>
		);
		expect(screen.getByText('Rick')).toBeInTheDocument();
	});

	test('renders SearchError for empty list', () => {
		render(
			<MemoryRouter>
				<CharacterList filteredChars={[]} />
			</MemoryRouter>
		);
		expect(screen.getByText(/did not match any character/i)).toBeInTheDocument();
	});
});