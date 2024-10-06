import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import HomePage from "./components/HomePage";
import VotePage from "./components/VotePage";
import SuccessPage from "./components/SuccessPage";
import sgMainLogo from "./assets/sgmain-logo.png";

const clubs = [
	{
		name: "Gamers Guild",
		time: "12:00 PM - 12:20 PM",
		candidates: ["Akhliddin Koziboev", "Gulzam Basheer"],
	},
	{
		name: "Arts Society",
		time: "12:20 PM - 12:40 PM",
		candidates: ["Aws Abdulrazaq", "Yogesh Mata", "Racha Houbabi", "Maryam Husain"],
	},
	{
		name: "Marketing Club",
		time: "12:40 PM - 1:00 PM",
		candidates: ["Layan Albadareen", "Osama Ghanem", "Nurbergen Nurlanuly"],
	},
];

function App() {
	const [hasVoted, setHasVoted] = useState(false);

	useEffect(() => {
		// Check if the "voted" cookie is set
		if (Cookies.get("voted")) {
			setHasVoted(true);
		}
	}, []);

	return (
		<Router>
			<div className="min-h-screen bg-orange-500 flex items-center justify-center p-4 md:p-8">
				<div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
					<div className="flex justify-center py-5">
						<img src={sgMainLogo} alt="SG Main Logo" className="w-40 md:w-48" />
					</div>
					<Routes>
						<Route path="/" element={hasVoted ? <Navigate to="/success" /> : <HomePage clubs={clubs} />} />
						<Route path="/vote/:clubIndex" element={hasVoted ? <Navigate to="/success" /> : <VotePage clubs={clubs} />} />
						<Route path="/success" element={<SuccessPage />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
