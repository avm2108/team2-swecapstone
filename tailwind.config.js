/** @type {import('tailwindcss').Config} */

export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				mainyellow: "#FFF27D",
				maingreen: "#4EB780",
			},
			fontFamily: {
				roboto: ["Inter", "sans-serif"],
			},
		},
	},
	plugins: [],
};
