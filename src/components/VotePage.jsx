import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { castVote } from "../utils/api";

function VotePage({ clubs }) {
	const { clubIndex } = useParams();
	const navigate = useNavigate();
	const [isConfirming, setIsConfirming] = useState(false);
	const [selectedCandidate, setSelectedCandidate] = useState(null);

	const club = clubs[clubIndex];

	const handleVote = async () => {
		if (selectedCandidate) {
			setIsConfirming(true);
		}
	};

	const confirmVote = async () => {
		try {
			await castVote(club.name, selectedCandidate);
			navigate("/success");
		} catch (error) {
			console.error("Error casting vote:", error);
			alert("There was an error casting your vote. Please try again.");
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
				<button
					onClick={handleVote}
					className="mt-6 w-full p-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
				>
					Vote for {selectedCandidate}
				</button>
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
								className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
							>
								Confirm Vote
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default VotePage;
