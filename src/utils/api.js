import axios from "axios";

const API_URL =
	// "https://script.google.com/macros/s/AKfycbxEw8dKeiq-hfBH11Zrez4G_bxbZxKjsjNy8uF-hA1dlGXg4cTphxLa1IqPpcLyBLfU/exec"; // for production
	"/api"; // This will be proxied to your Google Apps Script URL in development

export const castVote = async (club, vote, voter) => {
	try {
		const response = await axios.post(
			API_URL,
			{ club, vote, voter },
			{
				headers: {
					"Content-Type": "text/plain;charset=utf-8",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error casting vote:", error);
		throw error;
	}
};
