import { Link } from "react-router-dom";

function HomePage({ clubs }) {
	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6 text-center text-orange-600">Student Club Election</h1>
			<div className="space-y-4">
				{clubs.map((club, index) => (
					<Link
						key={index}
						to={`/vote/${index}`}
						className="block p-4 rounded-lg bg-orange-100 hover:bg-orange-200 transition duration-300"
					>
						<h2 className="text-xl font-semibold text-orange-800">{club.name}</h2>
						<p className="text-orange-600">{club.time}</p>
					</Link>
				))}
			</div>
		</div>
	);
}

export default HomePage;
