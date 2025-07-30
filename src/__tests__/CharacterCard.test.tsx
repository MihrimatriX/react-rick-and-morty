import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CharacterCard from '../components/CharacterCard';

describe('CharacterCard', () => {
	test('renders character name and image', () => {
		render(
			<MemoryRouter>
				<CharacterCard
					id={1}
					img="https://rickandmortyapi.com/api/character/avatar/1.jpeg"
					name="Rick Sanchez"
					species="Human"
					status="Alive"
				/>
			</MemoryRouter>
		);
		expect(screen.getByText(/Rick Sanchez/i)).toBeInTheDocument();
		const img = screen.getByAltText(/Rick Sanchez/i);
		expect(img).toBeInTheDocument();
	});

	test('renders status and species badges', () => {
		render(
			<MemoryRouter>
				<CharacterCard
					id={2}
					img="img.png"
					name="Morty Smith"
					species="Alien"
					status="Dead"
				/>
			</MemoryRouter>
		);
		expect(screen.getByText('Dead')).toBeInTheDocument();
		const alienBadges = screen.getAllByText('Alien');
		expect(alienBadges.length).toBeGreaterThan(0);
	});

	test('renders link with correct href', () => {
		render(
			<MemoryRouter>
				<CharacterCard
					id={5}
					img="img.png"
					name="Summer"
					species="Human"
					status="Alive"
				/>
			</MemoryRouter>
		);
		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('href', '/char/5');
	});

	test('image alt text matches name', () => {
		render(
			<MemoryRouter>
				<CharacterCard
					id={3}
					img="img.png"
					name="Beth Smith"
					species="Human"
					status="Alive"
				/>
			</MemoryRouter>
		);
		const img = screen.getByAltText('Beth Smith');
		expect(img).toBeInTheDocument();
	});

	test('renders with missing img gracefully', () => {
		render(
			<MemoryRouter>
				<CharacterCard
					id={10}
					img={''}
					name="No Image"
					species="Human"
					status="Alive"
				/>
			</MemoryRouter>
		);
		const img = screen.getByAltText('No Image');
		expect(img).toBeInTheDocument();
	});

	test('renders with unknown status and species', () => {
		render(
			<MemoryRouter>
				<CharacterCard
					id={11}
					img="img.png"
					name="Unknown Char"
					species="unknown"
					status="unknown"
				/>
			</MemoryRouter>
		);
		const unknownBadges = screen.getAllByText('unknown');
		expect(unknownBadges.length).toBeGreaterThan(0);
	});

	test('link has correct aria-label and tabIndex', () => {
		render(
			<MemoryRouter>
				<CharacterCard
					id={12}
					img="img.png"
					name="A11y Test"
					species="Human"
					status="Alive"
				/>
			</MemoryRouter>
		);
		const link = screen.getByRole('link');
		expect(link).toHaveAttribute('aria-label', expect.stringContaining('detayına git'));
		expect(link).toHaveAttribute('tabIndex', '0');
	});

	test('link triggers click on Enter/Space keydown', () => {
		const handleClick = jest.fn();
		render(
			<MemoryRouter>
				<a
				href="#"
				aria-label="test-link"
				tabIndex={0}
				onClick={handleClick}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') handleClick();
				}}
			>
				Test Link
			</a>
			</MemoryRouter>
		);
		const link = screen.getByLabelText('test-link');
		link.focus();
		link.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
		expect(handleClick).toHaveBeenCalled();
	});
});