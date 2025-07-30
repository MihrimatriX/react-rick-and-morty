import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EpisodeDetail from '../components/EpisodeDetail';

// Mock useParams with proper typing
const mockUseParams = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useParams: () => mockUseParams(),
}));

describe('EpisodeDetail', () => {
	beforeEach(() => {
		// Reset mock before each test
		mockUseParams.mockReturnValue({ id: '1' });
		
		// Mock fetch for episode and character data
		global.fetch = jest.fn((url: string) => {
			if (url.includes('/episode/1')) {
				return Promise.resolve({
					ok: true,
					json: () => Promise.resolve({
						id: 1,
						name: 'Pilot',
						air_date: '2013-12-02',
						episode: 'S01E01',
						characters: [
							'https://rickandmortyapi.com/api/character/1',
							'https://rickandmortyapi.com/api/character/2',
						],
					}),
				});
			}
			if (url.includes('/character/1')) {
				return Promise.resolve({
					ok: true,
					json: () => Promise.resolve({
						id: 1,
						name: 'Rick Sanchez',
						image: 'rick.jpg',
					}),
				});
			}
			if (url.includes('/character/2')) {
				return Promise.resolve({
					ok: true,
					json: () => Promise.resolve({
						id: 2,
						name: 'Morty Smith',
						image: 'morty.jpg',
					}),
				});
			}
			return Promise.reject(new Error('Not found'));
		}) as jest.Mock;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test('renders episode information', async () => {
		render(
			<MemoryRouter>
				<EpisodeDetail />
			</MemoryRouter>
		);

		// Wait for episode data to load and check for episode name in title
		await waitFor(() => {
			expect(screen.getByText(/S01E01.*Pilot/)).toBeInTheDocument();
		});

		expect(screen.getByText('2013-12-02')).toBeInTheDocument();
	});

	test('renders character list', async () => {
		render(
			<MemoryRouter>
				<EpisodeDetail />
			</MemoryRouter>
		);

		// Wait for character data to load and check for both characters
		await waitFor(() => {
			expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
			expect(screen.getByText('Morty Smith')).toBeInTheDocument();
		});
	});

	test('shows loading spinner initially', () => {
		render(
			<MemoryRouter>
				<EpisodeDetail />
			</MemoryRouter>
		);
		expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
	});

	test('shows error when episode not found', async () => {
		// Mock useParams to return invalid id
		mockUseParams.mockReturnValue({ id: '999' });
		
		// Mock fetch to return error
		global.fetch = jest.fn(() => 
			Promise.resolve({
				ok: false,
				status: 404,
			})
		) as jest.Mock;

		render(
			<MemoryRouter>
				<EpisodeDetail />
			</MemoryRouter>
		);

		// Wait for error state
		await waitFor(() => {
			expect(screen.getByText(/You're Lost in Another Universe/i)).toBeInTheDocument();
		});
	});

	test('shows error when no id provided', async () => {
		// Mock useParams to return no id
		mockUseParams.mockReturnValue({ id: undefined });

		render(
			<MemoryRouter>
				<EpisodeDetail />
			</MemoryRouter>
		);

		// Wait for error state since no id means no API call
		await waitFor(() => {
			expect(screen.getByText(/You're Lost in Another Universe/i)).toBeInTheDocument();
		});
	});
}); 