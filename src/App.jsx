import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import VotePage from "./components/VotePage";
import SuccessPage from "./components/SuccessPage";
import sgMainLogo from "./assets/sgmain-logo.png";

const clubs = [
	{
		name: "Music Club",
		time: "12:00 PM - 12:20 PM",
		candidates: ["Sabina Sabitzhanova", "Annabelle Saliba", "Adeeb Harb", "Gulyorakhon Akbarkhanova"],
	},
	{
		name: "Anime Club",
		time: "12:20 PM - 12:40 PM",
		candidates: ["Arsilan Abbas", "Akashay Kumar Thory", "Syed Burhanuddin Ayaan", "Salaheddine Radiousse"],
	},
	{
		name: "Desi Club",
		time: "12:40 PM - 1:00 PM",
		candidates: ["Kumail Amir", "Wafa Zehra Jafri", "Ishvarya Simhan", "Fathima Rasha"],
	},
];

function App() {
	return (
		<Router>
			<div className="min-h-screen bg-orange-500 p-8">
				<div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
					<img src={sgMainLogo} alt="SG Main Logo" className="h-full px-40 py-5" />
					<Routes>
						<Route path="/" element={<HomePage clubs={clubs} />} />
						<Route path="/vote/:clubIndex" element={<VotePage clubs={clubs} />} />
						<Route path="/success" element={<SuccessPage />} />
					</Routes>
				</div>
			</div>
		</Router>
	);
}

export default App;
