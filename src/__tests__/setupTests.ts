import "@testing-library/jest-dom";

// Node.js ortamı için TextEncoder/TextDecoder polyfill
import { TextEncoder, TextDecoder } from "util";
if (!global.TextEncoder)
	global.TextEncoder = TextEncoder as typeof global.TextEncoder;
if (!global.TextDecoder)
	global.TextDecoder = TextDecoder as typeof global.TextDecoder;

// window.matchMedia polyfill
if (!window.matchMedia) {
	window.matchMedia = (() => ({
		matches: false,
		media: "",
		onchange: null,
		addEventListener: () => {},
		removeEventListener: () => {},
		addListener: () => {},
		removeListener: () => {},
		dispatchEvent: () => false,
	})) as typeof window.matchMedia;
}
