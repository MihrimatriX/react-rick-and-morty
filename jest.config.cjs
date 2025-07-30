// eslint-disable-next-line no-undef
module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
	setupFilesAfterEnv: ['<rootDir>/src/__tests__/setupTests.ts'],
	moduleNameMapper: {
		'\\.(css|less|scss|sass)$': 'identity-obj-proxy',
		'\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/src/__tests__/__mocks__/fileMock.js',
	},
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	testMatch: ["<rootDir>/src/__tests__/**/*.test.tsx", "<rootDir>/src/__tests__/**/*.test.ts"],
};