import axios from "axios";

const API_URL = "/api"; // This will be proxied to your Google Apps Script URL

export const castVote = async (club, vote) => {
	try {
		const response = await axios.post(API_URL, { club, vote });
		return response.data;
	} catch (error) {
		console.error("Error casting vote:", error);
		throw error;
	}
};
