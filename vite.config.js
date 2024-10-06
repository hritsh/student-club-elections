import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	base: "/student-club-elections/",
	plugins: [react()],
	server: {
		proxy: {
			"/api": {
				target: "https://script.google.com",
				changeOrigin: true,
				rewrite: (path) =>
					path.replace(/^\/api/, "/macros/s/AKfycbxEw8dKeiq-hfBH11Zrez4G_bxbZxKjsjNy8uF-hA1dlGXg4cTphxLa1IqPpcLyBLfU/exec"),
			},
		},
	},
});
