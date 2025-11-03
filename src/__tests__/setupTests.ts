import '@testing-library/jest-dom';

// Node.js ortamı için TextEncoder/TextDecoder polyfill
import { TextEncoder, TextDecoder } from 'util';
if (!global.TextEncoder) global.TextEncoder = TextEncoder;
if (!global.TextDecoder) global.TextDecoder = TextDecoder;

// window.matchMedia polyfill
if (!window.matchMedia) {
	window.matchMedia = () => ({
		matches: false,
		addEventListener: () => {},
		removeEventListener: () => {},
		addListener: () => {},
		removeListener: () => {},
		dispatchEvent: () => false,
	});
}