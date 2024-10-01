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
					path.replace(/^\/api/, "/macros/s/AKfycbyl4-ZF2oyw1kjXdomioP8hzG1AfhdaByr0zXIbUxUb_XIGzKgs6GR6I3IWfxLtOI7h/exec"),
			},
		},
	},
});
