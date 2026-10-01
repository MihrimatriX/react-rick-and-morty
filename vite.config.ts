import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	build: {
		rolldownOptions: {
			output: {
				codeSplitting: {
					groups: [
						{
							name: "react",
							test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/,
						},
						{
							name: "vendor",
							test: /node_modules[\\/]/,
						},
					],
				},
			},
		},
	},
	test: {
		environment: "jsdom",
		setupFiles: ["./src/test/setup.ts"],
		css: false,
		restoreMocks: true,
	},
});
