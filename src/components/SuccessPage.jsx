import { useEffect } from "react";
import Cookies from "js-cookie";

function SuccessPage() {
	useEffect(() => {
		// Set a cookie to indicate that the user has voted
		Cookies.set("voted", "true", { expires: 1 }); // Cookie expires in 1 day
	}, []);

	return (
		<div className="p-8 text-center">
			<h1 className="text-3xl font-bold mb-6 text-green-600">Vote Successful!</h1>
			<p className="text-lg text-green-500">Thank you for voting.</p>
		</div>
	);
}

export default SuccessPage;
