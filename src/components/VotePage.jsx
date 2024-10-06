import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { castVote } from "../utils/api";

function VotePage({ clubs }) {
	const { clubIndex } = useParams();
	const navigate = useNavigate();
	const [isConfirming, setIsConfirming] = useState(false);
	const [selectedCandidate, setSelectedCandidate] = useState(null);
	const [ritId, setRitId] = useState(""); // Add state for RIT ID
	const [loading, setLoading] = useState(false); // Add loading state to prevent spamming
	const [ritIdError, setRitIdError] = useState(""); // Add state for RIT ID error
	const [isRitIdValid, setIsRitIdValid] = useState(false); // Add state for RIT ID validation

	const club = clubs[clubIndex];

	const handleVote = () => {
		if (selectedCandidate && isRitIdValid) {
			setIsConfirming(true);
		}
	};

	const confirmVote = async () => {
		if (loading) return; // Prevent duplicate clicks
		setLoading(true); // Set loading to true when vote is submitted

		try {
			await castVote(club.name, selectedCandidate, ritId); // Send RIT ID in the POST request
			navigate("/success");
		} catch (error) {
			console.error("Error casting vote:", error);
			alert("There was an error casting your vote. Please try again.");
			setLoading(false); // Re-enable voting in case of an error
		}
	};

	const validateRitId = (id) => {
		const regex = /^[a-zA-Z]{2,3}\d{4}$/;
		if (!regex.test(id)) {
			setRitIdError("Invalid RIT ID format. It should be 2-3 letters followed by 4 numbers.");
			setIsRitIdValid(false);
		} else {
			setRitIdError("");
			setIsRitIdValid(true);
		}
	};

	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6 text-center text-orange-600">{club.name}</h1>
			<p className="text-center text-orange-500 mb-6">{club.time}</p>
			<div className="space-y-4">
				{club.candidates.map((candidate, index) => (
					<button
						key={index}
						onClick={() => setSelectedCandidate(candidate)}
						className={`w-full p-4 rounded-lg ${
							selectedCandidate === candidate ? "bg-orange-500 text-white" : "bg-orange-100 text-orange-800 hover:bg-orange-200"
						} transition duration-300`}
					>
						{candidate}
					</button>
				))}
			</div>

			{selectedCandidate && (
				<div className="mt-6">
					<input
						type="text"
						placeholder="Enter your RIT ID"
						value={ritId}
						onChange={(e) => {
							setRitId(e.target.value);
							validateRitId(e.target.value);
						}}
						className="w-full p-4 border rounded-lg mb-2"
					/>
					{ritIdError && <p className="text-red-500 mb-2">{ritIdError}</p>}
					<button
						onClick={handleVote}
						className={`w-full p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ${
							loading || !isRitIdValid ? "opacity-50 cursor-not-allowed" : ""
						}`}
						disabled={loading || !isRitIdValid} // Disable button while loading or if RIT ID is invalid
					>
						{loading ? "Submitting..." : `Vote for ${selectedCandidate}`} {/* Show loading text */}
					</button>
				</div>
			)}

			<button
				onClick={() => navigate("/")}
				className="mt-4 w-full p-4 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
			>
				Back to Clubs
			</button>

			{isConfirming && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-white p-8 rounded-lg">
						<h2 className="text-xl font-bold mb-4">Confirm Your Vote</h2>
						<p>Are you sure you want to vote for {selectedCandidate}?</p>
						<div className="mt-6 flex justify-end space-x-4">
							<button
								onClick={() => setIsConfirming(false)}
								className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition duration-300"
							>
								Cancel
							</button>
							<button
								onClick={confirmVote}
								className={`px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 ${
									loading ? "opacity-50 cursor-not-allowed" : ""
								}`}
								disabled={loading} // Disable confirm button while loading
							>
								{loading ? "Submitting..." : "Confirm Vote"} {/* Show loading text */}
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default VotePage;
