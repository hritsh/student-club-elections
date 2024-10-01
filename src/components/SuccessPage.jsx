import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SuccessPage() {
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			navigate("/");
		}, 5000);

		return () => clearTimeout(timer);
	}, [navigate]);

	return (
		<div className="p-8 text-center">
			<h1 className="text-3xl font-bold mb-6 text-green-600">Vote Successful!</h1>
			<p className="text-lg text-green-500">Thank you for voting. You will be redirected to the home page in 5 seconds.</p>
		</div>
	);
}

export default SuccessPage;
