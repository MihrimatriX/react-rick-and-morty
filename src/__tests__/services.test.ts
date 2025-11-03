import getDataFromAPI from '../services/getDataFromAPI';
import getEpisodesFromAPI from '../services/getEpisodesFromAPI';

describe('API Services', () => {
	describe('getDataFromAPI', () => {
		test('returns characters on successful API call', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					json: () => Promise.resolve({
						results: [
							{
								id: 1,
								name: 'Rick Sanchez',
								image: 'rick.jpg',
								status: 'Alive',
								species: 'Human',
								gender: 'Male',
								origin: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1' },
								location: { name: 'Earth', url: 'https://rickandmortyapi.com/api/location/1' },
								episode: ['https://rickandmortyapi.com/api/episode/1'],
							},
						],
					}),
				})
			) as jest.Mock;

			const result = await getDataFromAPI();
			expect(result).toHaveLength(1);
			expect(result[0].name).toBe('Rick Sanchez');
			expect(result[0].status).toBe('Alive');
		});

		test('handles API error gracefully', async () => {
			global.fetch = jest.fn(() => Promise.reject(new Error('API Error'))) as jest.Mock;

			await expect(getDataFromAPI()).rejects.toThrow('API Error');
		});
	});

	describe('getEpisodesFromAPI', () => {
		test('returns episodes on successful API call', async () => {
			global.fetch = jest.fn(() =>
				Promise.resolve({
					json: () => Promise.resolve({
						results: [
							{
								id: 1,
								name: 'Pilot',
								air_date: '2013-12-02',
								episode: 'S01E01',
								characters: ['https://rickandmortyapi.com/api/character/1'],
							},
						],
						info: { next: null },
					}),
				})
			) as jest.Mock;

			const result = await getEpisodesFromAPI();
			expect(result).toHaveLength(1);
			expect(result[0].name).toBe('Pilot');
			expect(result[0].episode).toBe('S01E01');
		});
	});
}); 